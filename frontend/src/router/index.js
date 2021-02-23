import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Вход',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Регистрация',
    component: () => import('../views/Reg.vue')
  },
  {
    path: '/cabinet',
    name: 'Личный кабинет',
    component: () => import('../views/Cabinet.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.getters['auth/isAuth'] && to.path !== '/login' && to.path !== '/reg' && to.path !== '/') {
    next('/')
  }
  next()
})

export default router
