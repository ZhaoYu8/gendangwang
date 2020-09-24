import { Loading, Notification } from 'element-ui';
let baseURL = 'https://www.gendanwang.com/v1/api';
import vm from '../main';
if (process.env.NODE_ENV === 'development') {
  baseURL = '/ccc';
}
let instance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
  responseType: 'json',
  validateStatus(status) {
    return status === 200;
  },
});
let loading;
let _error;
// 拦截请求
instance.interceptors.request.use(
  (config) => {
    let params = {};
    let current_org;
    let current_member;
    if (vm.$route.query.current_org) {
      localStorage.setItem('current_org', vm.$route.query.current_org);
      localStorage.setItem('current_member', vm.$route.query.current_member);
      current_org = vm.$route.query.current_org;
      current_member = vm.$route.query.current_member;
    } else {
      current_org = '17152' || localStorage.getItem('current_org') || '423'; // 11112 423
      current_member = '43482' || localStorage.getItem('current_member') || '1092'; // 1 1092
    }
    params = {
      current_org: current_org, // 11112 423
      current_member: current_member, // 1 1092
    };
    config.data = {
      ...params,
      ...config.data,
    };
    if (loading) loading.close();
    loading = Loading.service({
      lock: true,
      text: '玩命加载中...',
      background: 'transparent',
      target: '.content-box',
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    loading.close();
    return response;
  },
  (error) => {
    loading.close();
    let errorMessage = '请求错误！请刷新页面再试！';
    if (error.response) {
      errorMessage = error.response.data === null ? errorMessage : error.response.data.message;
    }
    if (_error) return;
    _error = true;
    Notification.error({
      title: '系统提示',
      message: errorMessage,
      duration: 2000,
      onClose: () => {
        _error = false;
      },
    });
    return Promise.reject(error);
  }
);
const request = {
  post(url, params = {}) {
    if (process.env.NODE_ENV === 'development') {
      params.testing_mode = 1;
    }
    return instance.post(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
export default request;
