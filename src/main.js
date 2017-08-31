// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import './assets/css/icon.css'
import './assets/css/reset.css'
import './assets/css/font-awesome.css'
import './assets/css/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'
Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios, axios)
Vue.material.registerTheme('default', {
  primary: 'white',
  warn: 'red',
  accent: 'green'
})
Vue.material.setCurrentTheme('default')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
