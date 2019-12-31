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
      // 0 - update color scale domain
      this.color.domain(data.map(d => d.name))

      // 1 - join data data to DOM elements
      const paths = d3.select('.graphPie').selectAll('path')
        .data(this.pieGenerator(data))

      // 2 - remove exit selection
      paths.exit().remove()

      // 3 - update current shapes in DOM
      paths.attr('d', this.arcPath)

      // 4 - append enter selection to the DOM
      paths.enter()
        .append('path')
        .attr('class', 'arc')
        .attr('d', this.arcPath)
        .attr('stroke', '#FFF')
        .attr('stroke-width', 3)
        .attr('fill', d => this.color(d.data.name))
    }
  }
}
</script>

<template>
  <div class='canvasPie' />
</template>
