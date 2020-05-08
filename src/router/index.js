import Vue from 'vue'
import jwt_decode from 'jwt-decode'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Terms from '../views/Terms.vue'
import Error from '../views/Error.vue'
import Recipe from '../views/Recipe.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/account',
    name: 'User',
    component: User,
    meta: { requiresAuth: true }
  },
  {
    path: '/register/terms',
    name: 'Terms',
    component: Terms
  },
  { path: "*", component: Error }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth === true) {
    const token = window.localStorage.getItem('jwt-token')
    if (!token) next({ name: "Home" })
    try {
      const { exp } = jwt_decode(token)
      if (exp < new Date().getTime() / 1000) {
        next({ name: "Home" })
      }
      else {
        next()
      }
    } catch (err) {
      next({ name: "Home" })
    }

  }
  else {
    next()
  }


})

export default router
