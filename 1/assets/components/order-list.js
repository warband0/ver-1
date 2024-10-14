import { newElement } from "./createElementFunction.js";
import { LengthInput } from "./input-length.js";
export class OrderList {

  constructor(parentElement, uniqueKey, article, markSize, allLength, amount, price, cost, fullCostElement) {
    this.parentElement = parentElement;
    this.amountValue = amount;
    this.uniqueKey = uniqueKey;

    this.costValue = Number(cost).toFixed(2);
    this.orderList = newElement('li', ['list'], '', {id: this.uniqueKey})
    this.article = newElement('p', ['list__column'], `${article}`);
    this.markSize = newElement('p', ['list__column'], `${markSize}`);
    this.amount = newElement('p', ['list__column'], `${this.amountValue} м.`);
    this.cost = newElement('p', ['list__column'], `${this.costValue}`);
    this.correctButton = newElement('button', ['list__button'], 'Изменить');
    this.deleteButton = newElement('button', ['list__button'], 'Убрать');

    this.fullCostElement = (Number(fullCostElement.textContent) + Number(cost)).toFixed(2);
    fullCostElement.textContent = this.fullCostElement;
    // this.input = new LengthInput(this.orderList, allLength, article, markSize, price, this.uniqueKey)
    // this.input.rowsContainer.classList.add('rows-container_hidden')

    
    this.deleteButton.addEventListener('click', () => {
      
      fullCostElement.textContent = (Number(fullCostElement.textContent) - Number(this.costValue)).toFixed(2);
      this.orderList.remove()
      localStorage.removeItem(uniqueKey)


    })

    this.correctButton.addEventListener('click', () => {
      this.input.rowsContainer.classList.toggle('rows-container_hidden')
    })


    this.orderList.append(this.article, this.markSize, this.amount, this.cost, /*this.correctButton, */ this.deleteButton)
    this.parentElement.append(this.orderList)


  }

  get totalCost() {
    return this.cost;
  }
}
