import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin.js'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from '@/filters/data.filter'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

var firebaseConfig = {
  apiKey: "AIzaSyBZfqfcWbSoFvWUPho_fejkST1C9UfyFKU",
  authDomain: "hair-crm.firebaseapp.com",
  databaseURL: "https://hair-crm.firebaseio.com",
  projectId: "hair-crm",
  storageBucket: "hair-crm.appspot.com",
  messagingSenderId: "143068539479",
  appId: "1:143068539479:web:129f29b1ea7e1d4b5c1112",
  measurementId: "G-KJT9HC7C06"
};

firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


