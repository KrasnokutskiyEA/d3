<script>
import { mapActions, mapGetters } from 'vuex'
import FormGraph from './dumb/FormGraph.vue'
import Graph from './dumb/Graph.vue'
import db from '../main.js'

let unsubscribe

export default {
  name: 'GraphChart',

  components: {
    FormGraph,
    Graph
  },

  computed: {
    ...mapGetters([
      'recievedDataGraph',
      'initGraph'
    ])
  },

  created () {
    unsubscribe = db.collection('activities').onSnapshot(res => this.getDataGraph(res))
  },

  destroyed () {
    unsubscribe()
  },

  methods: {
    ...mapActions([
      'addItemGraph',
      'getDataGraph'
    ])
  }
}
</script>

<template>
  <div class='graphview'>
    <div v-if='!initGraph'>Initializing Graph...</div>
    <FormGraph v-if='initGraph' @submit='addItemGraph' />
    <Graph v-if='initGraph' :input='recievedDataGraph' />
  </div>
</template>

<style lang='scss'>
.graphview {
  display: flex;
  justify-content: space-between;
}
</style>
