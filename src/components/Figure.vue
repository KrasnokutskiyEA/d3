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

import db from '../main.js'

export default {
  name: 'Figure',

  data () {
    return {
      margin: { top: 20, right: 20, bottom: 100, left: 100 },
      recievedData: [],
      graphPars: [],
      init: false
    }
  },

  computed: {
    graphWidth () {
      return 600 - this.margin.left - this.margin.right
    },
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
      return scaleLinear()
        .range([this.graphHeight, 0]) // выход
    },
    // ось - y
    yAxis () {
      return axisLeft(this.y).ticks(3).tickFormat(d => d + ' orders')
    }
  },

  created () {
    this.getData()
  },

  watch: {
    init (val) {
      this.drawBars()
      this.updateBars(this.recievedData, this.graphPars)
    },

    recievedData (newVal, oldVal) {
      this.updateBars(this.recievedData, this.graphPars)
    }
  },

  methods: {
    drawBars () {
      // selecting elements
      const svg = select('.canvas').append('svg')
        .attr('width', 600)
        .attr('height', 600)

      const graph = svg.append('g')
        .attr('width', this.graphWidth)
        .attr('height', this.graphHeight)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${this.graphHeight})`)
      const yAxisGroup = graph.append('g')

      this.$set(this, 'graphPars', [graph, xAxisGroup, yAxisGroup])
    },

    getData () {
      // get data from firestore, onSnapshot - changes listener
      let fdata = []
      return db.collection('dishes').onSnapshot(res => {
        res.docChanges().forEach(change => {
          const doc = { ...change.doc.data(), id: change.doc.id }

          // forming data array
          switch (change.type) {
            case 'added':
              fdata.push(doc)
              break
            case 'modified':
              const i = fdata.findIndex(i => i.id === doc.id)
              fdata[i] = doc
              break
            case 'removed':
              fdata = fdata.filter(i => i.id !== doc.id)
              break
            default:
              break
          }
        })

        this.$set(this, 'recievedData', [])
        this.recievedData = [ ...this.recievedData, ...fdata ]

        !this.init && this.$set(this, 'init', true)
      })
    },

    updateBars (data, [graph, xAxisGroup, yAxisGroup]) {
      // 1 - updating scale domains
      this.y.domain([0, max(this.recievedData, d => d.orders)]) // что подаем на вход
      this.x.domain(this.recievedData.map(item => item.name)) // что подаем на вход

      // 2 - Join data to DOM elements
      const rects = graph.selectAll('rect').data(this.recievedData)

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
      xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('fill', 'orange')

      // call axes
      xAxisGroup.call(this.xAxis)
      yAxisGroup.call(this.yAxis)
    }
  }
}
</script>

<template>
  <div class='canvas' />
</template>
