import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";

export class RollOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: unknown;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("roll", "Roll");
        this.options = this.group.data as unknown;

        this.addDarken();
        this.addEnlighten();
        this.addProperties();
    }

    private addDarken() {
        const particles = this.particles;
        const group = this.group.addGroup("darken", "Darken");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addEnlighten() {
        const particles = this.particles;
        const group = this.group.addGroup("enlighten", "Enlighten");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles,
            options = this.options as {
                backColor: string | unknown[] | { value: unknown };
            },
            color =
                typeof options.backColor === "string"
                    ? options.backColor
                    : options.backColor instanceof Array
                    ? options.backColor[0]
                    : options.backColor?.value;

        this.group
            .addProperty("backColor", "Back Color", EditorType.color, color, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof options.backColor === "string") {
                        options.backColor = value;
                    } else {
                        if (options.backColor === undefined) {
                            options.backColor = {
                                value: value,
                            };
                        } else {
                            if (options.backColor instanceof Array) {
                                options.backColor = {
                                    value: value,
                                };
                            } else {
                                options.backColor.value = value;
                            }
                        }
                    }
                }

                await particles.refresh();
            });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
