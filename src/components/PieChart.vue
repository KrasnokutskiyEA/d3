<script>
import { mapActions, mapGetters } from 'vuex'
import Form from './dumb/Form.vue'
import Pie from './dumb/Pie.vue'

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
    this.getDataPie()
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
  <div>
    <div v-if='!initPie'>Initializing PIE...</div>
    <div class='pieview'>
      <Form @submit='addItem' />
      <Pie :input='recievedDataPie' />
    </div>
  </div>
</template>

<style lang='scss'>
.pieview {
  display: flex;
  justify-content: space-between;
}
</style>
