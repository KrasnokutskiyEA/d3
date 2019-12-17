import Vue from 'vue'
import Vuex from 'vuex'
import moduleApp from './modules/moduleApp'
import moduleBars from './modules/moduleBars'
import modulePie from './modules/modulePie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app: moduleApp,
    bars: moduleBars,
    pie: modulePie
  }
})
