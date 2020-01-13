import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import { baseURL } from '@/utils/constants'
import vuetify from './plugins/vuetify'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common['Authorization'] = token
}

Axios.defaults.baseURL = baseURL
Axios.defaults.timeout = 10000
Vue.prototype.$http = Axios.create()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
