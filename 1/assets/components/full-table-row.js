import { newElement } from "./createElementFunction.js";
import { LengthInput } from "./input-length.js";

export class tableRow {
  constructor(selectedLength, parentElement, setList, article, type, mark, size, diameter,screen, voltage, condition, peculiarities, wirePairs, 
    twistType, section, commonWirePairs, lan, insulation, shell, temperature, color, unit, price, AllAmount, cables) {
    this.selectedLength = selectedLength;
    this.parentElement = parentElement;
    this.setList = setList;
    this.article = article;
    this.type = type;
    this.mark = mark;
    this.size = size;
    this.diameter = diameter;
    this.screen = screen;
    this.voltage = voltage;
    this.condition = condition;
    this.peculiarities = peculiarities;
    this.wirePairs = wirePairs;
    this.twistType = twistType;
    this.section = section;
    this.commonWirePairs = commonWirePairs;
    this.lan = lan;
    this.insulation = insulation;
    this.shell = shell;
    this.temperature = temperature;
    this.color = color;
    this.unit = unit;
    this.price = price;
    this.cables = cables;
    this.AllAmount = AllAmount;
    
  
      
    this.resultRow = newElement('h3', ['search-results__row']);
    this.articleValue = newElement('p', ['search-results__result'], `${this.article}`);
    this.typeValue = newElement('p', ['search-results__result'], `${this.type}`);
    this.markValue = newElement('p', ['search-results__result'], `${this.mark}`);
    this.sizeValue = newElement('p', ['search-results__result'], `${this.size}`);
    this.diameterValue = newElement('p', ['search-results__result'], `${this.diameter}`);
    this.screenValue = newElement('p', ['search-results__result'], `${this.screen}`);
    this.voltageValue = newElement('p', ['search-results__result'], `${this.voltage}`);
    this.conditionValue = newElement('p', ['search-results__result'], `${this.condition}`);
    this.peculiaritiesValue = newElement('p', ['search-results__result'], `${this.peculiarities}`);
    this.wirePairsValue = newElement('p', ['search-results__result'], `${this.wirePairs}`);
    this.sectionValue = newElement('p', ['search-results__result'], `${this.section}`);
    this.commonWirePairsValue = newElement('p', ['search-results__result'], `${this.commonWirePairs}`);
    this.insulationValue = newElement('p', ['search-results__result'], `${this.insulation}`);
    this.shellValue = newElement('p', ['search-results__result'], `${this.shell}`);
    this.temperatureValue = newElement('p', ['search-results__result'], `${this.temperature}`);
    this.colorValue = newElement('p', ['search-results__result'], `${this.color}`);
    this.priceValue = newElement('p', ['search-results__result'], `${this.price}`);
    this.AllAmount = newElement('p', ['search-results__result'], `${this.AllAmount + this.unit}`);
  
    this.showCablesButtons = newElement('button', ['search-results__show-cables'], 'Подобрать')
    this.inputContainer = newElement('div', ['search-results__input-container']);

    this.resultRow.append(
      this.articleValue, 
      this.typeValue,
      this.markValue,
      this.sizeValue,
      this.diameterValue,
      this.screenValue,
      this.voltageValue,
      this.conditionValue,
      this.peculiaritiesValue,
      this.wirePairsValue,
      this.sectionValue,
      this.commonWirePairsValue,
      this.insulationValue,
      this.shellValue,
      this.temperatureValue,
      this.colorValue,
      this.priceValue,
      this.AllAmount,
      this.showCablesButtons,
      this.inputContainer
    );
    
    this.cables.forEach((length, index) => {
      const input = new LengthInput(this.inputContainer, length, this.article, this.mark, this.price, `${this.article}.${index}`);
      setList.add(input)
    });
    
    if (!(cables.find(value => value > this.selectedLength))) {
      this.resultRow.classList.add('disable')
      
    }



    parentElement.append(this.resultRow);

    this.showCablesButtons.addEventListener('click', () => {
      if(this.inputContainer.classList.contains('search-results__input-container_active')) {

        this.inputContainer.classList.remove('search-results__input-container_active')

      } else {

        const activeCableRow = document.querySelectorAll('.search-results__input-container_active')
        activeCableRow.forEach(cableRow => {
          cableRow.classList.remove('search-results__input-container_active');
        });
        this.inputContainer.classList.add('search-results__input-container_active')

      }
    })
  }
}