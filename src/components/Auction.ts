import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

const auctionTemplate = ensureElement<HTMLTemplateElement>('#auction');

interface IAuction {
    timer: number;
    text: string;
}

class AuctionComponent extends Component<IAuction> {
    private timer: HTMLElement;
    private text: HTMLElement;
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
    }
}


