import Vue from 'vue';
import ELementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ELementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
