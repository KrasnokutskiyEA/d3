/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
import Vue from 'vue'
import { addItemTree, getDataTree } from '../../helpers/helpersTree.js'

const moduleTree = {
  state: {
    recievedDataTree: [],
    initTree: false
  },

  getters: {
    recievedDataTree: (state) => state.recievedDataTree,
    initTree: (state) => state.initTree
  },

  mutations: {
    ADD_TREE_DATA (state, doc) {
      !state.recievedDataTree.some(i => i.id === doc.id) &&
      state.recievedDataTree.push(doc)
    },

    MODIFY_TREE_DATA (state, doc) {
      const i = state.recievedDataTree.findIndex(i => i.id === doc.id)
      Vue.set(state.recievedDataTree, i, doc)
    },

    REMOVE_TREE_DATA (state, doc) {
      state.recievedDataTree = state.recievedDataTree.filter(i => i.id !== doc.id)
    },

    SET_INIT_TREE (state) {
      Vue.set(state, 'initTree', true)
    }
  },

  actions: {
    addItemTree: async ({ commit, getters }, [employeeName, reportsTo, department]) => {
      await addItemTree([employeeName, reportsTo, department])
    },
    getDataTree: ({ commit, getters }, res) => {
      return getDataTree(res)
    }
  }
}

export default moduleTree
