import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nine',
    name: 'Nine',
    component: () => import('../views/Nine.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine')
  },
]

const router = new VueRouter({
  routes
})

export default router
