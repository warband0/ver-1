import { OrderForm } from "../../assets/components/order-form.js";

const main = document.querySelector('main')
const order = new OrderForm(main);

window.addEventListener('storage', function(e) {

  const mapList = order.mapList;
  
  for (let key in this.localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue
    }
    if(mapList.has(key)) {
      const storageValue = JSON.parse(localStorage.getItem(key));
      const mapValueAmount = mapList.get(key).amount;
      if(storageValue.amount === mapValueAmount) {
        return
      }
      const orderList = mapList.get(key)
      order.fullCost = -orderList.costValue
      orderList.amountValue = storageValue.amount;
      orderList.amount = `${orderList.amountValue} м.`;
      orderList.costValue = Number(storageValue.cost).toFixed(2);
      orderList.cost = `${orderList.costValue}`;
      const newCost = (Number(storageValue.amount) * Number(storageValue.price)).toFixed(2)
      
      order.fullCost = newCost
    } else {
      
      order.addList(key)
    }

  }

  if (this.localStorage.length != mapList.size) {
    mapList.forEach( (list) => {
      if(!this.localStorage.getItem(list.uniqueKey)) {
        order.fullCost = Number(-list.costValue)
        mapList.delete(list.uniqueKey)
        list.orderList.remove()
      }
    })
    
  }


})