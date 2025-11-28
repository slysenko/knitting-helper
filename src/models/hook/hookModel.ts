import type { HookData } from "../schemas/hook";
import Model from "..";

export class HookModel extends Model<HookData> {
    constructor(data: HookData) {
        super(data);
    }

    get displaySize(): string {
        if (this.sizeUs) {
            return `${this.sizeMm}mm (US ${this.sizeUs})`;
        }
        return `${this.sizeMm}mm`;
    }

    get projectCount(): number {
        return this.usedInProjects?.length || 0;
    }

    get isUsed(): boolean {
        return this.projectCount > 0;
    }

    get fullDescription(): string {
        const parts = [this.displaySize];

        if (this.brand) {
            parts.push(this.brand);
        }

        if (this.material) {
            parts.push(this.material);
        }

        return parts.join(" - ");
    }
}
