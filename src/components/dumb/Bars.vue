<script>
import * as d3 from 'd3'

export default {
  name: 'Bars',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      margin: { top: 20, right: 20, bottom: 100, left: 100 }
    }
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
      return d3.scaleBand()
        .range([0, 500])
        .paddingInner(0.2) // паддинги отделяют бары друг от друга
        .paddingOuter(0.2)
    },

    // ось - х
    xAxis () {
      return d3.axisBottom(this.x)
    },

    // шкала по оси - у
    y () {
      return d3.scaleLinear().range([this.graphHeight, 0]) // выход
    },

    // ось - y
    yAxis () {
      return d3.axisLeft(this.y).ticks(3).tickFormat(d => d + ' orders')
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
    widthTween (d) {
      // define interpolation
      // d3 interpolate returns a function which we call - i
      let i = d3.interpolate(0, this.x.bandwidth())
      // return a function which takes in a time ticker - t
      return function (t) {
        // return the value from passing thr ticker into interpolation
        return i(t)
      }
    },

    drawBars () {
      const svg = d3.select('.canvas').append('svg')
        .attr('width', 600)
        .attr('height', 600)

      const graph = svg.append('g')
        .attr('class', 'graph')
        .attr('width', this.graphWidth)
        .attr('height', this.graphHeight)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      // draw xAxisGroup
      graph.append('g')
        .attr('class', 'xAxisGroup')
        .attr('transform', `translate(0, ${this.graphHeight})`)

      // draw yAxisGroup
      graph.append('g')
        .attr('class', 'yAxisGroup')
    },

    updateBars (data) {
      // 0 - define transition
      const t = d3.transition().duration(1500)

      // 1 - updating scale domains
      this.y.domain([0, d3.max(this.input, d => d.orders)]) // что подаем на вход
      this.x.domain(this.input.map(item => item.name)) // что подаем на вход

      // 2 - Join data to DOM elements
      const rects = d3.select('.graph').selectAll('rect').data(this.input)

      // 3 - remove exit selection
      rects.exit().remove()

      // 4 - update current shapes in DOM
      rects
        .attr('width', this.x.bandwidth)
        .attr('fill', d => 'orange')
        .attr('x', d => this.x(d.name))

      // 5 - append enter selection to the DOM
      rects.enter().append('rect')
        .attr('width', this.x.bandwidth)
        .attr('height', 0)
        .attr('fill', d => 'orange')
        .attr('x', d => this.x(d.name))
        .attr('y', this.graphHeight)
        .merge(rects)
        .transition(t)
        .attrTween('width', this.widthTween)
        .attr('y', d => this.y(d.orders))
        .attr('height', d => this.graphHeight - this.y(d.orders))

      // call axes
      d3.select('.xAxisGroup').call(this.xAxis)
      d3.select('.yAxisGroup').call(this.yAxis)

      // styling axes
      d3.select('.xAxisGroup').selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('fill', 'orange')
    }
  }
}
</script>

<template>
  <div class='canvas' />
</template>
