import store from '../store/store'
import db from '../main.js'

/**
 * функция получения данных
 * @function
 * @param {number} - myParam
 */
export function getData () {
  // get data from firestore, onSnapshot - changes listener
  let fdata = []
  return db.collection('dishes').onSnapshot(res => {
    res.docChanges().forEach(change => {
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
    })

    store.commit('SET_RECIEVED_DATA', fdata)
    !store.getters.init && store.commit('SET_INIT')
  })
}
