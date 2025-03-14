import type { IGradientColorOpacityAnimation } from "../../Interfaces/IOptionsGradient";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RangeValue } from "../../../Types/RangeValue";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { StartValueType } from "../../../Enums/Types/StartValueType";
import { setRangeValue } from "../../../Utils/NumberUtils";

export class GradientColorOpacityAnimation
    implements IGradientColorOpacityAnimation, IOptionLoader<IGradientColorOpacityAnimation>
{
    count: RangeValue;
    enable;
    speed: RangeValue;
    decay: RangeValue;
    sync;
    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
        this.startValue = StartValueType.random;
    }

    load(data?: RecursivePartial<IGradientColorOpacityAnimation>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = setRangeValue(data.count);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
