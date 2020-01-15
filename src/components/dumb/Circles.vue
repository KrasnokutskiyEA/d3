<script>
import * as d3 from 'd3'

export default {
  name: 'Circles',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      // margin: { top: 20, right: 20, bottom: 100, left: 100 }
    }
  },

  computed: {
    // data stratify
    stratify () {
      return d3.stratify()
        .id(d => d.name)
        .parentId(d => d.parent)
    },

    rootNode () {
      return this.stratify(this.input)
        .sum(d => d.amount)
    },

    // circles diag generator
    pack () {
      return d3.pack().size([960, 700]).padding(5)
    },

    // finally prepared data with coords
    preparedData () {
      return this.pack(this.rootNode).descendants() // descendants converts to plain arr
    },

    // create ordinal scale (in this case, depends on depth!)
    color () {
      return d3.scaleOrdinal(['#d1c4e9', '#b39ddb', '#9575cd'])
    }
  },

  mounted () {
    this.drawCircles()
  },

  methods: {
    drawCircles () {
      const svg = d3.select('.canvasCircles').append('svg')
        .attr('width', 1060)
        .attr('height', 800)

      const graph = svg.append('g')
        .attr('transform', `translate(50, 50)`)
        .attr('class', 'graphCircles')

      // join data and group for each node
      const nodes = graph.selectAll('g')
        .data(this.preparedData)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)

      nodes.append('circle')
        .attr('r', d => d.r)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', d => this.color(d.depth))

      // append text to circles
      nodes.filter(node => !node.children)
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('fill', 'white')
        .attr('font-size', d => d.value * 5)
        .text(d => d.data.name)
    }
  }
}
</script>

<template>
  <div class='canvasCircles' />
</template>
