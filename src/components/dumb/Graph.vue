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
        .ticks(6)
        .tickFormat(d3.timeFormat('%b %d')) // month + date
    },

    // шкала по оси - у
    y () {
      return d3.scaleLinear().range([this.graphHeight, 0]) // выход
    },

    // ось - y
    yAxis () {
      return d3.axisLeft(this.y)
        .ticks(6)
        .tickFormat(d => d + 'm') // m - meters
    },

    // генератор основной линии графика
    line () {
      return d3.line()
        .x(d => this.x(new Date(d.date)))
        .y(d => this.y(d.distance))
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
    // event handlers
    handleMouseOver (d, i, n) {
      d3.select(n[i])
        .transition().duration(100)
        .attr('r', 8)
        .attr('fill', 'red')

      // set x dotted line coords (x1, x2, y1, y2)
      d3.select('.xDottedLine')
        .attr('x1', this.x(new Date(d.date)))
        .attr('y1', this.y(d.distance))
        .attr('x2', 0)
        .attr('y2', this.y(d.distance))
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', 4)

      // set y dotted line coords (x1, x2, y1, y2)
      d3.select('.yDottedLine')
        .attr('x1', this.x(new Date(d.date)))
        .attr('y1', this.graphHeight)
        .attr('x2', this.x(new Date(d.date)))
        .attr('y2', this.y(d.distance))
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', 4)

      // show the dotted line group (.style, opacity)
      d3.select('.dottedLinesGroup')
        .attr('style', 'opacity:1;')
    },

    handleMouseOut (d, i, n) {
      d3.select(n[i])
        .transition().duration(100)
        .attr('r', 4)
        .attr('fill', 'grey')
      d3.select('.dottedLinesGroup')
        .attr('style', 'opacity:0;')
    },

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

      // line path elements
      graph.append('path')
        .attr('class', 'graphLine')

      // dotted lines group
      const dottedLinesGroup = graph.append('g')
        .attr('class', 'dottedLinesGroup')

      dottedLinesGroup.append('line')
        .attr('class', 'xDottedLine')

      dottedLinesGroup.append('line')
        .attr('class', 'yDottedLine')
    },

    updateGraph (data) {
      // 1 - updating scale domains
      this.x.domain(d3.extent(this.input, d => new Date(d.date))) // что подаем на вход
      this.y.domain([0, d3.max(this.input, d => d.distance)]) // что подаем на вход

      // update path data (lines between points)
      d3.select('.graphLine').data([this.input])
        .attr('fill', 'none')
        .attr('stroke', '#00bfa5')
        .attr('stroke-width', 2)
        .attr('d', this.line)

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

      // add events
      d3.select('.graphGraph').selectAll('circle')
        .on('mouseover', (d, i, n) => this.handleMouseOver(d, i, n))
        .on('mouseleave', (d, i, n) => this.handleMouseOut(d, i, n))

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
