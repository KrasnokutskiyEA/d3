/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
import Vue from 'vue'
import { getDataBars } from '../../helpers/helpersBars.js'

const moduleBars = {
  state: {
    recievedDataBars: [],
    initBars: false
  },

  getters: {
    recievedDataBars: (state) => state.recievedDataBars,
    initBars: (state) => state.initBars
  },

  mutations: {
    ADD_BARS_DATA (state, doc) {
      !state.recievedDataBars.some(i => i.id === doc.id) &&
      state.recievedDataBars.push(doc)
    },

    MODIFY_BARS_DATA (state, doc) {
      const i = state.recievedDataBars.findIndex(i => i.id === doc.id)
      Vue.set(state.recievedDataBars, i, doc)
    },

    REMOVE_BARS_DATA (state, doc) {
      state.recievedDataBars = state.recievedDataBars.filter(i => i.id !== doc.id)
    },

    SET_INIT_BARS (state) {
      Vue.set(state, 'initBars', true)
    }
  },

  actions: {
    getDataBars: async ({ commit, getters }, res) => {
      await getDataBars(res)
    }
  }
}

export default moduleBars
