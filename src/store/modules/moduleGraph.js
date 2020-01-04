/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
import Vue from 'vue'
import { addItemGraph, getDataGraph } from '../../helpers/helpersGraph.js'

const moduleGraph = {
  state: {
    recievedDataGraph: [],
    initGraph: false
  },

  getters: {
    recievedDataGraph: (state) => state.recievedDataGraph,
    initGraph: (state) => state.initGraph
  },

  mutations: {
    ADD_GRAPH_DATA (state, doc) {
      !state.recievedDataGraph.some(i => i.id === doc.id) &&
      state.recievedDataGraph.push(doc)
    },

    MODIFY_GRAPH_DATA (state, doc) {
      const i = state.recievedDataGraph.findIndex(i => i.id === doc.id)
      Vue.set(state.recievedDataGraph, i, doc)
    },

    REMOVE_GRAPH_DATA (state, doc) {
      state.recievedDataGraph = state.recievedDataGraph.filter(i => i.id !== doc.id)
    },

    SET_INIT_GRAPH (state) {
      Vue.set(state, 'initGraph', true)
    }
  },

  actions: {
    addItemGraph: async ({ commit, getters }, [distance, activityType]) => {
      await addItemGraph([distance, activityType])
    },
    getDataGraph: ({ commit, getters }, res) => {
      return getDataGraph(res)
    }
  }
}

export default moduleGraph
