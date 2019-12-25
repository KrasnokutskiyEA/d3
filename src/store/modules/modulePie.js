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
    SET_RECIEVED_DATA_PIE (state, data) {
      Vue.set(state, 'recievedDataPie', data)
      // state.recievedDataPie = [ ...data ]
    },
    SET_INIT_PIE (state) {
      Vue.set(state, 'initPie', true)
    },

    RESET_INIT_PIE (state) {
      Vue.set(state, 'initPie', false)
      state.recievedDataPie = []
    }
  },

  actions: {
    addItem: async ({ commit, getters }, [itemName, itemCost]) => {
      await addItem([itemName, itemCost])
    },
    getDataPie: ({ commit, getters }, res) => {
      return getDataPie(res)
    },
    setInitPie: ({ commit, getters }) => {
      commit('SET_INIT_PIE')
    },
    resetInitPie: ({ commit, getters }) => {
      commit('RESET_INIT_PIE')
    }
  }
}

export default modulePie
