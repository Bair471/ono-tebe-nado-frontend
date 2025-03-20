import './scss/styles.scss';

import { AuctionAPI } from "./components/AuctionAPI";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { BasketComponent, basketTemplate } from './components/Basket';
import { cloneTemplate, ensureElement } from './utils/utils';
import { SuccessComponent, successTemplate } from './components/Success';
import { OrderComponent, orderTemplate } from './components/Order';
import { CardComponent, cardTemplate } from './components/Card';

const testContainer = ensureElement<HTMLElement>('#test-section');

const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны


// Модель данных приложения


// Глобальные контейнеры


// Переиспользуемые части интерфейса


// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно


// Получаем лоты с сервера
api.getLotList()
    .then(result => {
        // вместо лога поместите данные в модель
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });


const basketComponent = new BasketComponent(cloneTemplate(basketTemplate), events);
testContainer.append(basketComponent.render({
    list: 'LIST',
    total: 10
}));

const success = new SuccessComponent(cloneTemplate(successTemplate), events);
testContainer.append(success.render({
    h1: 'ABC'
}));

const newOrderComponent = new OrderComponent(cloneTemplate(orderTemplate), events);
testContainer.append(newOrderComponent.render({
    email: 'EMAIL',
    phone: 5
}));

events.on('successclick', () => {
    console.log('HELLO BLA BLA BLA');
});

const cardComponent = new CardComponent(cloneTemplate(cardTemplate), events);
testContainer.append(cardComponent.render({
    image: 'LIST',
    title: 'TITLE',
    description: 'DESRIPTION'
}));
