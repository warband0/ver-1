
import { SearchResult } from "../../assets/components/full-search-result.js";
import { newElement } from "../../assets/components/createElementFunction.js"
import { LengthInput } from "../../assets/components/input-length.js";
import { criterions } from "../../assets/criterions.js";

const header = document.querySelector('header')
const response = await fetch('../../assets/json.json');
const data = await response.json();
console.log(data);
const fastSearchCriterions = ['Артикул', 'Тип', 'Марка', 'Маркоразмер', 'Наружн. Ø mm', 'Экран', 'Напряжение, В', 'Условия эксплуатации; температура/подвижно', 'Особенности', 'Кол-во пар, жил, троек', 'Сечение или диаметр, мм/мм2/мкм/AWG', 'Общее кол-во жил', 'Материал изоляции', 'Материал оболочки', 'Температура/стационарно', 'Цвет', 'Ед. изм.', 'Цена, Руб/метр с НДС', 'Отрезки', 'Кол-во, склад СПБ']
const main = document.querySelector('main')

const allCriterions = Object.keys(data[0])
const allCriterions2 = {};
console.log(allCriterions);

allCriterions.forEach (criterion => allCriterions2[`${criterion}`] = new Set())





// for (let value of data) {
//   for (let key in value) {
//     if (value[key] && allCriterions2[key]) {
//       allCriterions2[key].add(value[key])
//     }
    
//   }
/*
  class textInput {
  constructor(parentElement, ) {
    
    this.criterion = 'Марка'
    this.searchConditions = {
      "Марка": new Set(),
    };
    this.criterions = criterions[this.criterion]
    console.log(this.criterions);

    this.fieldSet = newElement('fieldset', ['criterion']);

    this.criterions.forEach(value => {
      const container = newElement('div', ['criterion__input-container'], '',{"data-criterion": value});
      const input = newElement('input', ['criterion__input'], '', {type: 'checkbox', name: value});
      const label = newElement('label', ['criterion__label'], `${value}`, {for: `${value}`});

      container.addEventListener('click', () => {
        if (input.hasAttribute('checked')) {
          input.removeAttribute('checked')
          if (this._SearchConditions[this.criterion]) {
            this._SearchConditions[this.criterion].delete(value)
            ParentClass.search()
          }
        } else {
          input.setAttribute('checked', true)
          if (this._SearchConditions[this.criterion]) {
            this._SearchConditions[this.criterion].add(value)
            ParentClass.search()
          }
        }

      })

      container.append(input, label)
      this.fieldSet.append(container)
    })
    parentElement.append(this.fieldSet)
  } 
}
const imp = new textInput(header)
*/
window.addEventListener('storage', function(e) {
  
  
  const setList = searhRes.setList;
  setList.forEach( input => {
    if(this.localStorage.getItem(input.uniqueKey)) {
      const storageValue = JSON.parse(localStorage.getItem(input.uniqueKey));
      if(input.length === storageValue.amount) {
        return 
      } else {
        input.changeLength(storageValue.amount)
      }

    } else {
      input.changeLength(0)
    }
  })
  
})

class FilterInput {
  _searchConditions
  constructor(ParentClass, parentElement, searchConditions, criterion, criterions) {
    this.searchConditions = searchConditions;
    this.criterion = criterion;
    this.containerSet = new Array();
    this.inputsSet = new Array();
    this.labelSet = new Array();
    this.fieldSet = newElement('fieldset', ['criterion']);
    this.legend = newElement('legend', ['criterion__legend'], `${this.criterion}`);
    this.fieldSet.append(this.legend)
    for (let value of criterions) {

      const container = newElement('div', ['criterion__input-container'], '',{"data-criterion": value});
      const input = newElement('input', ['criterion__input'], '', {type: 'checkbox', name: value});
      const label = newElement('label', ['criterion__label'], `${value}`, {for: `${value}`});

      container.addEventListener('click', () => {
        if (input.hasAttribute('checked')) {
          input.removeAttribute('checked')
          if (this._SearchConditions[this.criterion]) {
            this._SearchConditions[this.criterion].delete(value)
            ParentClass.search()
          }
        } else {
          input.setAttribute('checked', true)
          if (this._SearchConditions[this.criterion]) {
            this._SearchConditions[this.criterion].add(value)
            ParentClass.search()
          }
        }

      })

      container.append(input, label)
      this.fieldSet.append(container)
      this.containerSet.push(container)
      this.labelSet.push(container)
      this.inputsSet.push(container)
    }
    parentElement.append(this.fieldSet)
  }


  get searchConditions() {
    return this._searchConditions;
  }
  set searchConditions(newSearchConditions) {
    this._SearchConditions = newSearchConditions;

  }
}

