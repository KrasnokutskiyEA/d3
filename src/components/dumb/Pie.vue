<script>
import * as d3 from 'd3'
import { legendColor } from 'd3-svg-legend'
import d3Tip from 'd3-tip'

export default {
  name: 'Pie',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      dims: { height: 300, width: 300, radius: 150 }, // размеры
      current: []
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

    // генератор цветов
    color () {
      return d3.scaleOrdinal(d3['schemeSet3'])
    },

    // настройка легенды
    legend () {
      return legendColor()
        .shape('circle')
        .shapePadding(10)
        .scale(this.color)
    },

    // настройка подсказки
    tip () {
      return d3Tip()
        .attr('class', 'tip')
        .html(d => {
          let content = `<div class='name'>${d.data.name}</div>`
          content += `<div class='cost'>${d.data.cost}</div>`
          content += `<div class='delete'>Click slice to delete</div>`
          return content
        })
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
    arcTweenEnter (d) {
      // define result
      const result = (d) => this.arcPath(d)
      // define interpolation
      // d3 interpolate returns a function which we call - i
      let i = d3.interpolate(d.endAngle, d.startAngle)
      // return a function which takes in a time ticker - t
      return function (t) {
        d.startAngle = i(t) // eslint-disable-line no-param-reassign
        return result(d)
      }
    },

    arcTweenExit (d) {
      const result = (d) => this.arcPath(d)
      let i = d3.interpolate(d.startAngle, d.endAngle)

      return function (t) {
        d.startAngle = i(t) // eslint-disable-line no-param-reassign
        return result(d)
      }
    },

    arcTweenUpdate (d) {
      let _this = this
      const current = this.current.find(el => el.index === d.index)

      // interpolate between two objects
      let i = d3.interpolate(current, d)

      // update (this.current) with new updated data
      this.current[d.index] = d

      return function (t) {
        return _this.arcPath(i(t))
      }
    },

    // event handlers
    handleMouseOver (d, i, n) {
      return d3.select(n[i])
        .transition('changeSliceFill').duration(300)
        .attr('fill', '#660033')
    },

    handleMouseOut (d, i, n) {
      return d3.select(n[i])
        .transition('changeSliceFill').duration(300)
        .attr('fill', this.color(d.data.name))
    },

    handleClick (d) {
      return this.$emit('delete', d.data.id)
    },

    drawPie () {
      const svg = d3.select('.canvasPie').append('svg')
        .attr('width', this.dims.width + 150)
        .attr('height', this.dims.height + 150)

      svg.append('g')
        .attr('transform', `translate(${this.cent.x}, ${this.cent.y})`)
        .attr('class', 'graphPie')

      d3.select('.graphPie').selectAll('path')

      // отрисовка легенды
      svg.append('g')
        .attr('transform', `translate(${this.dims.width + 40}, 10)`)
        .attr('class', 'legendGroup')
    },

    updatePie (data) {
      // 0 - update color scale domain
      this.color.domain(data.map(d => d.name))

      // 0.1 - update and call legend
      const legendGroup = d3.select('.legendGroup').call(this.legend)

      legendGroup.selectAll('text')
        .attr('fill', '#660033')

      // 1 - join data data to DOM elements
      const paths = d3.select('.graphPie').selectAll('path')
        .data(this.pieGenerator(data))

      // 2 - remove exit selection
      paths
        .exit()
        .transition().duration(300).attrTween('d', this.arcTweenExit)
        .remove()

      // 3 - update current shapes in DOM
      paths
        .attr('d', this.arcPath)
        .transition().duration(300).attrTween('d', this.arcTweenUpdate)

      // 4 - append enter selection to the DOM
      paths.enter()
        .append('path')
        .attr('class', 'arc')
        .attr('stroke', '#FFF')
        .attr('stroke-width', 3)
        .attr('fill', d => this.color(d.data.name))
        .each(d => this.current.push(d))
        .transition().duration(300).attrTween('d', this.arcTweenEnter)

      // 5 - add events
      const section = d3.select('.graphPie').selectAll('path')
        .on('mouseover', (d, i, n) => {
          this.tip.show(d, n[i])
          this.handleMouseOver(d, i, n)
        })
        .on('mouseout', (d, i, n) => {
          this.tip.hide()
          this.handleMouseOut(d, i, n)
        })
        .on('click', this.handleClick)

      // 6 - call tip
      section.call(this.tip)
    }
  }
}
</script>

<template>
  <div class='canvasPie' />
</template>

<style lang='scss'>
.tip {
  padding: 10px;
  background: #333;
  color: #fff;
  .delete {
    color: red;
    font-size: 0.8em;
  }
}
</style>
