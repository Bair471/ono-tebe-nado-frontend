import { ensureElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const bidTemplate = ensureElement<HTMLTemplateElement>('#bid');

interface IBid {
    amount: number;
    status: string;
}

export class BidComponent extends Component<IBid> {
    protected _amount: HTMLElement;
    protected _status: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this._amount = ensureElement<HTMLElement>(`.bid__amount`, container);
        this._status = ensureElement<HTMLElement>(`.bid__status`, container);

        const button = ensureElement<HTMLButtonElement>('.bid__open', container);

        button.addEventListener('click', () => {
            events.emit('bid:button:click');
        });
    }

    set amount(value: number) {
        this.setText(this._amount, formatNumber(value));
    }

    set status(value: string) {
        this.setText(this._status, value);
    }
}