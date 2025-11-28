import type { YarnData, YarnPhoto } from "../schemas/yarn";
import Model from "..";

export class YarnModel extends Model<YarnData> {
    constructor(data: YarnData) {
        super(data);
    }

    get primaryPhoto(): YarnPhoto | undefined {
        return this.photos?.find((photo: YarnPhoto) => photo.isPrimary);
    }

    get displayPhoto(): YarnPhoto | undefined {
        return this.primaryPhoto || this.photos?.[0];
    }

    get projectCount(): number {
        return this.usedInProjects?.length || 0;
    }

    get totalLength(): number | null {
        if (!this.length || !this.quantityInStash) return null;
        return this.length * this.quantityInStash;
    }

    get totalWeight(): number | null {
        if (!this.weight || !this.quantityInStash) return null;
        return this.weight * this.quantityInStash;
    }

    get hasMultipleSkeins(): boolean {
        return this.quantityInStash > 1;
    }

    get isInStock(): boolean {
        return this.quantityInStash > 0;
    }
}
