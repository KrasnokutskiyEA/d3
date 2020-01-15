import store from '../store/store'
import db from '../main.js'

/**
 * функция добавления элемента
 * @function
 * @param {number} - myParam
 */
export function addItemTree ([employeeName, reportsTo, department]) {
  const item = { name: employeeName, parent: reportsTo, department }

  db.collection('employees').add(item).then(res => {})
}

/**
 * функция получения данных для treeChart
 * @function
 * @param {number} - myParam
 */
export function getDataTree (res) {
  return res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    // forming data array
    switch (change.type) {
      case 'added':
        store.commit('ADD_TREE_DATA', doc)
        break
      case 'modified':
        store.commit('MODIFY_TREE_DATA', doc)
        break
      case 'removed':
        store.commit('REMOVE_TREE_DATA', doc)
        break
      default:
        break
    }

    !store.getters.initGraph && store.commit('SET_INIT_TREE')
  })
}
