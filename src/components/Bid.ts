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

        const button = ensureElement<HTMLButtonElement>('.button', container);

        button.addEventListener('click', () => {
            events.emit('actionbtn:button:click');
        });
    }

    set status({ amount, status }: IBid) {
        this.setText(this._amount, formatNumber(amount));

        if (status) this.setVisible(this._status);
        else this.setHidden(this._status);
    }
}