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

  data () {
    return {
      activity: 'Cycling'
    }
  },

  computed: {
    ...mapGetters([
      'recievedDataGraph',
      'initGraph'
    ]),

    recievedDataGraphFiltered () {
      return this.recievedDataGraph
        .filter(o => o.activityType === this.activity)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    }
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
    ]),

    activitySelected (activity) {
      return this.$set(this, 'activity', activity)
    }
  }
}
</script>

<template>
  <div class='graphview'>
    <div v-if='!initGraph'>Initializing Graph...</div>
    <FormGraph
      v-if='initGraph'
      @activitySelected='activitySelected'
      @submit='addItemGraph'
    />
    <Graph v-if='initGraph' :input='recievedDataGraphFiltered' />
  </div>
</template>

<style lang='scss'>
.graphview {
  display: flex;
  justify-content: space-between;
}
</style>
