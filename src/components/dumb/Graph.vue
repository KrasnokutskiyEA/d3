<script>
// import * as d3 from 'd3'

export default {
  name: 'Graph',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
    //  dims: { height: 300, width: 300, radius: 150 }, // размеры
    //  current: []
    }
  },

  computed: {

  },

  watch: {
    input (newVal, oldVal) {
    //  return this.updateGraph(newVal)
    }
  },

  mounted () {
  //  this.drawGraph()
  //  this.updateGraph(this.input)
  },

  methods: {

  }
}
</script>

<template>
  <!-- <div class='canvasGraph' /> -->
  <div>this is graph...</div>
</template>
