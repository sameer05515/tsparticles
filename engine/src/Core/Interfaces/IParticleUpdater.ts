import type { IDelta } from "./IDelta";
import type { IParticleColorStyle } from "./IParticleColorStyle";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { Particle } from "../Particle";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";

export interface IParticleUpdater {
    init(particle: Particle): void;

    isEnabled(particle: Particle): boolean;

    update(particle: Particle, delta: IDelta): void;

    beforeDraw?: (particle: Particle) => void;

    getColorStyles?: (
        particle: Particle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number
    ) => IParticleColorStyle;

    afterDraw?: (particle: Particle) => void;

    loadOptions?: (options: ParticlesOptions, ...sources: (RecursivePartial<IParticlesOptions> | undefined)[]) => void;
}
