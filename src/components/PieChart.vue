<script>
import { mapActions, mapGetters } from 'vuex'
import Form from './dumb/Form.vue'
import Pie from './dumb/Pie.vue'
import db from '../main.js'

let unsubscribe

export default {
  name: 'PieChart',

  components: {
    Form,
    Pie
  },

  computed: {
    ...mapGetters([
      'recievedDataPie',
      'initPie'
    ])
  },

  created () {
    unsubscribe = db.collection('expenses').onSnapshot(res => this.getDataPie(res))
  },

  destroyed () {
    unsubscribe()
  },

  methods: {
    ...mapActions([
      'addItem',
      'getDataPie'
    ])
  }
}
</script>

<template>
  <div class='pieview'>
    <div v-if='!initPie'>Initializing PIE...</div>
    <Form v-if='initPie' @submit='addItem' />
    <Pie v-if='initPie' :input='recievedDataPie' />
  </div>
</template>

<style lang='scss'>
.pieview {
  display: flex;
  justify-content: space-between;
}
</style>
