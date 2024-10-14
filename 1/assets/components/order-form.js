import { newElement } from "./createElementFunction.js";
import { OrderList } from "./order-list.js";

export class OrderForm {

  _fullCost = 0;

  constructor(parentElement) {
    this.parentElement = parentElement;
    this.mapList = new Map;

    this.orderContainer = newElement('div', ['order']);
    
    this.orderListContainer = newElement('ol', ['order__list-container']);

    this.orderForm = newElement('form', ['order__form']);

    this.fullCostElement = newElement('div', ['order__total-cost'], `${this.fullCost}`);
    console.log(this.fullCostElement);
    this.fullCostContainer = newElement('div', ['order__total-cost-container']);
    this.rub = newElement('div', [], 'руб.');
    this.total = newElement('div', [], 'Итого:');
    this.fullCostContainer.append(this.total,  this.fullCostElement, this.rub)
    
    this.orderClientNameLabel = newElement('label', ['order__form-label'], 'Имя:', {for: 'Name'});
    this.orderClientNameInput = newElement('input', ['order__form-input'], '', { type: 'text', id: 'Name', name: 'Имя', required: true});

    this.orderClientTelLabel = newElement('label', ['order__form-label'], 'Телефон:', {for: 'Tel'});
    this.orderClientTelInput = newElement('input', ['order__form-input'], '', { type: 'tel', id: 'Tel', name: 'Телефон', required: true});

    this.orderClientINNLabel = newElement('label', ['order__form-label'], 'ИНН:', {for: 'INN'});
    this.orderClientINNInput = newElement('input', ['order__form-input'], '', { type: 'text', id: 'INN', name: 'ИНН', required: true})

    this.orderClientMailLabel = newElement('label', ['order__form-label'], 'E-mail:', {for: 'Mail'});
    this.orderClientMailInput= newElement('input', ['order__form-input'], '', { type: 'email', id: 'Mail', name: 'Почта'});

    this.orderClientCityLabel = newElement('label', ['order__form-label'], 'Город:', {for: 'City'});
    this.orderClientCityInput = newElement('input', ['order__form-input'], '', { type: 'text', id: 'City', name: 'Город'})

    this.orderClientDescriptionLabel = newElement('label', ['order__form-label'], 'Описание:', {for: 'Description'});
    this.orderClientDescriptionInput = newElement('textarea', ['order__form-input'], '', {id: 'Description', name: 'Описание'})


    this.orderButtonsContainer = newElement('div', ['order__button-container']);
    this.acceptButton = newElement('input', ['order__accept-button'], 'Заказать', { type: 'submit'})
    this.resetButton = newElement('input', ['order__accept-button'], 'Сбросить', { type: 'reset'})

    this.orderButtonsContainer.append(this.acceptButton, this.resetButton)

    this.orderListContainer.append(this.fullCostContainer)

    this.orderForm.append(this.orderClientNameLabel, this.orderClientNameInput, this.orderClientTelLabel, this.orderClientTelInput, this.orderClientINNLabel, this.orderClientINNInput, this.orderClientMailLabel, this.orderClientMailInput, this.orderClientCityLabel, this.orderClientCityInput, this.orderClientDescriptionLabel, this.orderClientDescriptionInput, this.orderButtonsContainer)

    for(let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue
      }
      this.addList(key)
    }

    this.orderContainer.append(this.orderListContainer, this.orderForm)

    this.parentElement.append(this.orderContainer)

  }

  addList(key) {
    const storageValue = JSON.parse(localStorage.getItem(key));
    const order = new OrderList(this.orderListContainer, key, storageValue.article, storageValue.markSize, storageValue.allLength, storageValue.amount, storageValue.price, storageValue.cost, this.fullCostElement);
    this.mapList.set(key, order);
    
    this.fullCost = Number(storageValue.cost)
  }

  get fullCost() {
    return Number(this._fullCost);
  }

  set fullCost(cost) {
    
    this._fullCost = (Number(cost) + this._fullCost);
    this.fullCostElement.textContent = Number(this._fullCost).toFixed(2);
  }
}