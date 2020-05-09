import Vue from 'vue'
import App from './app.vue'
import router from './routes'
import store from './store'
import Axios from 'axios'
import vuetify from './plugins/vuetify'

import VueYoutube from 'vue-youtube'
import VueFileAgent from 'vue-file-agent'
import 'vue-file-agent/dist/vue-file-agent.css'

Vue.use(VueFileAgent)
Vue.use(VueYoutube)

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common['Authorization'] = token
}

Axios.defaults.baseURL = process.env.VUE_APP_API_BASE
Axios.defaults.timeout = 10000
Vue.prototype.$http = Axios

Vue.mixin({
  created: () => {
    const redirect = sessionStorage.getItem('redirect')
    console.log('pushing to', redirect)
    delete sessionStorage.redirect
    this.$router.push(redirect)
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
