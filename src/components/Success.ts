import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";

export const successTemplate = ensureElement<HTMLTemplateElement>("#success");


export class SuccessComponent extends Component<{h1:string}> {
    title: HTMLElement;
    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.title = ensureElement('.state__title', container);
        const button = ensureElement('.button', container);
        button.addEventListener('click', () => {
            console.log('HELLO 2');
            events.emit('successclick');
        })
    }
    set h1(value: string) {
        this.setText(this.title, value);        
    }
}

