import { AnimatableColor } from "../AnimatableColor";
import { GradientColorOpacity } from "./GradientColorOpacity";
import type { IAnimatableGradientColor } from "../../Interfaces/IOptionsGradient";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class AnimatableGradientColor implements IAnimatableGradientColor, IOptionLoader<IAnimatableGradientColor> {
    stop;
    value;
    opacity?: GradientColorOpacity;

    constructor() {
        this.stop = 0;
        this.value = new AnimatableColor();
    }

    load(data?: RecursivePartial<IAnimatableGradientColor>): void {
        if (!data) {
            return;
        }

        if (data.stop !== undefined) {
            this.stop = data.stop;
        }

        this.value = AnimatableColor.create(this.value, data.value);

        if (data.opacity !== undefined) {
            this.opacity = new GradientColorOpacity();

            if (typeof data.opacity === "number") {
                this.opacity.value = data.opacity;
            } else {
                this.opacity.load(data.opacity);
            }
        }
    }
}
