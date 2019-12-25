import store from '../store/store'
import db from '../main.js'

/**
 * функция добавления элемента
 * @function
 * @param {number} - myParam
 */
export function addItem ([itemName, itemCost]) {
  const item = {
    name: itemName,
    cost: Number(itemCost)
  }

  db.collection('expenses').add(item).then(res => {})
}

/**
 * функция получения данных для pieChart
 * @function
 * @param {number} - myParam
 */
export function getDataPie (res) {
  // get data from firestore, onSnapshot - changes listener
  let fdata = []

  console.log('-------on snapshot--------------')
  return res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    // forming data array
    switch (change.type) {
      case 'added':
        fdata.push(doc)
        break
      case 'modified':
        const i = fdata.findIndex(i => i.id === doc.id)
        fdata[i] = doc
        break
      case 'removed':
        fdata = fdata.filter(i => i.id !== doc.id)
        break
      default:
        break
    }
    store.commit('SET_RECIEVED_DATA_PIE', fdata)
    !store.getters.initPie && store.commit('SET_INIT_PIE')
  })
}
