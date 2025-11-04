import type { ProjectData } from "../schemas/project";
import Model from "..";

export class ProjectModel extends Model<ProjectData> {
    constructor(data: ProjectData) {
        super(data);
    }
}
