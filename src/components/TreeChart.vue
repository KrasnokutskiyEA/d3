<script>
import { mapActions, mapGetters } from 'vuex'
import FormTree from './dumb/FormTree.vue'
import Tree from './dumb/Tree.vue'
import db from '../main.js'

let unsubscribe

export default {
  name: 'TreeChart',

  components: {
    FormTree,
    Tree
  },

  computed: {
    ...mapGetters([
      'recievedDataTree',
      'initTree'
    ])
  },

  created () {
    unsubscribe = db.collection('employees').onSnapshot(res => this.getDataTree(res))
  },

  destroyed () {
    unsubscribe()
  },

  methods: {
    ...mapActions([
      'addItemTree',
      'getDataTree'
    ])
  }
}
</script>

<template>
  <div class='treeview'>
    <FormTree
      @submit='addItemTree'
    />
    <div v-if='!initTree'>Initializing Tree...</div>
    <Tree v-if='initTree' :input='recievedDataTree' />
  </div>
</template>

<style lang='scss'>
.treeview {
  display: flex;
  justify-content: space-between;
}
</style>
