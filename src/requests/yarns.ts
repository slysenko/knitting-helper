import { BaseRequest } from ".";
import { YarnModel } from "../models/yarn/yarnModel";
import {
  YarnListResponseSchema,
  YarnResponseSchema,
  type YarnData,
  type YarnCreateParams,
  type YarnUpdateParams,
  type YarnPhotoParams,
} from "../models/schemas/yarn";

type GetYarnParams = { id: string };

export class GetYarn extends BaseRequest<YarnModel, GetYarnParams> {
  get uri(): string {
    return `/api/yarns/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "GET";
  }

  protected getResponseSchema() {
    return YarnResponseSchema;
  }

  protected getData(data: YarnData): YarnModel {
    return new YarnModel(data);
  }
}

type ListYarnsParams = {
  page?: number;
  limit?: number;
  brand?: string;
  yarnType?: string;
  color?: string;
};

export class ListYarns extends BaseRequest<YarnModel[], ListYarnsParams> {
  get uri(): string {
    return "/api/yarns";
  }

  get method(): HttpMethod {
    return "GET";
  }

  protected getQueryParams() {
    const { page, limit, brand, yarnType, color } = this.params;
    const params: Record<string, string> = {};

    if (page) params.page = String(page);
    if (limit) params.limit = String(limit);
    if (brand) params.brand = brand;
    if (yarnType) params.yarnType = yarnType;
    if (color) params.color = color;

    return Object.keys(params).length > 0 ? params : undefined;
  }

  protected getResponseSchema() {
    return YarnListResponseSchema;
  }

  protected getData(data: YarnData[]): YarnModel[] {
    return data.map((obj) => new YarnModel(obj));
  }
}

function filterParams<T extends object>(params: T): Partial<T> {
  const entries = Object.entries(params);
  const filteredEntries = entries.filter(([, value]) => value !== undefined && value !== null && value !== "");
  return Object.fromEntries(filteredEntries) as Partial<T>;
}

export class CreateYarn extends BaseRequest<YarnModel, YarnCreateParams> {
  get uri(): string {
    return "/api/yarns";
  }

  get method(): HttpMethod {
    return "POST";
  }

  protected getResponseSchema() {
    return YarnResponseSchema;
  }

  protected getBody(): any {
    const filteredParams = filterParams(this.params);
    return { ...filteredParams };
  }

  protected getData(data: YarnData): YarnModel {
    return new YarnModel(data);
  }
}

type UpdateYarnParams = {
  id: string;
  data: YarnUpdateParams;
};

export class UpdateYarn extends BaseRequest<YarnModel, UpdateYarnParams> {
  get uri(): string {
    return `/api/yarns/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "PUT";
  }

  protected getResponseSchema() {
    return YarnResponseSchema;
  }

  protected getBody(): any {
    const filteredParams = filterParams(this.params.data);
    return { ...filteredParams };
  }

  protected getData(data: YarnData): YarnModel {
    return new YarnModel(data);
  }
}

type DeleteYarnParams = { id: string };

export class DeleteYarn extends BaseRequest<void, DeleteYarnParams> {
  get uri(): string {
    return `/api/yarns/${this.params.id}`;
  }

  get method(): HttpMethod {
    return "DELETE";
  }

  protected getData(): void {
    return;
  }
}

type AddYarnPhotoParams = {
  id: string;
  photo: YarnPhotoParams;
};

export class AddYarnPhoto extends BaseRequest<YarnModel, AddYarnPhotoParams> {
  get uri(): string {
    return `/api/yarns/${this.params.id}/photos`;
  }

  get method(): HttpMethod {
    return "POST";
  }

  protected getResponseSchema() {
    return YarnResponseSchema;
  }

  protected getBody(): any {
    return { ...this.params.photo };
  }

  protected getData(data: YarnData): YarnModel {
    return new YarnModel(data);
  }
}
