import { z } from "zod";
import { ValidationError, ApiError } from "../errors";

export abstract class BaseRequest<TResult, TParams = any> {
    protected params: TParams;
    private static config: RequestConfig = {
        baseURL: import.meta.env.VITE_API_BASE_URL || "",
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000,
    };

    constructor(params: TParams) {
        this.params = params;
    }

    abstract get uri(): string;
    abstract get method(): HttpMethod;

    protected getData(data: any): TResult {
        return data;
    }

    protected getResponseSchema(): z.ZodType<any> | null {
        return null;
    }

    protected getBody(): any {
        return undefined;
    }

    protected getHeaders(): Record<string, string> {
        return {};
    }

    protected getQueryParams(): Record<string, string> | undefined {
        return undefined;
    }

    static setConfig(config: Partial<RequestConfig>): void {
        BaseRequest.config = { ...BaseRequest.config, ...config };
    }

    static setAuthToken(token: string): void {
        BaseRequest.config.headers = {
            ...BaseRequest.config.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    static removeAuthToken(): void {
        const { Authorization, ...rest } = BaseRequest.config.headers || {};
        BaseRequest.config.headers = rest;
    }

    private buildUrl(): string {
        const baseURL = BaseRequest.config.baseURL;
        const url = `${baseURL}${this.uri}`;
        const queryParams = this.getQueryParams();

        if (!queryParams || Object.keys(queryParams).length === 0) {
            return url;
        }

        const queryString = new URLSearchParams(queryParams).toString();
        return `${url}?${queryString}`;
    }

    private validateResponse(data: any): any {
        const schema = this.getResponseSchema();
        if (!schema) {
            return data;
        }

        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError("Response validation failed", error.errors);
            }
            throw error;
        }
    }

    async call(): Promise<TResult> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), BaseRequest.config.timeout);

        try {
            const headers = {
                ...BaseRequest.config.headers,
                ...this.getHeaders(),
            };

            const options: RequestInit = {
                method: this.method,
                headers,
                signal: controller.signal,
            };

            const body = this.getBody();
            if (body !== undefined && this.method !== "GET") {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(this.buildUrl(), options);

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = await response.text();
                }

                throw new ApiError(
                    errorData?.message || `Request failed with status ${response.status}`,
                    response.status,
                    errorData,
                );
            }

            const contentType = response.headers.get("content-type");
            let data;

            if (contentType?.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            const validatedData = this.validateResponse(data);

            return this.getData(validatedData.data);
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError || error instanceof ValidationError) {
                throw error;
            }

            if (error instanceof DOMException && error.name === "AbortError") {
                throw new ApiError("Request timeout");
            }

            throw new ApiError(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
}
