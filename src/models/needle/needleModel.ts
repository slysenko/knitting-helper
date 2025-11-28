import type { NeedleData } from "../schemas/needle";
import Model from "..";

export class NeedleModel extends Model<NeedleData> {
    constructor(data: NeedleData) {
        super(data);
    }

    get displaySize(): string {
        if (this.sizeUs) {
            return `${this.sizeMm}mm (US ${this.sizeUs})`;
        }
        return `${this.sizeMm}mm`;
    }

    get displayType(): string {
        const typeMap = {
            straight: "Straight",
            circular: "Circular",
            dpn: "Double-Pointed",
        };
        return typeMap[this.type];
    }

    get displayLength(): string | null {
        if (!this.lengthCm) return null;
        return `${this.lengthCm}cm`;
    }

    get projectCount(): number {
        return this.usedInProjects?.length || 0;
    }

    get isUsed(): boolean {
        return this.projectCount > 0;
    }

    get fullDescription(): string {
        const parts = [this.displaySize, this.displayType];

        if (this.lengthCm) {
            parts.push(this.displayLength!);
        }

        if (this.brand) {
            parts.push(this.brand);
        }

        if (this.material) {
            parts.push(this.material);
        }

        return parts.join(" - ");
    }
}
