import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMask from 'v-mask'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueYoutube from 'vue-youtube'
import VueLoadScript from "vue-load-script-plus";
import VueCarousel from 'vue-carousel';
// import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import Vue3TouchEvents from "vue3-touch-events";


// Custom Css
import "@/assets/scss/main.scss"

// import LoaderComponent from './state/loader/loader'
// import Store_States from './state/modules/store-states'
// trial

import vco from "v-click-outside"

import router from './router'
import store from '@/state/store'
import i18n from './i18n'

import "@/assets/scss/app.scss";

import { initFirebaseBackend } from './helpers/firebase/authUtils';

import { configureFakeBackend } from './api/fake-backend';
import VueLuxon from "vue-luxon";
// import loaderComponent from './state/loader/loader'
import 'leaflet/dist/leaflet.css';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureFakeBackend();
}

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(VueMask)
Vue.use(require('vue-chartist'))
Vue.use(VueGoogleMaps,
// Vue.use(LoaderComponent),
// Vue.use(Store_States), 
{
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)
Vue.use(VueLuxon)
Vue.use(VueLoadScript)
Vue.use(VueCarousel)
// Vue.use(Vue3TouchEvents)


// Filter
// Capitilazes the first chars in words
Vue.filter("capitalize", (val) => {
  if(!val) {
    return "";
  }
  return val.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
})

// Capitilazes the first chars in words
Vue.filter("prefix", (val) => {
  if(!val) {
    return "";
  }
  return `Mr. ${val}`;
})

// Parse date into local string
Vue.filter("parseDate", (val) => {
  if(!val) {
    return "";
  }
  return val.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
