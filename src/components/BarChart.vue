<script>
import { mapActions, mapGetters } from 'vuex'
import Bars from './dumb/Bars.vue'
import db from '../main.js'

let unsubscribe

export default {
  name: 'BarChart',

  components: {
    Bars
  },

  computed: {
    ...mapGetters([
      'recievedDataBars',
      'initBars'
    ])
  },

  created () {
    unsubscribe = db.collection('dishes').onSnapshot(res => this.getDataBars(res))
  },

  destroyed () {
    unsubscribe()
  },

  methods: {
    ...mapActions([
      'getDataBars'
    ])
  }
}
</script>

<template>
  <div>
    <div v-if='!initBars'>Initializing...</div>
    <Bars v-else :input='recievedDataBars' />
  </div>
</template>
