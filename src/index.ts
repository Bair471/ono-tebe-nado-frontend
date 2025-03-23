import './scss/styles.scss';

import { AuctionAPI } from "./components/AuctionAPI";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { BasketComponent, basketTemplate } from './components/Basket';
import { cloneTemplate, ensureElement } from './utils/utils';
import { SuccessComponent, successTemplate } from './components/Success';
import { OrderComponent, orderTemplate } from './components/Order';
import { CardComponent, cardTemplate } from './components/Card';
import { BidComponent, bidTemplate } from './components/Bid';
import { AuctionComponet, auctionTemplate } from './components/Auction';
import { PreviewComponent, previewTemplate } from './components/Preview';
import { SoldComponet, soldTemplate } from './components/Sold';
import { Modal } from './components/common/Modal';
import { TabsComponent, tabsTemplate } from './components/Tabs';
import { HeaderComponent } from './components/Header';

const testContainer = ensureElement<HTMLElement>('#test-section');

const modalContainer = ensureElement('#modal-container');

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
const headerContainer = ensureElement('.header');
const headerComponent = new HeaderComponent(headerContainer, events);
headerComponent.render({
    count: 10
});



// Получаем лоты с сервера
api.getLotList()
    .then(result => {
        // вместо лога поместите данные в модель
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });

////////////BASKET
const basketComponent = new BasketComponent(cloneTemplate(basketTemplate), events);
testContainer.append(basketComponent.render({
    list: 'LIST',
    total: 10
}));



////////////SUCCESS
const success = new SuccessComponent(cloneTemplate(successTemplate), events);
const a = success.render({
    h1: 'ABC'
})

testContainer.append(a);

const modal = new Modal(modalContainer, events);


//////////newOrderComponent
const newOrderComponent = new OrderComponent(cloneTemplate(orderTemplate), events);
const orderRender = newOrderComponent.render({
    email: 'EMAIL',
    phone: 5
});

testContainer.append(orderRender);


events.on('successclick', () => {
    console.log('HELLO BLA BLA BLA');
});

const cardComponent = new CardComponent(cloneTemplate(cardTemplate), events);
testContainer.append(cardComponent.render({
    image: 'LIST',
    title: 'TITLE',
    description: 'DESRIPTION',
    status: 'STATUS'
}));

const bidComponent = new BidComponent(cloneTemplate(bidTemplate), events);
testContainer.append(bidComponent.render({
    amount: 3,
    status: 'STATUS'
}));

const auctionComponet = new AuctionComponet(cloneTemplate(auctionTemplate), events);
testContainer.append(auctionComponet.render({
    timer: 5,
    text: 'TEXT'
}));


//////////////PREVIEW
const previewComponent = new PreviewComponent(cloneTemplate(previewTemplate), events);
testContainer.append(previewComponent.render({
    status: 'STATUS',
    title: 'TITLE',
    description: 'DESCRIPTIOM',
}));


//////////////SOLD
const soldComponet = new SoldComponet(cloneTemplate(soldTemplate), events);
const soldRender = soldComponet.render({
    amount: 5,
    status: 'STATUS'
});


/////////////TABS
const tabsComponent = new TabsComponent(cloneTemplate(tabsTemplate), events);
const tabsRender = tabsComponent.render({});


events.on('tabs:active:clicked', () => {
    const common = document.createElement('div');
    common.append(tabsRender);
    common.append(soldRender);
    modal.render({content: common})
});

events.on('tabs:closed:clicked', () => {
    const common = document.createElement('div');
    common.append(tabsRender);
    common.append(orderRender);
    modal.render({content: common})
});


events.on('cart:clicked', () => {
    const common = document.createElement('div');
    common.append(tabsRender);
    common.append(orderRender);
    modal.render({content: common})
});





