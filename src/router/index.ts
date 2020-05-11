import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const Menuroutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/page1',
        name: 'page1',
        component: () => import(/* webpackChunkName: "about" */ '../views/page1.vue')
      }, {
        path: '/about/page2',
        name: 'page2',
        component: () => import(/* webpackChunkName: "about" */ '../views/page2.vue')
      }
    ]
  },
  {
    path: '/about1',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export const sideBar = [{
  path: '/page1',
  name: 'page1',
  component: () => import(/* webpackChunkName: "about" */ '../views/page1.vue')
},
{
  path: '/page2',
  name: 'page2',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/page2.vue')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Menuroutes
})

export default router
