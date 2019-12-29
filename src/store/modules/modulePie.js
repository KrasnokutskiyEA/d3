/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
import Vue from 'vue'
import { addItem, getDataPie } from '../../helpers/helpersPie.js'

const modulePie = {
  state: {
    recievedDataPie: [],
    initPie: false
  },

  getters: {
    recievedDataPie: (state) => state.recievedDataPie,
    initPie: (state) => state.initPie
  },

  mutations: {
    ADD_PIE_DATA (state, doc) {
      !state.recievedDataPie.some(i => i.id === doc.id) &&
      state.recievedDataPie.push(doc)
    },

    MODIFY_PIE_DATA (state, doc) {
      const i = state.recievedDataPie.findIndex(i => i.id === doc.id)
      Vue.set(state.recievedDataPie, i, doc)
    },

    REMOVE_PIE_DATA (state, doc) {
      state.recievedDataPie = state.recievedDataPie.filter(i => i.id !== doc.id)
    },

    SET_INIT_PIE (state) {
      Vue.set(state, 'initPie', true)
    }
  },

  actions: {
    addItem: async ({ commit, getters }, [itemName, itemCost]) => {
      await addItem([itemName, itemCost])
    },
    getDataPie: ({ commit, getters }, res) => {
      return getDataPie(res)
    }
  }
}

export default modulePie
