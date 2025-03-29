import { ensureElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const soldTemplate = ensureElement<HTMLTemplateElement>('#sold');

interface ISold {
    amount: number;
    status: string;
}

export class SoldComponet extends Component<ISold> {

    private _amount: HTMLElement;
    private _status: HTMLElement;
    constructor(container: HTMLAnchorElement, events: IEvents) {
        super(container);

        this._amount = ensureElement<HTMLElement>('.bid__amount', container);
        this._status= ensureElement<HTMLElement>('.bid__status', container);
        const button = ensureElement<HTMLElement>('.bid__selector-input', container);
        button.addEventListener('change', function () {
                events.emit('sold:button:click'); ///////???????
        });

    }
    set amount(value: number) {
        this.setText(this._amount, formatNumber(value));
    }

    set status(value: string) {
        this.setText(this._status, value);
    }
}
