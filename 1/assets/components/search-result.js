import { newElement } from "./createElementFunction.js";

import { tableRow } from "./table-row.js"

function CablesToArray(cablesString) {
  cablesString = String(cablesString)
  let cablesArray = [];
  cablesString = cablesString.split('+').forEach(value => {
    if(value.indexOf('*') === 1) {
      value = value.split('*');
      for (let i = 0; i < value[0]; i++){
        cablesArray.push(Number(value[1]));
      }
    } else {
      cablesArray.push(Number(value));
    }
  });
  return cablesArray.sort((a, b) => b - a)
}

export class SearchResult {

  constructor(catalog, parentElement) {
    this.setList = new Set();
    this.parentElement = parentElement;
    this.searchResultContainer = newElement('div', ['search-results']);
    this.titlesContainer = newElement('div', ['search-results__title-container']);
    this.articleTitle = newElement('p', ['search-results__title'], 'Артикул');
    this.typeTitle = newElement('p', ['search-results__title'], 'Тип');
    this.markTitle = newElement('p', ['search-results__title'], 'Марка');
    this.sizeTitle = newElement('p', ['search-results__title'], 'Маркоразмер');
    this.screenTitle = newElement('p', ['search-results__title'], 'Экран');
    this.conditionTitle = newElement('p', ['search-results__title'], 'Условия эксплуатации; температура/подвижно');
    this.priceTitle = newElement('p', ['search-results__title'], 'Цена, руб/м');
    this.AllAmountTitle = newElement('p', ['search-results__title'],'Кол-во, склад СПБ');
    this.cablesTitle = newElement('p', ['search-results__title'], 'Отрезки');
    
    this.resultsContainer = newElement('div', ['search-results__results-container']);


    for (let i = 0; i < 50; i++) {
      new tableRow(
        0,
        this.resultsContainer, 
        this.setList, 
        catalog[i]["Артикул"],
        catalog[i]["Тип"],
        catalog[i]["Марка"],
        catalog[i]["Маркоразмер"],
        catalog[i]["Наружн. Ø mm"],
        catalog[i]["Экран"],
        catalog[i]["Напряжение, В"],
        catalog[i]["Условия эксплуатации; температура/подвижно"],
        catalog[i]["Особенности"],
        catalog[i]["Кол-во пар, жил, троек"],
        catalog[i]["Тип скрутки (пары (2), тройки (3))"],
        catalog[i]["Сечение или диаметр, мм/мм2/мкм/AWG"],
        catalog[i]["Общее кол-во жил"],
        catalog[i][" LAN категория или волновое сопр., Ом"],
        catalog[i]["Материал изоляции"],
        catalog[i]["Материал оболочки"],
        catalog[i]["Температура/стационарно"],
        catalog[i]["Цвет"],
        catalog[i]["Ед. изм."],
        catalog[i]["Цена, Руб/метр с НДС"],
        catalog[i]["Кол-во, склад СПБ"],
        CablesToArray(String(catalog[i]["Отрезки"]))
      )
    }

    
    this.titlesContainer.append(this.articleTitle, this.typeTitle, this.markTitle, this.sizeTitle, this.screenTitle, this.conditionTitle, this.priceTitle, this.AllAmountTitle, this.cablesTitle);
    this.searchResultContainer.append(this.titlesContainer, this.resultsContainer);
    
    parentElement.append(this.searchResultContainer)

  }

    refreshSearch(newCatalog) {
      this.setList = new Set();
      this.resultsContainer.innerHTML = '';
      
      for (let position of newCatalog) {

        new tableRow(
          Number(document.querySelector('input[name="Длина"]').value),
          this.resultsContainer, 
          this.setList, 
          position["Артикул"],
          position["Тип"],
          position["Марка"],
          position["Маркоразмер"],
          position["Наружн. Ø mm"],
          position["Экран"],
          position["Напряжение, В"],
          position["Условия эксплуатации; температура/подвижно"],
          position["Особенности"],
          position["Кол-во пар, жил, троек"],
          position["Тип скрутки (пары (2), тройки (3))"],
          position["Сечение или диаметр, мм/мм2/мкм/AWG"],
          position["Общее кол-во жил"],
          position[" LAN категория или волновое сопр., Ом"],
          position["Материал изоляции"],
          position["Материал оболочки"],
          position["Температура/стационарно"],
          position["Цвет"],
          position["Ед. изм."],
          position["Цена, Руб/метр с НДС"],
          position["Кол-во, склад СПБ"],
          CablesToArray(String(position["Отрезки"]))

      )}
      

      const allRows = this.resultsContainer.querySelectorAll("h3")

      let disabledRows = [...allRows]
      disabledRows = disabledRows.filter( row => row.classList.contains('disable'))

      if (disabledRows.length > 0) {
        const showAll = newElement('div', ['search-results__show-all'], 'Показать все');


        showAll.addEventListener('click', () => {
          disabledRows.forEach(row => row.classList.remove('disable'));
          showAll.classList.add('disable')
        })
        this.resultsContainer.append(showAll);
      }

      
      
      this.searchResultContainer.append(this.resultsContainer);
    }
}

