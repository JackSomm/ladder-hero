import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/Home.vue")
  },
  {
    path: '/replay/:slug',
    name: 'replay',
    component: () => import("../views/Replay.vue"),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
