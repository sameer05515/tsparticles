/**
 * @category Options
 */
import type { EasingType } from "../../../../Enums/Types/EasingType";

export interface IRepulseBase {
    distance: number;
    duration: number;
    easing: EasingType;
    factor: number;
    maxSpeed: number;
    speed: number;
}
