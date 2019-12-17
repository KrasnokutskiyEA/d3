<script>
import { mapActions, mapGetters } from 'vuex'
import Bars from './dumb/Bars.vue'

export default {
  name: 'Chart',

  components: {
    Bars
  },

  computed: {
    ...mapGetters([
      'recievedData',
      'init'
    ])
  },

  created () {
    this.getData()
  },

  methods: {
    ...mapActions([
      'getData'
    ])
  }
}
</script>

<template>
  <div>
    <div v-if='!init'>Initializing...</div>
    <Bars v-else :input='recievedData' />
  </div>
</template>
