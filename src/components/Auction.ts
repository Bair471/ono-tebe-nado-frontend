import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

const auctionTemplate = ensureElement<HTMLTemplateElement>('#auction');

interface IAuction {
    timer: number;
    text: string;
}

class AuctionComponent implements Component<IAuction> {
    
}

