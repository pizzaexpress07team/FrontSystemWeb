import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
import Home from './views/Home.vue';

Vue.use(Router);

// eslint-disable-next-line
export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('./views/Menu.vue'),
    },
    {
      path: '/checkOrder',
      name: 'checkOrder',
      component: () => import('./views/CheckOrder.vue'),
    },
    {
      path: '/addrManage',
      name: 'addrManage',
      component: () => import('./views/AddrManage.vue'),
    },
  ],
});

// 路由拦截器，未登录需先跳转登录页（登录页和主页除外）
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin');
  if (!isLogin) {
    if (to.name === 'home') {
      next();
    } else if (to.name !== 'login') {
      Message({
        message: '请优先登录',
        type: 'warning',
      });
      setTimeout(() => {
        next({
          name: 'login',
        });
      }, 2000);
    } else {
      next();
    }
  } else {
    next();
  }
});
