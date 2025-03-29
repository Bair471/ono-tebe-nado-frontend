import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

// export const cardTemplate = ensureElement<HTMLTemplateElement>('#card');


// export interface ICard {
//     about: string;
//     image: string;
//     status: string;
//     title: string;
// }

// export class CardComponent extends Component<ICard> {
//     private _about: HTMLElement;
//     private _image: HTMLImageElement;
//     private _status: HTMLElement;
//     private _title: HTMLElement;

//     constructor(container: HTMLElement, events: IEvents) {
//         super(container);

//         this._about = ensureElement<HTMLImageElement>('.card__description', container);
//         this._image = ensureElement<HTMLImageElement>('.card__image', container);
//         this._status = ensureElement<HTMLElement>('.card__status', container);
//         this._title = ensureElement<HTMLElement>('.card__content', container);
//     }
    
//     set title(value: string) {
//         this.setText(this._title, value);
//     }

//     set description(value: string) {
//         this.setText(this._about, value);
//     }

//     set image(value: string) {
//         this.setImage(this._image, value);
//     }
    
//     set status(value: string) {
//         this.setText(this._status, value);
//     }

// }
interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export const cardTemplate = ensureElement<HTMLTemplateElement>('#card');

export interface ICard {
    title: string;
    description?: string | string[];
    image: string;
    status: string;
}


export class CardComponent extends Component<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
        this._button = container.querySelector(`.card__button`);
        this._description = container.querySelector(`.card__description`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string | string[]) {
        if (Array.isArray(value)) {
            this._description.replaceWith(...value.map(str => {
                const descTemplate = this._description.cloneNode() as HTMLElement;
                this.setText(descTemplate, str);
                return descTemplate;
            }));
        } else {
            this.setText(this._description, value);
        }
    }
}