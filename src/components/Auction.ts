import { ensureElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const auctionTemplate = ensureElement<HTMLTemplateElement>('#auction');

interface IAuction {
    timer: number;
    text: string;
}

export class AuctionComponet extends Component<IAuction> {

    private _timer: HTMLElement;
    private _text: HTMLElement;
    constructor(container: HTMLAnchorElement, events: IEvents) {
        super(container);

        this._timer = ensureElement<HTMLElement>('.lot__auction-timer', container);
        this._text = ensureElement<HTMLElement>('.lot__auction-text', container);

        const button = ensureElement<HTMLElement>('button', container);
        button.addEventListener('click', (e) => {
            e.preventDefault();
            events.emit('actionbtn:button:click');
        })
    }
    set timer(value: number) {
        this.setText(this._timer, formatNumber(value));
    }

    set text(value: string) {
        this.setText(this._text, value);
    }
}

