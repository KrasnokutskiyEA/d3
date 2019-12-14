<script>
import {
  select,
  arc,
  scaleLinear,
  scaleBand,
  min,
  max,
  extent,
  axisBottom,
  axisLeft,
  interval
} from 'd3'

export default {
  name: 'Bars',

  data () {
    return {
      margin: { top: 20, right: 20, bottom: 100, left: 100 }
    }
  },

  props: {
    input: { type: Array, required: true }
  },

  computed: {
    // общая ширина графика
    graphWidth () {
      return 600 - this.margin.left - this.margin.right
    },

    // общая высота графика
    graphHeight () {
      return 600 - this.margin.top - this.margin.bottom
    },

    // шкала по оси - х
    x () {
      return scaleBand()
        .range([0, 500])
        .paddingInner(0.2) // паддинги отделяют бары друг от друга
        .paddingOuter(0.2)
    },

    // ось - х
    xAxis () {
      return axisBottom(this.x)
    },

    // шкала по оси - у
    y () {
      return scaleLinear().range([this.graphHeight, 0]) // выход
    },

    // ось - y
    yAxis () {
      return axisLeft(this.y).ticks(3).tickFormat(d => d + ' orders')
    }
  },

  watch: {
    input (newVal, oldVal) {
      this.updateBars(this.input)
    }
  },

  mounted () {
    this.drawBars()
    this.updateBars(this.input)
  },

  methods: {
    drawBars () {
      const svg = select('.canvas').append('svg')
        .attr('width', 600)
        .attr('height', 600)

      const graph = svg.append('g')
        .attr('class', 'graph')
        .attr('width', this.graphWidth)
        .attr('height', this.graphHeight)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      const xAxisGroup = graph.append('g')
        .attr('class', 'xAxisGroup')
        .attr('transform', `translate(0, ${this.graphHeight})`)

      const yAxisGroup = graph.append('g')
        .attr('class', 'yAxisGroup')
    },

    updateBars (data) {
      // 1 - updating scale domains
      this.y.domain([0, max(this.input, d => d.orders)]) // что подаем на вход
      this.x.domain(this.input.map(item => item.name)) // что подаем на вход

      // 2 - Join data to DOM elements
      const rects = select('.graph').selectAll('rect').data(this.input)

      // 3 - remove exit selection
      rects.exit().remove()

      // 4 - update current shapes in DOM
      rects
        .attr('width', this.x.bandwidth)
        .attr('height', d => this.graphHeight - this.y(d.orders))
        .attr('fill', d => 'orange')
        .attr('x', d => this.x(d.name))
        .attr('y', d => this.y(d.orders))

      // 5 - append enter selection to the DOM
      rects.enter().append('rect')
        .attr('width', this.x.bandwidth)
        .attr('height', d => this.graphHeight - this.y(d.orders))
        .attr('fill', d => 'orange')
        .attr('x', d => this.x(d.name))
        .attr('y', d => this.y(d.orders))

      // styling axes
      select('.xAxisGroup').selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('fill', 'orange')

      // call axes
      select('.xAxisGroup').call(this.xAxis)
      select('.yAxisGroup').call(this.yAxis)
    }
  }
}
</script>

<template>
  <div class='canvas' />
</template>
