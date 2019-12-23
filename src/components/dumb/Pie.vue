<script>
import {
  select,
  pie,
  arc
// scaleLinear,
// scaleBand,
// max,
// axisBottom,
// axisLeft,
// transition,
// interpolate
} from 'd3'

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

    // генератор углов
    pie () {
      return pie().sort(null).value(d => d.cost)
    },

    // генератор секции
    arcPath () {
      return arc()
        .outerRadius(this.dims.radius)
        .innerRadius(this.dims.raduis / 2)
    }

    // шкала по оси - х
    // x () {
    //   return scaleBand()
    //     .range([0, 500])
    //     .paddingInner(0.2) // паддинги отделяют бары друг от друга
    //     .paddingOuter(0.2)
    // },

    // ось - х
    // xAxis () {
    //   return axisBottom(this.x)
    // },

    // шкала по оси - у
    // y () {
    //   return scaleLinear().range([this.graphHeight, 0]) // выход
    // },

    // ось - y
    // yAxis () {
    //   return axisLeft(this.y).ticks(3).tickFormat(d => d + ' orders')
    // }
  },

  watch: {
    // input (newVal, oldVal) {
    //   this.updateBars(this.input)
    // }
  },

  mounted () {
    this.drawPie()
    this.updatePie(this.input)
  },

  methods: {
    // widthTween (d) {
    //   // define interpolation
    //   // d3 interpolate returns a function which we call - i
    //   let i = interpolate(0, this.x.bandwidth())
    //   // return a function which takes in a time ticker - t
    //   return function (t) {
    //     // return the value from passing thr ticker into interpolation
    //     return i(t)
    //   }
    // },

    drawPie () {
      const svg = select('.canvas').append('svg')
        .attr('width', this.dims.width + 150)
        .attr('height', this.dims.height + 150)

      const graph = svg.append('g')
        // .attr('class', 'graph')
        // .attr('width', this.graphWidth)
        // .attr('height', this.graphHeight)
        .attr('transform', `translate(${this.cent.x}, ${this.cent.y})`)

      console.log(graph)

      //   // draw xAxisGroup
      //   graph.append('g')
      //     .attr('class', 'xAxisGroup')
      //     .attr('transform', `translate(0, ${this.graphHeight})`)

      //   // draw yAxisGroup
      //   graph.append('g')
      //     .attr('class', 'yAxisGroup')
    },

    updatePie (data) {
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
  <div class='canvas' />
</template>
