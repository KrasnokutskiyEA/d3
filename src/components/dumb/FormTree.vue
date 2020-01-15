<script>
export default {
  name: 'FormTree',

  data () {
    return {
      employeeName: '',
      reportsTo: '',
      department: '',

      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    submit () {
      this.$emit('submit', [this.employeeName, this.reportsTo, this.department])
    },

    clear () {
      this.$set(this, 'employeeName', '')
      this.$set(this, 'reportsTo', '')
      this.$set(this, 'department', '')
    }
  }
}
</script>

<template>
  <v-card :width='400' :height='350' class='ml-10 mt-10 pa-10'>
    <v-text-field
      v-model='employeeName'
      label='Employee name'
      required
      type='text'
      :rules='[rules.required]'
    />

    <v-text-field
      v-model='reportsTo'
      label='Reports to'
      required
      type='text'
      :rules='[rules.required]'
    />

    <v-text-field
      v-model='department'
      label='Department'
      required
      type='text'
      :rules='[rules.required]'
    />

    <v-btn class='mr-4 mt-4' @click='submit'>submit</v-btn>
    <v-btn class=' mt-4' @click='clear'>clear</v-btn>
  </v-card>
</template>
