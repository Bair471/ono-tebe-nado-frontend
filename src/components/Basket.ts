import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";
        
export const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

interface IBasket {
    list: string;
    total: number;
}

export class BasketComponent extends Component<IBasket> {

    private _list: HTMLElement;
    private _total: HTMLElement;
    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', container);
        this._total = ensureElement<HTMLElement>('.basket__total', container);

        const button = ensureElement<HTMLButtonElement>('.button', container);

        button.addEventListener('click', () => {
            events.emit('actionbtn:button:click');
        });
    }

    set list(value: string) {
        this.setText(this._list, value);
    }

    set total(value: number) {
        this.setText(this._total, value);
    }
}

