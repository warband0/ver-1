import { newElement } from "./createElementFunction.js";

export class LengthInput {
  _currentLength = 0;

  constructor(parentElement, allLength, article, markSize, price, uniqueKey) {
    this.uniqueKey = uniqueKey;
    this.parentElement = parentElement;
    this.article = article;
    this.markSize = markSize;
    this.price = price;
    this.allLength = Number(allLength);
    this.rowsContainer = newElement('div', ['rows-container'], '', {id: uniqueKey});
    this.allLengthText = newElement('div', ['rows-container__allLengthText'], `${this.allLength} м.`);
    this.controlContainer = newElement('div', ['rows-container__control-panel']);
    this.inputLength = newElement('input', ['rows-container__input-length'], '', {value: 0});
    this.buttonPickZero = newElement('button', ['rows-container__control-button'], '|<', {disabled: true});
    this.buttonDecrease = newElement('button', ['rows-container__control-button'], '<', {disabled: true});
    this.buttonPickAll = newElement('button', ['rows-container__control-button'], '>|');
    this.buttonIncrease = newElement('button', ['rows-container__control-button'], '>');
    this.buttonAdd = newElement('button', ['rows-container__add-button'], 'Добавить', {"data-add": "Добавить", "data-cancel": "Отменить"});


    this.buttonIncrease.addEventListener('click', () => {
      this.length = this._currentLength += 1;
      this.changeLength(this.length);
    })
    this.buttonDecrease.addEventListener('click', () => {
      this.length = this._currentLength -= 1;
      this.changeLength(this.length);
    })
    this.buttonPickAll.addEventListener('click', () => {
      this.length = this.allLength;
      this.changeLength(this.length);
    })
    this.buttonPickZero.addEventListener('click', () => {
      this.length = 0;
      this.changeLength(this.length);
    })


    this.buttonAdd.addEventListener('click', () => {
      
      if(this.buttonAdd.textContent === 'Добавить') {
        this.buttonAdd.textContent =  this.buttonAdd.getAttribute('data-cancel')

        this.buttonDecrease.disabled = true;
        this.buttonPickZero.disabled = true;
  
        this.buttonIncrease.disabled = true;
        this.buttonPickAll.disabled = true;
  
        this.inputLength.disabled = true;

        const cable = {
          article: this.article,
          markSize: this.markSize,
          allLength: this.allLength,
          amount: this._currentLength,
          price: this.price,
          cost: `${Number(this.price) * Number(this._currentLength)}`
        };
        localStorage.setItem(uniqueKey, JSON.stringify(cable));

      } else {
        this.buttonAdd.textContent =  this.buttonAdd.getAttribute('data-add')

        this.buttonDecrease.disabled = false;
        this.buttonPickZero.disabled = false;
  
        this.buttonIncrease.disabled = false;
        this.buttonPickAll.disabled = false;
  
        this.inputLength.disabled = false;
  
        localStorage.removeItem(uniqueKey);

      }


    })


    this.controlContainer.append(this.buttonPickZero, this.buttonDecrease, this.inputLength, this.buttonIncrease, this.buttonPickAll);
    this.rowsContainer.append(this.allLengthText, this.controlContainer, this.buttonAdd);
    this.parentElement.append(this.rowsContainer)


    if (localStorage.getItem(uniqueKey)){

      const newLength = JSON.parse(localStorage.getItem(uniqueKey));
      this.length = Number(newLength.amount);
      this.buttonAdd.textContent =  this.buttonAdd.getAttribute('data-cancel')
      this.buttonDecrease.disabled = true;
      this.buttonPickZero.disabled = true;

      this.buttonIncrease.disabled = true;
      this.buttonPickAll.disabled = true;

      this.inputLength.disabled = true;

      this.inputLength.value = this._currentLength;
      
    }

      
  }

  changeLength(length) {
    this.length = length;
    switch (this.length) {
      case 0:
        this.buttonDecrease.disabled = true;
        this.buttonPickZero.disabled = true;

        this.buttonIncrease.disabled = false;
        this.buttonPickAll.disabled = false;


        if(this.inputLength.hasAttribute('disabled')) {
          this.inputLength.disabled = false;
        }
        break;
      case this.allLength:
        
        this.buttonDecrease.disabled = false;
        this.buttonPickZero.disabled = false;

        this.buttonIncrease.disabled = true;
        this.buttonPickAll.disabled = true;


        if(this.inputLength.hasAttribute('disabled')) {
          this.inputLength.disabled = false;
        }
        break;
      default:
        this.buttonDecrease.disabled = false;
        this.buttonPickZero.disabled = false;

        this.buttonIncrease.disabled = false;
        this.buttonPickAll.disabled = false;


        if(this.inputLength.hasAttribute('disabled')) {
          this.inputLength.disabled = false;
        }
        break;
    }
  }


  get length() {
    return Number(this._currentLength);
  }
  set length(currentLength) {
    this._currentLength = currentLength;
    this.inputLength.value = currentLength;
  }
}