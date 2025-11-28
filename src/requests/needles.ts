import { BaseRequest } from ".";
import { NeedleModel } from "../models/needle/needleModel";
import {
  NeedleListResponseSchema,
  NeedleResponseSchema,
  type NeedleData,
  type NeedleCreateParams,
  type NeedleUpdateParams,
} from "../models/schemas/needle";

type GetNeedleParams = { id: string };

export class GetNeedle extends BaseRequest<NeedleModel, GetNeedleParams> {
  get uri(): string {
    return `/api/needles/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "GET";
  }

  protected getResponseSchema() {
    return NeedleResponseSchema;
  }

  protected getData(data: NeedleData): NeedleModel {
    return new NeedleModel(data);
  }
}

type ListNeedlesParams = {
  page?: number;
  limit?: number;
  type?: "straight" | "circular" | "dpn";
  sizeMm?: number;
  material?: string;
  brand?: string;
};

export class ListNeedles extends BaseRequest<NeedleModel[], ListNeedlesParams> {
  get uri(): string {
    return "/api/needles";
  }

  get method(): HttpMethod {
    return "GET";
  }

  protected getQueryParams() {
    const { page, limit, type, sizeMm, material, brand } = this.params;
    const params: Record<string, string> = {};

    if (page) params.page = String(page);
    if (limit) params.limit = String(limit);
    if (type) params.type = type;
    if (sizeMm) params.sizeMm = String(sizeMm);
    if (material) params.material = material;
    if (brand) params.brand = brand;

    return Object.keys(params).length > 0 ? params : undefined;
  }

  protected getResponseSchema() {
    return NeedleListResponseSchema;
  }

  protected getData(data: NeedleData[]): NeedleModel[] {
    return data.map((obj) => new NeedleModel(obj));
  }
}

function filterParams<T extends object>(params: T): Partial<T> {
  const entries = Object.entries(params);
  const filteredEntries = entries.filter(([, value]) => value !== undefined && value !== null && value !== "");
  return Object.fromEntries(filteredEntries) as Partial<T>;
}

export class CreateNeedle extends BaseRequest<NeedleModel, NeedleCreateParams> {
  get uri(): string {
    return "/api/needles";
  }

  get method(): HttpMethod {
    return "POST";
  }

  protected getResponseSchema() {
    return NeedleResponseSchema;
  }

  protected getBody(): any {
    const filteredParams = filterParams(this.params);
    return { ...filteredParams };
  }

  protected getData(data: NeedleData): NeedleModel {
    return new NeedleModel(data);
  }
}

type UpdateNeedleParams = {
  id: string;
  data: NeedleUpdateParams;
};

export class UpdateNeedle extends BaseRequest<NeedleModel, UpdateNeedleParams> {
  get uri(): string {
    return `/api/needles/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "PUT";
  }

  protected getResponseSchema() {
    return NeedleResponseSchema;
  }

  protected getBody(): any {
    const filteredParams = filterParams(this.params.data);
    return { ...filteredParams };
  }

  protected getData(data: NeedleData): NeedleModel {
    return new NeedleModel(data);
  }
}

type DeleteNeedleParams = { id: string };

export class DeleteNeedle extends BaseRequest<void, DeleteNeedleParams> {
  get uri(): string {
    return `/api/needles/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "DELETE";
  }

  protected getData(): void {
    return;
  }
}
