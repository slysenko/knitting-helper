import { BaseRequest } from ".";
import { ProjectModel } from "../models/project/projectModel";
import { ProjectListResponseSchema, ProjectResponseSchema, type ProjectData } from "../models/schemas/project";

type GetProjectParams = { id: string };

export class GetProject extends BaseRequest<ProjectModel, GetProjectParams> {
    get uri(): string {
        return `/api/projects/${this.params.id}`;
    }

    get method(): HttpMethod {
        return "GET";
    }

    protected getResponseSchema() {
        return ProjectResponseSchema;
    }

    protected getData(data: ProjectData): ProjectModel {
        return new ProjectModel(data);
    }
}

export class ListProjects extends BaseRequest<ProjectModel[], { page?: number; limit?: number }> {
    get uri(): string {
        return "/api/projects";
    }

    get method(): HttpMethod {
        return "GET";
    }

    protected getQueryParams() {
        return {
            page: String(this.params.page || 1),
            limit: String(this.params.limit || 20),
        };
    }

    protected getResponseSchema() {
        return ProjectListResponseSchema;
    }

    protected getData(data: ProjectData[]): ProjectModel[] {
        return data.map((obj) => new ProjectModel(obj));
    }
}

function filterParams<T extends object>(params: T): Partial<T> {
    const entries = Object.entries(params);
    const filteredEntries = entries.filter(([, value]) => !!value);
    return Object.fromEntries(filteredEntries) as Partial<T>;
}

export class CreateProject extends BaseRequest<ProjectModel, TProjectCreateParams> {
    get uri(): string {
        return "/api/projects";
    }

    get method(): HttpMethod {
        return "POST";
    }

    protected getResponseSchema() {
        return ProjectResponseSchema;
    }

    protected getBody(): any {
        const filteredParams = filterParams(this.params);
        return { ...filteredParams };
    }

    protected getData(data: ProjectData): ProjectModel {
        return new ProjectModel(data);
    }
}
