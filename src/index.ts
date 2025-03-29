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


const lotsContainer = ensureElement<HTMLElement>('#lots-container');

const modalContainer = ensureElement('#modal-container');


const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

let items;
const orderModel = {email:'', phone: ''};

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


api.getLotList()
    .then(result => {
        items = result
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const cardComponent = new CardComponent(cloneTemplate(cardTemplate), {
                onClick: () => events.emit('card:select', item)
            });
            const cardRender = cardComponent.render({
                description: item.about,
                image: item.image,
                status: item.status,
                title: item.title,
            });
            lotsContainer.append(cardRender);
        }
    })
    .catch(err => {
        console.error(err);
    });


const modal = new Modal(modalContainer, events);

////////////BASKET
const basketComponent = new BasketComponent(cloneTemplate(basketTemplate), events);

events.on('basket:button:click', () => {
    const basketRender = basketComponent.render({
        list: 'LIST',
        total: 10
    });
    const common = document.createElement('div');
    common.append(basketRender);
    modal.render({ content: common })
})

////////////SUCCESS
const success = new SuccessComponent(cloneTemplate(successTemplate), events);

events.on('order:submit', () => {
    const successRender = success.render({
        h1: 'ABC'
    })
    const common = document.createElement('div');
    common.append(successRender);
    modal.render({ content: common })
});

//////////newOrderComponent
const newOrderComponent = new OrderComponent(cloneTemplate(orderTemplate), events);
events.on('order:button:click', () => {
    const orderRender = newOrderComponent.render({
        email: '',
        phone: '',
        valid: false,
        errors: '',
    });

    const common = document.createElement('div');
    common.append(orderRender);
    modal.render({ content: common })
});

/////методы для нажатия на кнопки и в них вызов валидации
events.emit('order:button:click');
interface IOrderEmailChange {
    field: 'email';
    value: string;
}
events.on<IOrderEmailChange>('order.email:change', (e) => {
    orderModel.email = e.value;
    validate();
})
events.on<IOrderEmailChange>('order.phone:change', (e) => {
    orderModel.phone = e.value;
    validate();
})

function validate() {
    if(orderModel.email !== '' && orderModel.phone !== '') {
        newOrderComponent.valid = true;
        newOrderComponent.errors = '';
    } else {
        newOrderComponent.valid = false;
        newOrderComponent.errors = 'ERROR';
    }
    console.log(orderModel);
}

////////////CARD
// const cardComponent = new CardComponent(cloneTemplate(cardTemplate), events);


// events.on('card:button:click', () => {
//     const cardRender = cardComponent.render({
//         image: '',
//         title: '',
//         description: '',
//         status: ''
//     });

//     const common = document.createElement('div');
//     common.append(cardRender);
//     modal.render({ content: common })
// })


////////////BID
const bidComponent = new BidComponent(cloneTemplate(bidTemplate), events);

events.on('bid:button:click', () => {
    const bidRender = bidComponent.render({
        amount: 3,
        status: 'STATUS'
    });

    const common = document.createElement('div');
    common.append(bidRender);
    modal.render({ content: common })
});


////////////AUCTION
const auctionComponet = new AuctionComponet(cloneTemplate(auctionTemplate), events);

events.on('actionbtn:button:click', () => {
    const auctionRender = auctionComponet.render({
        timer: 5,
        text: 'TEXT'
    });

    const common = document.createElement('div');
    common.append(auctionRender);
    modal.render({ content: common })
});

//////////////PREVIEW
// const previewComponent = new PreviewComponent(cloneTemplate(previewTemplate), events);
// testContainer.append(previewComponent.render({
//     status: 'STATUS',
//     title: 'TITLE',
//     description: 'DESCRIPTIOM',
// }));



//////////////SOLD
const soldComponet = new SoldComponet(cloneTemplate(soldTemplate), events);

events.on('sold:button:click', () => {
    const soldRender = soldComponet.render({
        amount: 5,
        status: 'STATUS'
    });

    const common = document.createElement('div');
    common.append(soldRender);
    modal.render({ content: common })
});

/////////////TABS
const tabsComponent = new TabsComponent(cloneTemplate(tabsTemplate), events);

events.on('tabs:active:clicked', () => {
    const tabsRender = tabsComponent.render({});
    
    const common = document.createElement('div');
    common.append(tabsRender);
    
    modal.render({ content: common })
});

events.on('tabs:closed:clicked', () => {
    const tabsRender = tabsComponent.render({});
    const soldRender = soldComponet.render({
        amount: 6,
        status: 'STATUS'
    });

    const common = document.createElement('div');
    common.append(tabsRender);
    common.append(soldRender);
    modal.render({ content: common })
});


events.on('cart:clicked', () => {
    const tabsRender = tabsComponent.render({});

    const common = document.createElement('div');
    common.append(tabsRender);
    modal.render({ content: common })
});



/*
1) подсоеденить lot.list lot.status в карзине для правильного отоброжения, сейчас там закрытые в активных 
2) лоты отображаются не в правильном компоненте.
3) сделать правильный preview.
4) кнопка на главную подвезать event.emit
 */