import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faPlus, faEdit, faDeleteLeft, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
library.add(faUserSecret, faPlus, faEdit, faDeleteLeft, faCheck, faTrash)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
