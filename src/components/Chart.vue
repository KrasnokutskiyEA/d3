<script>
import db from '../main.js'
import Bars from './dumb/Bars.vue'

export default {
  name: 'Chart',

  components: {
    Bars
  },

  data () {
    return {
      recievedData: [],
      init: false
    }
  },

  created () {
    this.getData()
  },

  methods: {
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
    }
  }
}
</script>

<template>
  <div>
    <div v-if='!init'>Initializing...</div>
    <Bars v-else :input='recievedData' />
  </div>
</template>
