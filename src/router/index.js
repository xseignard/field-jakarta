import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Controls from '../views/Controls.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/controls',
    name: 'controls',
    component: Controls,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
