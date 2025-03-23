import { ensureElement } from "../utils/utils"
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export const tabsTemplate = ensureElement<HTMLTemplateElement>('#tabs');

interface ITabs {
    
}

export class TabsComponent extends Component<ITabs> {
    constructor(container: HTMLElement, events: IEvents) {
        super(container)
        const activeButton = ensureElement<HTMLElement>('.button_active', container);
        activeButton.addEventListener('click', () => {
            events.emit('tabs:active:clicked');
        })
        
        const closeButton = ensureElement<HTMLElement>('.button_close', container);
        closeButton.addEventListener('click', () => {
            events.emit('tabs:closed:clicked');
        })
}}