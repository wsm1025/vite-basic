import axios from 'axios';
import { notification } from 'ant-design-vue';
const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    notification.error({
      message: '提示',
      description: error.message,
    });
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    notification.error({
      message: '提示',
      description: error.message,
    });

    return Promise.reject(error);
  }
);

export default instance;
