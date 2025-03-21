import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const cardTemplate = ensureElement<HTMLTemplateElement>('#card');


export interface ICard {
    image: string;
    title: string;
    description: string;
    status: string;
}

export class CardComponent extends Component<ICard> {
    private _image: HTMLElement;
    private _title: HTMLElement;
    private _description: HTMLElement;
    private _status: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._image = ensureElement<HTMLElement>('.card__image', container);
        this._title = ensureElement<HTMLElement>('.card__content', container);
        this._description = ensureElement<HTMLElement>('.card__description', container);
        this._status = ensureElement<HTMLElement>('.card__status', container);

        const button = ensureElement<HTMLButtonElement>('.button', container);

        button.addEventListener('click', () => {
            events.emit('actionbtn:button:click');
        });
    }

    set image(value: string) {
        this.setText(this._image, value);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }
    
    set status(value: string) {
        this.setText(this._status, value);
    }
}

