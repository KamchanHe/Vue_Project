import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import 'font-awesome/css/font-awesome.css';
import './commen/stylus/base.styl'
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad,{
	loading:require('./commen/image/logo.png')
});
Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
