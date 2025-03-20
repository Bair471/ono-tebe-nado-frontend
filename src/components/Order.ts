import { ensureElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

export interface IOrder {
    email: string;
    phone: number;
}

export class OrderComponent extends Component<IOrder> {
    private _email: HTMLElement;
    private _phone: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._email = ensureElement<HTMLElement>('.form__input_email', container);
        this._phone = ensureElement<HTMLElement>('.form__input_phone', container);
       
        const button = ensureElement<HTMLButtonElement>('.button', container);

        button.addEventListener('click', () => {
            events.emit('actionbtn:button:click');
        });
    }

    set email(value: string) {
        this.setText(this._email, value);
    }

    set phone({ phone }: IOrder) {
        this.setText(this._phone, formatNumber(phone));
    }
}
