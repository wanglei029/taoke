/*
 * @Author: your name
 * @Date: 2020-06-02 17:38:20
 * @LastEditTime: 2020-06-08 16:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taoke\src\router\index.js
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[]
  },
  {
    path: '/goodsdetail/:id',
    component: () => import('../components/goods-detail/goods-detail')
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
