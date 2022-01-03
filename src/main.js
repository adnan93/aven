import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'
import  store  from './store'
import 'es6-promise/auto'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import en from 'vee-validate/dist/locale/en.json';
// import * as rules from 'vee-validate/dist/rules';

import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.component('date-picker', VuePersianDatetimePicker);






Vue.use(VueSweetalert2);
Vue.use(Vuex)

Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://95.217.131.10/'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
