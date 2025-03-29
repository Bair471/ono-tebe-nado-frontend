import { ensureElement } from "../utils/utils"
import { Component } from "./base/Component"
import { IEvents } from "./base/events"

export const previewTemplate = ensureElement<HTMLTemplateElement>('#preview');

interface IPreview {
    about: string;
    image: string;
    status: string;
    title: string;
}


export class PreviewComponent extends Component<IPreview> {
    private _about: HTMLElement;
    private _image: HTMLImageElement;
    private _status: HTMLElement;
    private _title: HTMLElement;
    /*Первым запускается конструктор*/
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this._about = ensureElement<HTMLElement>('.lot__description', container);
        this._image = ensureElement<HTMLImageElement>('.lot__image', container);
        this._status = ensureElement<HTMLElement>('.lot__status', container);
        this._title = ensureElement<HTMLElement>('.lot__title', container);

    }
    set about(value: string) {
        this.setText(this._about, value);
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set status(value: string) {
        this.setText(this._status, value);
    }
    set title(value: string) {
        this.setText(this._title, value);
    }
}