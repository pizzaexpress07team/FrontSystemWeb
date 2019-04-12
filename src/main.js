import Vue from 'vue';
import ElementUI from 'element-ui';
// 百度地图引入
import BaiduMap from 'vue-baidu-map';
import App from './App.vue';
import router from './router';
import store from './store';
import './theme/index.css';
// 引入svg图标
import './svg';
// 请求函数封装
import {
  postRequest,
  putRequest,
  getRequest,
  deleteRequest,
} from './utils/request';

// 请求函数写入原型链，可通过this访问
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.$deleteRequest = deleteRequest;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  ak: 'tVhFbEhHkfSXzkpbNtN3g2KOZHBc3LOl',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
