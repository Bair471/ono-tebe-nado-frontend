import { ensureAllElements } from "../../utils/utils";

const containerOrder = ensureElement<HTMLElement>('#order');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order-form');
const templateCopy = cloneTemplate(orderTemplate);

interface IOrder {
    email: string;
    phone: string;
}

class OrderComponent extends Component<IOrder> {
    private events: IEvents;
    private _email: HTMLElement;
    private _phone: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.events = events;

        this._email = ensureElement<HTMLElement>('.form__input_email', container);
        this._phone = ensureElement<HTMLElement>('.form__input_phone', container);
       
    }

    set email(value: string) {
        this.setText(this._email, value);
    }

    set phone(value: string) {
        this.setText(this._phone, value);
    }
}

const abc = new OrderComponent(abcContainer, events);
testContainer.append(abc.render({
    email: 'EMAIL',
    phone: 'PHONE'
}));