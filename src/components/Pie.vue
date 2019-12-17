<script>
import { mapActions } from 'vuex'
import Form from './dumb/Form.vue'

export default {
  name: 'Pie',

  components: {
    Form
  },

  methods: {
    ...mapActions([
      'addItem'
    ])
  }
}
</script>

<template>
  <Form @submit='addItem' />
</template>
