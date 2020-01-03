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
  return res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    // forming data array
    switch (change.type) {
      case 'added':
        store.commit('ADD_PIE_DATA', doc)
        break
      case 'modified':
        store.commit('MODIFY_PIE_DATA', doc)
        break
      case 'removed':
        store.commit('REMOVE_PIE_DATA', doc)
        break
      default:
        break
    }

    !store.getters.initPie && store.commit('SET_INIT_PIE')
  })
}

/**
 * функция удаления данных для pieChart
 * @function
 * @param {number} - myParam
 */
export function deleteSection (id) {
  return db.collection('expenses').doc(id).delete()
}
