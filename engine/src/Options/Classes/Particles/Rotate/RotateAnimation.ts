import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRotateAnimation } from "../../../Interfaces/Particles/Rotate/IRotateAnimation";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { setRangeValue } from "../../../../Utils/NumberUtils";

/**
 * @category Options
 */
export class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
    enable;
    speed: RangeValue;
    decay: RangeValue;
    sync;

    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
    }

    load(data?: RecursivePartial<IRotateAnimation>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        if (data.decay !== undefined) {
            this.decay = setRangeValue(data.decay);
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
