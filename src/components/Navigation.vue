<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navigation',

  data () {
    return {
      visible: true,
      items: [
        { title: 'Hello', icon: 'build', addr: '' },
        { title: 'Bars', icon: 'build', addr: 'bars' },
        { title: 'Pie', icon: 'build', addr: 'pie' }
      ]
    }
  },

  // computed: {
  //   ...mapGetters([
  //     'nodes',
  //     'url',
  //     'login'
  //   ])
  // },

  methods: {
    // ...mapActions([
    //   'getStructure',
    //   'setConfig',
    //   'startLogout'
    // ]),

    go (addr) {
      this.$router.push({ path: `/${addr}` })
      // console.log('-----this.$route=', this.$route)
      // console.log('addr=', addr)
    },

    link (addr) {
      return this.$route.name === addr
    },

    logo () {
      return this.$route.name === 'hello'
    },

    icon (addr) {
      return this.$route.name === addr ? '#636363' : 'white'
    }
  }
}
</script>

<template>
  <div>
    <v-app-bar
      app
      flat
      color='#DDDDDD'
    >
      <v-app-bar-nav-icon @click='visible = !visible' />

      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model='visible'
      app
      dark
      :width='330 + "px"'
    >
      <v-card
        :disabled='logo()'
        flat
        class='logo'
        @click='go("")'
      >
        <div class='pointer-area' />
      </v-card>

      <v-divider class='divider' />

      <v-list dense class='mt-2 ml-3'>
        <v-list-item
          v-for='item in items'
          :key='item.title'
          :disabled='link(item.addr)'
          @click='go(item.addr)'
        >
          <v-list-item-action>
            <v-icon :color='icon(item.addr)'>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class='subheading'>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss">
.logo {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  height: 169px;
  background-position: center;
  background-size: 80%;
  .pointer-area {
    width: 70%;
    height: 50%;
    cursor: pointer;
  }
}
.divider {
  border-color: white !important;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
