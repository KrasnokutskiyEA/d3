/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
import { addItem } from '../../helpers/helpersPie.js'

const modulePie = {
  state: {
    //
  },

  getters: {
  //
  },

  mutations: {
  //
  },

  actions: {
    addItem: async ({ commit, getters }, [itemName, itemCost]) => {
      await addItem([itemName, itemCost])
    }
  }
}

export default modulePie
