import { Container } from "./Container";
import type { Engine } from "../engine";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple";
import { generatedAttribute } from "./Utils/Constants";
import { itemFromArray } from "../Utils/Utils";

/**
 * Default fetch error catcher
 * @param statusCode the fecth status code error
 */
function fetchError(statusCode: number): void {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}

async function getDataFromUrl(
    jsonUrl?: SingleOrMultiple<string>,
    index?: number
): Promise<SingleOrMultiple<RecursivePartial<IOptions>> | undefined> {
    const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;

    if (!url) {
        return;
    }

    const response = await fetch(url);

    if (!response.ok) {
        fetchError(response.status);

        return;
    }

    return response.json();
}

/**
 * Loader params for options local object
 */
interface LoaderParams {
    /**
     * The container HTML element, could be a canvas or any other element that will contain the canvas
     */
    element?: HTMLElement;

    /**
     * The index of the chosen element of the options array, if an array is given. If not specified, a random index will be used
     */
    index?: number;

    /**
     * The options object or the options array to laod
     */
    options?: SingleOrMultiple<RecursivePartial<IOptions>>;

    /**
     * The id assigned to the container
     */
    tagId?: string;

    /**
     * Used for loading options locally or remotely
     */
    remote: boolean;

    /**
     * The url or the url array used to get options
     */
    url?: SingleOrMultiple<string>;
}

/**
 * Main class for creating the [[Container]] objects
 * @category Core
 */
export class Loader {
    /**
     * The engine containing this Loader instance
     * @private
     */
    readonly #engine;

    /**
     * Loader constructor, assigns the engine
     * @param engine the engine containing this Loader instance
     */
    constructor(engine: Engine) {
        this.#engine = engine;
    }

    /**
     * Starts an animation in a container, starting from the given options
     * @param params all the parameters required for loading options in the current animation
     */
    async loadOptions(params: LoaderParams): Promise<Container | undefined> {
        const tagId = params.tagId ?? `tsparticles${Math.floor(Math.random() * 10000)}`,
            { index, url: jsonUrl, remote } = params,
            options = remote ? await getDataFromUrl(jsonUrl, index) : params.options;

        /* elements */
        let domContainer = params.element ?? document.getElementById(tagId);

        if (!domContainer) {
            domContainer = document.createElement("div");

            domContainer.id = tagId;

            document.querySelector("body")?.append(domContainer);
        }

        const currentOptions = options instanceof Array ? itemFromArray(options, index) : options,
            dom = this.#engine.dom(),
            oldIndex = dom.findIndex((v) => v.id === tagId);

        if (oldIndex >= 0) {
            const old = this.#engine.domItem(oldIndex);

            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }

        let canvasEl: HTMLCanvasElement;

        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer as HTMLCanvasElement;

            canvasEl.dataset[generatedAttribute] = "false";
        } else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");

            /* get existing canvas if present, otherwise a new one will be created */
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];

                canvasEl.dataset[generatedAttribute] = "false";
            } else {
                /* create canvas element */
                canvasEl = document.createElement("canvas");

                canvasEl.dataset[generatedAttribute] = "true";

                /* append canvas */
                domContainer.appendChild(canvasEl);
            }
        }

        if (!canvasEl.style.width) {
            canvasEl.style.width = "100%";
        }

        if (!canvasEl.style.height) {
            canvasEl.style.height = "100%";
        }

        /* launch tsParticles */
        const newItem = new Container(this.#engine, tagId, currentOptions);

        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl);

        await newItem.start();

        return newItem;
    }

    /**
     * Starts an animation in a container, starting from the given remote options
     * @param params all the parameters required for loading a remote url into options in the current animation
     */
    async loadRemoteOptions(params: LoaderParams): Promise<Container | undefined> {
        return this.loadOptions(params);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
    load(
        tagId: string | SingleOrMultiple<RecursivePartial<IOptions>>,
        options?: SingleOrMultiple<RecursivePartial<IOptions>> | number,
        index?: number
    ): Promise<Container | undefined> {
        const params: LoaderParams = { index, remote: false };

        if (typeof tagId === "string") {
            params.tagId = tagId;
        } else {
            params.options = tagId;
        }

        if (typeof options === "number") {
            params.index = options;
        } else {
            params.options = options ?? params.options;
        }

        return this.loadOptions(params);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param id the particles container element id
     * @param domContainer the dom container
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
    async set(
        id: string | HTMLElement,
        domContainer: HTMLElement | SingleOrMultiple<RecursivePartial<IOptions>>,
        options?: SingleOrMultiple<RecursivePartial<IOptions>> | number,
        index?: number
    ): Promise<Container | undefined> {
        const params: LoaderParams = { index, remote: false };

        if (typeof id === "string") {
            params.tagId = id;
        } else {
            params.element = id;
        }

        if (domContainer instanceof HTMLElement) {
            params.element = domContainer;
        } else {
            params.options = domContainer;
        }

        if (typeof options === "number") {
            params.index = options;
        } else {
            params.options = options ?? params.options;
        }

        return this.loadOptions(params);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async loadJSON(
        tagId: string | SingleOrMultiple<string>,
        jsonUrl?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        let url: SingleOrMultiple<string>, id: string | undefined;

        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId;
        } else {
            id = tagId as string;
            url = jsonUrl;
        }

        return this.loadRemoteOptions({ tagId: id, url, index, remote: true });
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param id the particles container element id
     * @param domContainer the container used to contains the particles
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async setJSON(
        id: string | HTMLElement,
        domContainer: HTMLElement | SingleOrMultiple<string>,
        jsonUrl: SingleOrMultiple<string> | (number | undefined),
        index?: number
    ): Promise<Container | undefined> {
        let url: SingleOrMultiple<string>,
            newId: string | undefined,
            newIndex: number | undefined,
            element: HTMLElement;

        if (id instanceof HTMLElement) {
            element = id;
            url = domContainer as SingleOrMultiple<string>;
            newIndex = jsonUrl as number;
        } else {
            newId = id;
            element = domContainer as HTMLElement;
            url = jsonUrl as SingleOrMultiple<string>;
            newIndex = index;
        }

        return this.loadRemoteOptions({ tagId: newId, url, index: newIndex, element, remote: true });
    }
}
