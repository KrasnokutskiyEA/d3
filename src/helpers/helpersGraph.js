import store from '../store/store'
import db from '../main.js'

/**
 * функция добавления элемента
 * @function
 * @param {number} - myParam
 */
export function addItemGraph ([distance, activityType]) {
  console.log('---distance=', distance, 'activityType=', activityType)
  const item = {
    distance,
    activityType,
    date: new Date().toString()
  }

  db.collection('activities').add(item).then(res => {})
}

/**
 * функция получения данных для graphChart
 * @function
 * @param {number} - myParam
 */
export function getDataGraph (res) {
  return res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    // forming data array
    switch (change.type) {
      case 'added':
        store.commit('ADD_GRAPH_DATA', doc)
        break
      case 'modified':
        store.commit('MODIFY_GRAPH_DATA', doc)
        break
      case 'removed':
        store.commit('REMOVE_GRAPH_DATA', doc)
        break
      default:
        break
    }

    !store.getters.initGraph && store.commit('SET_INIT_GRAPH')
  })
}