class ClientLengthInput {
  constructor (parentElement) {
    this.inputLengthContainer = newElement('div', ['criterion__input-container'], '',{"data-criterion": "Длина"});
    this.labelLength = newElement('label', ['criterion__label'], "Длина", {for: "Длина"});
    this.inputLength = newElement('input', ['criterion__input'], "Длина", {type: 'number', name: "Длина", value: 0});
    this.inputLengthContainer.append(this.labelLength, this.inputLength)
    parentElement.append(this.inputLengthContainer)
  }
}



class Filter {
  _searchConditions = {
    "Тип": new Set(),
    "Марка": new Set(),
    "Маркоразмер": new Set(),
    "Экран": new Set(),
    "Условия эксплуатации; температура/подвижно": new Set()
  }
  constructor(data, SearchResultsContainer, parentElement, allCriterions, fastSearchCriterions) {
    this.selectedLength = 0;
    this.SearchResultsContainer = SearchResultsContainer
    this.parentElement = parentElement
    




    this.newData = new Set();
    this.allCriterions = allCriterions;
    this.fieldSets = new Set();

    this.searchConditions = this._searchConditions;
    this.filterContainer = newElement('div', ['filter'])
    this.inputLengthContainer = new ClientLengthInput(this.filterContainer);
    this.searchButton = newElement('button', [], 'SEARCH')
    this.searchButton.addEventListener('click', e => {
      this.search()
      
    })
    this.filterContainer.append(this.searchButton)
    parentElement.append(this.filterContainer)



    for (let criterion in this.allCriterions) {
      
      if (fastSearchCriterions.indexOf(criterion) != -1) {
        const fieldSet = new FilterInput(this, this.filterContainer, this.searchConditions, criterion, this.allCriterions[criterion]);
        if (fieldSet.criterion != "Тип") {
          fieldSet.inputsSet.forEach( value => value.classList.add('disable'))
        }

        
        this.fieldSets.add(fieldSet)
      }
      


      
    }
    
  }
  search() {
    let setSizes = 0
    for (let condition in this.searchConditions) {
      setSizes += this.searchConditions[condition].size
      
    }
    if (setSizes === 0) {
      this.SearchResultsContainer.refreshSearch(data)
      this.fieldSets.forEach (fieldSet => {
        if (fieldSet.criterion != "Тип") {
          fieldSet.inputsSet.forEach( value => value.classList.add('disable'))
        }
      })

      return
      
    }
    
    this.fieldSets.forEach (value => {

      value.containerSet.forEach( container => {
        container.classList.remove('disable')
      })
    })
    this.newData = [];
    this.searchEmpty = false;
    this.actualCriterions = {
      "Тип": new Set(),
      "Марка": new Set(),
      "Маркоразмер": new Set(),
      "Экран": new Set(),
      "Условия эксплуатации; температура/подвижно": new Set()
    }
    for (let conditions in this.searchConditions) {
      if (this.searchConditions[conditions].size > 0) {
        const array = new Array(...this.searchConditions[conditions])
        
        
        if (this.newData.length === 0) {
          this.oldData = data;
        } else {
          this.oldData = this.newData;
        }
        ////

        this.newData = this.oldData.filter( value => {
          
          if (array.indexOf(value[conditions]) != -1) {

            return value;
          } 
          
        })
          if (this.newData.length === 0) {
            this.searchEmpty = true;
            
          }
          ///////
      } 
    }
    
      if (this.searchEmpty) {
        this.fieldSets.forEach (value => {

          value.containerSet.forEach( container => {
            container.classList.remove('disable')
          })
        })
        
        this.newData = [];
        this.SearchResultsContainer.refreshSearch(this.newData)
        const tryAnotherCriterions = newElement('div', [], "Ничего не найдено, попробуйте изменить параметры или ");
        const catalogLink = newElement('a', [], 'расширенный поиск')
        tryAnotherCriterions.append(catalogLink)
        this.SearchResultsContainer.append(tryAnotherCriterions)
        return
      }

      this.newData.forEach( value => {
        for (let valueCondition in value) {
          if (Object.hasOwn(this.actualCriterions, valueCondition)) {
            this.actualCriterions[valueCondition].add(value[valueCondition])
          }
        }
      })
      
      this.fieldSets.forEach (value => {

        value.containerSet.forEach( container => {
          
          if(this.actualCriterions[value.criterion].has(container.getAttribute('data-criterion'))) {

            
          } else if (value.criterion != "Тип") {
            container.classList.add('disable')
          }
        })
      })
      this.SearchResultsContainer.refreshSearch(this.newData)
      
  }
    

  get searchConditions() {
    return this._searchConditions;
  }
  set searchConditions(newSearchConditions) {
    this._searchConditions = newSearchConditions
  }
}

const searhRes = new SearchResult(data, main, 0)
// const filetrrr = new Filter(data, searhRes, main, criterions, fastSearchCriterions)


