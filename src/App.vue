<script>
// import { mapActions, mapGetters } from 'vuex'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',

  components: {
    Navigation
  }
}
</script>

<template>
  <v-app style='background: #ffffff'>
    <Navigation />
    <v-content>
      <v-container pa-0 fluid grid-list-md>
        <transition name='fade'>
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.1s;
}
.fade-enter-active {
  transition-delay: 0.1s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
