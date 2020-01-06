<script>
import * as d3 from 'd3'

export default {
  name: 'Graph',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      margin: { top: 40, right: 20, bottom: 50, left: 100 }, // margins
      current: []
    }
  },

  computed: {
    graphWidth () {
      return 560 - this.margin.left - this.margin.right
    },

    graphHeight () {
      return 400 - this.margin.top - this.margin.bottom
    },

    // шкала по оси - х
    x () {
      return d3.scaleTime().range([0, this.graphWidth])
    },

    // ось - х
    xAxis () {
      return d3.axisBottom(this.x)
        .ticks(4)
        .tickFormat(d3.timeFormat('%b %d')) // month + date
    },

    // шкала по оси - у
    y () {
      return d3.scaleLinear().range([this.graphHeight, 0]) // выход
    },

    // ось - y
    yAxis () {
      return d3.axisLeft(this.y)
        .ticks(4)
        .tickFormat(d => d + 'm') // m - meters
    }
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
      const svg = d3.select('.canvasGraph').append('svg')
        .attr('width', this.graphWidth + this.margin.left + this.margin.right)
        .attr('height', this.graphHeight + this.margin.top + this.margin.bottom)

      const graph = svg.append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .attr('width', this.graphWidth)
        .attr('height', this.graphHeight)
        .attr('class', 'graphGraph')

      // draw xAxisGroup
      graph.append('g')
        .attr('class', 'xAxisGroup')
        .attr('transform', `translate(0, ${this.graphHeight})`)

      // draw yAxisGroup
      graph.append('g')
        .attr('class', 'yAxisGroup')
    },

    updateGraph (data) {
      // 1 - updating scale domains
      this.x.domain(d3.extent(this.input, d => new Date(d.date))) // что подаем на вход
      this.y.domain([0, d3.max(this.input, d => d.distance)]) // что подаем на вход

      // 2- Join data to DOM elements - (create circles for objects)
      const circles = d3.select('.graphGraph').selectAll('circle').data(this.input)

      // 3 - remove exit selection
      circles.exit().remove()

      // 4 - update current shapes in DOM
      circles
        .attr('cx', d => this.x(new Date(d.date)))
        .attr('cy', d => this.y(d.distance))

      // 5 - append enter selection to the DOM - (add new points-circles)
      circles.enter().append('circle')
        .attr('r', 4)
        .attr('cx', d => this.x(new Date(d.date)))
        .attr('cy', d => this.y(d.distance))
        .attr('fill', 'grey')

      // 6 - call axes
      d3.select('.xAxisGroup').call(this.xAxis)
      d3.select('.yAxisGroup').call(this.yAxis)

      // 7 - styling axes
      d3.select('.xAxisGroup').selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
    }
  }
}
</script>

<template>
  <div class='canvasGraph' />
</template>

<style lang='scss'>
.xAxisGroup path, .xAxisGroup line,
.yAxisGroup path, .yAxisGroup line {
  stroke: rgb(160, 160, 160);
}

.xAxisGroup text, .yAxisGroup text {
  fill: rgb(160, 160, 160);
  font-size: 14px;
}
</style>
