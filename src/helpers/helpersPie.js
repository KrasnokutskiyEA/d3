// import store from '../store/store'
import db from '../main.js'

/**
 * функция добавления элемента
 * @function
 * @param {number} - myParam
 */
export function addItem ([itemName, itemCost]) {
  console.log('----addItem fired paylaod=', [itemName, itemCost])

  const item = {
    name: itemName,
    cost: itemCost
  }

  db.collection('expenses').add(item).then(res => {})
}
