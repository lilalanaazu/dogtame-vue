import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from "axios";
import Firebase from "firebase";
import firebaseConfig from "@/firebaseConfig";

//Design 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVueIcons } from 'bootstrap-vue'


Firebase.initializeApp(firebaseConfig);

Vue.use(IconsPlugin);
Vue.use(ElementUI);
Vue.use(axios);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
