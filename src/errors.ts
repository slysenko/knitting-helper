export class ApiError extends Error {
    status?: number;
    data?: any;

    constructor(message: string, status?: number, data?: any) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export class ValidationError extends Error {
    issues?: any[];

    constructor(message: string, issues?: any[]) {
        super(message);
        this.name = "ValidationError";
        this.issues = issues;
    }
}
