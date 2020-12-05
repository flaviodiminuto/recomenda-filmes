import Vue from 'vue'
import Router from 'vue-router'
import Catalogo from '../components/Catalogo'
import Login from '../view/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Catalogo',
      component: Catalogo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
