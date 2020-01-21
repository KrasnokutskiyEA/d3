<script>
import * as d3 from 'd3'

export default {
  name: 'Tree',

  props: {
    input: { type: Array, required: true }
  },

  data () {
    return {
      dims: { height: 500, width: 1100 } // dimensions
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
    },

    // tree generator
    tree () {
      return d3.tree().size([this.dims.width, this.dims.height])
    },

    // finally prepared data with xoords
    preparedData () {
      return this.tree(this.rootNode)
    },

    // генератор цветов
    color () {
      return d3.scaleOrdinal(d3['schemeSet1'])
    }
  },

  watch: {
    input (newVal, oldVal) {
      return this.updateTree(newVal)
    }
  },

  mounted () {
    this.drawTree()
    this.updateTree(this.input)
  },

  methods: {
    drawTree () {
      const svg = d3.select('.canvasTree').append('svg')
        .attr('width', this.dims.width + 100)
        .attr('height', this.dims.height + 100)

      svg.append('g')
        .attr('transform', `translate(50, 50)`)
        .attr('class', 'graphTree')
    },

    updateTree (data) {
      // 1 - remove nodes
      d3.select('.graphTree').selectAll('.node').remove()
      d3.select('.graphTree').selectAll('.link').remove()

      // 1.1 - update color scale domain
      this.color.domain(data.map(d => d.department))

      // get link selection and join data
      const links = d3.select('.graphTree').selectAll('.link').data(this.preparedData.links())

      // 2- Join data to DOM elements - (create nodes for objects)
      const nodes = d3.select('.graphTree').selectAll('.node').data(this.preparedData.descendants())

      // 5.1 - append enter selection to the DOM - (add new links)
      links.enter().append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#aaa')
        .attr('stroke-width', 2)
        .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y))

      // 5.2 - append enter selection to the DOM - (add new tree nodes)
      const enterNodes = nodes.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)

      // 5.3 - append rects to enter nodes
      enterNodes.append('rect')
        .attr('fill', d => this.color(d.data.department))
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .attr('height', 50)
        .attr('width', d => d.data.name.length * 20)
        .attr('transform', d => {
          let x = d.data.name.length * 10
          return `translate(${-x}, -28)`
        })

      // 5.4 - append name text
      enterNodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(d => d.data.name)
    }
  }
}
</script>

<template>
  <div class='canvasTree' />
</template>

<style lang='scss'>

</style>
