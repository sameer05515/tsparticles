import {
    Circle,
    ClickMode,
    ExternalInteractorBase,
    HoverMode,
    Range,
    Vector,
    calcEasing,
    clamp,
    getDistances,
    isInArray,
    mouseMoveEvent,
} from "tsparticles-engine";
import type { Container, ICoordinates, Particle } from "tsparticles-engine";

interface IContainerAttract {
    particles: Particle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}

type ContainerAttractor = Container & {
    attract?: IContainerAttract;
};

/**
 * Particle external attract manager
 * @category Interactions
 */
export class Attractor extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;

    constructor(container: ContainerAttractor) {
        super(container);

        if (!container.attract) {
            container.attract = { particles: [] };
        }

        this.handleClickMode = (mode): void => {
            const options = this.container.actualOptions;

            if (mode !== ClickMode.attract) {
                return;
            }

            if (!container.attract) {
                container.attract = { particles: [] };
            }

            container.attract.clicking = true;
            container.attract.count = 0;

            for (const particle of container.attract.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }

                particle.velocity.setTo(particle.initialVelocity);
            }

            container.attract.particles = [];
            container.attract.finish = false;

            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.attract) {
                        container.attract = { particles: [] };
                    }

                    container.attract.clicking = false;
                }
            }, options.interactivity.modes.attract.duration * 1000);
        };
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }

        const hoverMode = events.onHover.mode,
            clickMode = events.onClick.mode;

        return isInArray(HoverMode.attract, hoverMode) || isInArray(ClickMode.attract, clickMode);
    }

    clear(): void {
        // do nothing
    }

    reset(): void {
        // do nothing
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
            events = options.interactivity.events,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            clickEnabled = events.onClick.enable,
            clickMode = events.onClick.mode;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.attract, hoverMode)) {
            this.hoverAttract();
        } else if (clickEnabled && isInArray(ClickMode.attract, clickMode)) {
            this.clickAttract();
        }
    }

    private hoverAttract(): void {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const attractRadius = container.retina.attractModeDistance;

        this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    }

    private processAttract(position: ICoordinates, attractRadius: number, area: Range): void {
        const container = this.container,
            attractOptions = container.actualOptions.interactivity.modes.attract,
            query = container.particles.quadTree.query(area, (p) => this.isEnabled(p));

        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position);
            const velocity = attractOptions.speed * attractOptions.factor;
            const attractFactor = clamp(
                calcEasing(1 - distance / attractRadius, attractOptions.easing) * velocity,
                0,
                attractOptions.maxSpeed
            );
            const normVec = Vector.create(
                distance === 0 ? velocity : (dx / distance) * attractFactor,
                distance === 0 ? velocity : (dy / distance) * attractFactor
            );

            particle.position.subFrom(normVec);
        }
    }

    private clickAttract(): void {
        const container = this.container as ContainerAttractor;

        if (!container.attract) {
            container.attract = { particles: [] };
        }

        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }

            container.attract.count++;

            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }

        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition;

            if (!mousePos) {
                return;
            }

            const attractRadius = container.retina.attractModeDistance;

            this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
        } else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }

        return;
    }
}
