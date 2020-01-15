<script>
// import * as d3 from 'd3'

export default {
  name: 'Tree',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      // margin: { top: 40, right: 20, bottom: 50, left: 100 }, // margins
      // current: []
    }
  },

  computed: {
    // graphWidth () {
    //   return 560 - this.margin.left - this.margin.right
    // },

    // graphHeight () {
    //   return 400 - this.margin.top - this.margin.bottom
    // }
  },

  watch: {
    input (newVal, oldVal) {
      return this.updateGraph(newVal)
    }
  },

  mounted () {
    this.drawGraph()
    this.updateGraph(this.input)
  },

  methods: {
    drawGraph () {
      // const svg = d3.select('.canvasGraph').append('svg')
      //   .attr('width', this.graphWidth + this.margin.left + this.margin.right)
      //   .attr('height', this.graphHeight + this.margin.top + this.margin.bottom)

      // const graph = svg.append('g')
      //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      //   .attr('width', this.graphWidth)
      //   .attr('height', this.graphHeight)
      //   .attr('class', 'graphGraph')
    },

    updateGraph (data) {
      // 1 - updating scale domains
      // this.x.domain(d3.extent(this.input, d => new Date(d.date))) // что подаем на вход
      // this.y.domain([0, d3.max(this.input, d => d.distance)]) // что подаем на вход

      // update path data (lines between points)
      // d3.select('.graphLine').data([this.input])
      //   .attr('fill', 'none')
      //   .attr('stroke', '#00bfa5')
      //   .attr('stroke-width', 2)
      //   .attr('d', this.line)

      // 2- Join data to DOM elements - (create circles for objects)
      // const circles = d3.select('.graphGraph').selectAll('circle').data(this.input)

      // 3 - remove exit selection
      // circles.exit().remove()

      // 4 - update current shapes in DOM
      // circles
      //   .attr('cx', d => this.x(new Date(d.date)))
      //   .attr('cy', d => this.y(d.distance))

      // 5 - append enter selection to the DOM - (add new points-circles)
      // circles.enter().append('circle')
      //   .attr('r', 4)
      //   .attr('cx', d => this.x(new Date(d.date)))
      //   .attr('cy', d => this.y(d.distance))
      //   .attr('fill', 'grey')

      // add events
      // d3.select('.graphGraph').selectAll('circle')
      //   .on('mouseover', (d, i, n) => this.handleMouseOver(d, i, n))
      //   .on('mouseleave', (d, i, n) => this.handleMouseOut(d, i, n))
    }
  }
}
</script>

<template>
  <div class='canvasTree'>Tree...</div>
</template>

<style lang='scss'>

</style>
