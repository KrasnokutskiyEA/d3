import store from '../store/store'

/**
 * функция получения данных
 * @function
 * @param {number} - myParam
 */
export function getDataBars (res) {
  return res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }

    // forming data array
    switch (change.type) {
      case 'added':
        store.commit('ADD_BARS_DATA', doc)
        break
      case 'modified':
        store.commit('MODIFY_BARS_DATA', doc)
        break
      case 'removed':
        store.commit('REMOVE_BARS_DATA', doc)
        break
      default:
        break
    }

    !store.getters.init && store.commit('SET_INIT_BARS')
  })
}
