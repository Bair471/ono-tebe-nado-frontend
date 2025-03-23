import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IHeader {
    count: number;
}

export class HeaderComponent extends Component<IHeader> {
    _countElement: HTMLElement;
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this._countElement = ensureElement('.header__basket-counter', container);

        const button = ensureElement('.header__basket', container);
        button.addEventListener('click', () => {
            events.emit('cart:clicked');
        })
    }

    set count(value: number) {
        this.setText(this._countElement, value);
    }
} 