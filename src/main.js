import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import ElementUI from 'element-ui'
import vueResource from "vue-resource"
import 'element-ui/lib/theme-chalk/index.css'
import './assets/all.css'
import store from "./store";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(vueResource)



new Vue({
  render: h => h(App),
  router:router,
  store:store,
}).$mount('#app')
