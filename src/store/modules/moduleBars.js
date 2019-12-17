/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
import Vue from 'vue'
import { getData } from '../../helpers/helpersBars.js'

const moduleBars = {
  state: {
    recievedData: [],
    init: false
  },

  getters: {
    recievedData: (state) => state.recievedData,
    init: (state) => state.init
  },

  mutations: {
    SET_RECIEVED_DATA (state, data) {
      Vue.set(state, 'recievedData', data)
    },
    SET_INIT (state) {
      Vue.set(state, 'init', true)
    }
  },

  actions: {
    getData: async ({ commit, getters }) => {
      await getData()
    },
    setInit: ({ commit, getters }) => {
      commit('SET_INIT')
    }
  }
}

export default moduleBars
