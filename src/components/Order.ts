import { cloneTemplate, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

const containerOrder = ensureElement<HTMLElement>('#order');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order-form');
const templateCopy = cloneTemplate(orderTemplate);

export interface IOrder {
    email: string;
    phone: string;
}

export class OrderComponent extends Component<IOrder> {
    private events: IEvents;
    private _email: HTMLElement;
    private _phone: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.events = events;

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

    set phone(value: string) {
        this.setText(this._phone, value);
    }
}

