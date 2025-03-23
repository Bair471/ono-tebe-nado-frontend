import { ensureElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

export interface IOrder {
   
}

export class OrderComponent extends Component<IOrder> {

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        const emailInput = ensureElement<HTMLInputElement>('.form__input_email', container);
        emailInput.addEventListener('change', function (e) {
            console.log(e.target);
        })
        
        const phoneInput = ensureElement<HTMLInputElement>('.form__input_phone', container);
        phoneInput.addEventListener('change', function (e) {
            console.log(e.target);
        })
       
        const button = ensureElement<HTMLButtonElement>('.button', container);
        button.addEventListener('click', () => {
            events.emit('actionbtn:button:click');
        });
    }
}
