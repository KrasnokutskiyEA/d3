<script>
export default {
  name: 'FormGraph',

  data () {
    return {
      activityType: 'Cycling',
      distance: ''
    }
  },

  methods: {
    submit () {
      this.$emit('submit', [Number(this.distance), this.activityType])
      this.$set(this, 'distance', '')
    },

    cycling () {
      return this.$set(this, 'activityType', 'Cycling')
    },

    running () {
      return this.$set(this, 'activityType', 'Running')
    },

    swimming () {
      return this.$set(this, 'activityType', 'Swimming')
    },

    walking () {
      return this.$set(this, 'activityType', 'Walking')
    }
  }
}
</script>

<template>
  <v-card :width='400' :height='450' class='ml-10 mt-10 pa-10'>
    <v-layout column wrap class='mb-8'>
      <v-btn
        class='mr-4 mt-4'
        :color='activityType === "Cycling" ? "success" : "primary"'
        @click='cycling'
      >
        Cycling
      </v-btn>

      <v-btn
        class='mr-4 mt-4'
        :color='activityType === "Running" ? "success" : "primary"'
        @click='running'
      >
        Running
      </v-btn>

      <v-btn
        class='mr-4 mt-4'
        :color='activityType === "Swimming" ? "success" : "primary"'
        @click='swimming'
      >
        Swimming
      </v-btn>

      <v-btn
        class='mr-4 mt-4'
        :color='activityType === "Walking" ? "success" : "primary"'
        @click='walking'
      >
        Walking
      </v-btn>
    </v-layout>

    <div>How much <span style='color:#5AB55E'>{{ activityType }}</span> have you done today?</div>

    <v-text-field
      v-model='distance'
      label='distance in m'
      required
      type='number'
    />

    <v-btn
      class='mr-4 mt-4'
      color='success'
      :disabled='distance === ""'
      @click='submit'
    >
      submit
    </v-btn>
  </v-card>
</template>
