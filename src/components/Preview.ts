import { ensureElement } from "../utils/utils"
import { Component } from "./base/Component"
import { IEvents } from "./base/events"

export const previewTemplate = ensureElement<HTMLTemplateElement>('#preview');

interface IPreview {
    status: string;
    title: string;
    description: string;
}


export class PreviewComponent extends Component<IPreview> {
    private _status: HTMLElement;
    private _title: HTMLElement;
    private _description: HTMLElement;
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this._status = ensureElement<HTMLElement>('.lot__status', container);
        this._title = ensureElement<HTMLElement>('.lot__title', container);
        this._description = ensureElement<HTMLElement>('.lot__description', container);
    }

    set status(value: string) {
        this.setText(this._status, value);
    }
    set title(value: string) {
        this.setText(this._title, value);
    }
    set description(value: string) {
        this.setText(this._description, value);
    }
}