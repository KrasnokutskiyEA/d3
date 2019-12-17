<script>
export default {
  name: 'Form',

  data () {
    return {
      itemName: '',
      itemCost: null,
      rules: {
        required: value => !!value || 'Required.',
        positive: value => value > 0 || 'value should be > 0'
      }
    }
  },

  methods: {
    submit () {
      this.$emit('submit', [this.itemName, this.itemCost])
    },

    clear () {
      this.$set(this, 'itemName', '')
      this.$set(this, 'itemCost', null)
    }
  }
}
</script>

<template>
  <v-card :max-width='500' class='ml-10 mt-10 pa-10'>
    <v-text-field
      v-model='itemName'
      label='Item name'
      required
      type='text'
      :rules='[rules.required]'
    />
    <v-text-field
      v-model='itemCost'
      label='Item cost'
      required
      type='number'
      :rules='[rules.required, rules.positive]'
    />

    <v-btn class='mr-4 mt-4' @click='submit'>submit</v-btn>
    <v-btn class=' mt-4' @click='clear'>clear</v-btn>
  </v-card>
</template>
