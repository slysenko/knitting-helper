type TProjectStatus = "active" | "completed" | "frogged" | "hibernating";
type TProjectType = "knitting" | "crochet";

type TProjectCreateParams = {
    name: string;
    comments?: string;
    projectType: TProjectType;
    primaryYarn?: string;
    status?: TProjectStatus;
    startDate?: Date;
    completionDate?: Date;
};

type TAvailableYarns = {};

interface RequestConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    timeout?: number;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
