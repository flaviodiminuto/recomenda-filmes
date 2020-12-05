// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(VueRouter)
Vue.use(VueCookies)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
