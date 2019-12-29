<script>
import * as d3 from 'd3'

export default {
  name: 'Pie',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      dims: { height: 300, width: 300, radius: 150 } // размеры
    }
  },

  computed: {
    // центрирование
    cent () {
      return { x: this.dims.width / 2 + 5, y: this.dims.height / 2 + 5 }
    },

    // генератор углов pie() - в радианах
    pieGenerator () {
      return d3.pie().sort(null).value(d => d.cost)
    },

    // генератор секции arc() ренерирует path, зная углы рассчитанные pie()
    arcPath () {
      return d3.arc()
        .outerRadius(this.dims.radius)
        .innerRadius(this.dims.radius / 2)
    },

    color () {
      return d3.scaleOrdinal(d3['schemeSet3'])
    }
  },

  watch: {
    input (newVal, oldVal) {
      return this.updatePie(newVal)
    }
  },

  mounted () {
    this.drawPie()
    this.updatePie(this.input)
  },

  methods: {
    drawPie () {
      const svg = d3.select('.canvasPie').append('svg')
        .attr('width', this.dims.width + 150)
        .attr('height', this.dims.height + 150)

      svg.append('g')
        .attr('transform', `translate(${this.cent.x}, ${this.cent.y})`)
        .attr('class', 'graphPie')
    },

    updatePie (data) {
      // update color scale domain
      this.color.domain(data.map(d => d.name))

      // join enchanced pie data to path elements
      const paths = d3.select('.graphPie').selectAll('path')
        .data(this.pieGenerator(data))

      paths.enter()
        .append('path')
        .attr('class', 'arc')
        .attr('d', this.arcPath)
        .attr('stroke', '#FFF')
        .attr('stroke-width', 3)
        .attr('fill', d => this.color(d.data.name))

      // 0 - define transition
      // const t = transition().duration(1500)

      //   // 1 - updating scale domains
      //   this.y.domain([0, max(this.input, d => d.orders)]) // что подаем на вход
      //   this.x.domain(this.input.map(item => item.name)) // что подаем на вход

      //   // 2 - Join data to DOM elements
      //   const rects = select('.graph').selectAll('rect').data(this.input)

      //   // 3 - remove exit selection
      //   rects.exit().remove()

      //   // 4 - update current shapes in DOM
      //   rects
      //     .attr('width', this.x.bandwidth)
      //     .attr('fill', d => 'orange')
      //     .attr('x', d => this.x(d.name))

      //   // 5 - append enter selection to the DOM
      //   rects.enter().append('rect')
      //     .attr('width', this.x.bandwidth)
      //     .attr('height', 0)
      //     .attr('fill', d => 'orange')
      //     .attr('x', d => this.x(d.name))
      //     .attr('y', this.graphHeight)
      //     .merge(rects)
      //     .transition(t)
      //     .attrTween('width', this.widthTween)
      //     .attr('y', d => this.y(d.orders))
      //     .attr('height', d => this.graphHeight - this.y(d.orders))

      //   // call axes
      //   select('.xAxisGroup').call(this.xAxis)
      //   select('.yAxisGroup').call(this.yAxis)

      //   // styling axes
      //   select('.xAxisGroup').selectAll('text')
      //     .attr('transform', 'rotate(-40)')
      //     .attr('text-anchor', 'end')
      //     .attr('fill', 'orange')
    }
  }
}
</script>

<template>
  <div class='canvasPie' />
</template>
