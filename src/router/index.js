import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/HelloWorld.vue')
    },
    {
      path: '/bars',
      name: 'bars',
      component: () => import('../components/BarChart.vue')
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('../components/PieChart.vue')
    },
    {
      path: '/graph',
      name: 'graph',
      component: () => import('../components/GraphChart.vue')
    },
    {
      path: '/circles',
      name: 'circles',
      component: () => import('../components/CirclesChart.vue')
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('../components/TreeChart.vue')
    }
  ]
})

export default router
