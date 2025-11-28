import { BaseRequest } from ".";
import { HookModel } from "../models/hook/hookModel";
import {
  HookListResponseSchema,
  HookResponseSchema,
  type HookData,
  type HookCreateParams,
  type HookUpdateParams,
} from "../models/schemas/hook";

type GetHookParams = { id: string };

export class GetHook extends BaseRequest<HookModel, GetHookParams> {
  get uri(): string {
    return `/api/hooks/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "GET";
  }

  protected getResponseSchema() {
    return HookResponseSchema;
  }

  protected getData(data: HookData): HookModel {
    return new HookModel(data);
  }
}

type ListHooksParams = {
  page?: number;
  limit?: number;
  brand?: string;
  material?: string;
  sizeMm?: number;
};

export class ListHooks extends BaseRequest<HookModel[], ListHooksParams> {
  get uri(): string {
    return "/api/hooks";
  }

  get method(): HttpMethod {
    return "GET";
  }

  protected getQueryParams() {
    const { page, limit, brand, material, sizeMm } = this.params;
    const params: Record<string, string> = {};

    if (page) params.page = String(page);
    if (limit) params.limit = String(limit);
    if (brand) params.brand = brand;
    if (material) params.material = material;
    if (sizeMm) params.sizeMm = String(sizeMm);

    return Object.keys(params).length > 0 ? params : undefined;
  }

  protected getResponseSchema() {
    return HookListResponseSchema;
  }

  protected getData(data: HookData[]): HookModel[] {
    return data.map((obj) => new HookModel(obj));
  }
}

function filterParams<T extends object>(params: T): Partial<T> {
  const entries = Object.entries(params);
  const filteredEntries = entries.filter(([, value]) => value !== undefined && value !== null && value !== "");
  return Object.fromEntries(filteredEntries) as Partial<T>;
}

export class CreateHook extends BaseRequest<HookModel, HookCreateParams> {
  get uri(): string {
    return "/api/hooks";
  }

  get method(): HttpMethod {
    return "POST";
  }

  protected getResponseSchema() {
    return HookResponseSchema;
  }

  protected getBody(): any {
    const filteredParams = filterParams(this.params);
    return { ...filteredParams };
  }

  protected getData(data: HookData): HookModel {
    return new HookModel(data);
  }
}

type UpdateHookParams = {
  id: string;
  data: HookUpdateParams;
};

export class UpdateHook extends BaseRequest<HookModel, UpdateHookParams> {
  get uri(): string {
    return `/api/hooks/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "PUT";
  }

  protected getResponseSchema() {
    return HookResponseSchema;
  }

  protected getBody(): any {
    const filteredParams = filterParams(this.params.data);
    return { ...filteredParams };
  }

  protected getData(data: HookData): HookModel {
    return new HookModel(data);
  }
}

type DeleteHookParams = { id: string };

export class DeleteHook extends BaseRequest<void, DeleteHookParams> {
  get uri(): string {
    return `/api/hooks/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "DELETE";
  }

  protected getData(): void {
    return;
  }
}
