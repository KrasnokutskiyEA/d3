import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hello',
      component: () => import('../components/HelloWorld.vue')
    },
    {
      path: '/bars',
      name: 'bars',
      component: () => import('../components/Chart.vue')
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('../components/Pie.vue')
    }
  ]
})

export default router
