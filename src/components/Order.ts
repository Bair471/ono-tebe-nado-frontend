import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

export interface IOrder {
   email: string;
   phone: string;
}

export class OrderComponent extends Form<IOrder> {
    _email: HTMLInputElement;
    _phone: HTMLInputElement;
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._email = ensureElement<HTMLInputElement>('.form__input_email', container);

        this._phone = ensureElement<HTMLInputElement>('.form__input_phone', container);
    }

    set email(value: string) {
        this.setText(this._email, value);
    }

    set phone(value: string) {
        this.setText(this._phone, value);
    }

}
