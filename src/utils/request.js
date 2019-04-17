import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

// 请求拦截器配置：链接超时，post跨域处理
axios.interceptors.request.use((config) => {
  const newConfig = config;
  if (newConfig.method === 'POST' || newConfig.method === 'PUT') {
    newConfig.data = qs.stringify({
      ...newConfig.data,
    });
  }
  console.log(2333, newConfig.data);
  return newConfig;
}, (err) => {
  Message.error({ message: '请求超时!' });
  return Promise.resolve(err);
});

// 相应拦截器配置：错误返回
axios.interceptors.response.use((data) => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({ message: data.data.msg });
    return false;
  }
  return data;
}, (err) => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
  } else if (err.response.status === 403) {
    Message.error({ message: '请优先登录!' });
  } else {
    Message.error({ message: '服务器开小差啦，请稍后再试~' });
  }
  return Promise.resolve(err);
});

const base = 'http://3.86.76.105:8080';

export const postRequest = (url, params) => axios({
  method: 'POST',
  url: `${base}${url}`,
  data: params,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const putRequest = (url, params) => axios({
  method: 'PUT',
  url: `${base}${url}`,
  data: params,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deleteRequest = url => axios({
  method: 'DELETE',
  url: `${base}${url}`,
});

export const getRequest = url => axios({
  method: 'GET',
  url: `${base}${url}`,
});
