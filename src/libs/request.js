import axios from 'axios';

const request = axios.create({
  withCredentials: true,
  baseURL: window.blocklet ? window.blocklet.prefix : '/api',
  timeout: 200000,
});
// 请求拦截器
request.interceptors.request.use(
  (config) => config,
  (error) => {
    // eslint-disable-next-line no-console
    console.error('api reqeuest error: ', error);
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data) {
        return response.data;
      }
    }
    return Promise.reject(response);
  },
  (error) => Promise.reject(error)
);

export default request;
