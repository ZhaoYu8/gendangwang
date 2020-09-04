import { Loading, Notification } from "element-ui";
let baseURL = "https://www.gendanwang.com/v1/api";
import vm from "../main";
if (process.env.NODE_ENV === "development") {
  baseURL = "/ccc";
}
let instance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
  responseType: "json",
  validateStatus(status) {
    return status === 200;
  },
});
let loading;
let _error;
// 拦截请求
instance.interceptors.request.use(
  (config) => {
    let params = { current_org: vm.$route.query.current_org || "423", current_member: vm.$route.query.current_member || "1092" };
    config.data = { ...params, ...config.data };
    if (loading) loading.close();
    loading = Loading.service({
      lock: true,
      text: "玩命加载中...",
      background: "transparent",
      target: ".content-box",
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      loading.close();
    }, 300);
    return response;
  },
  (error) => {
    setTimeout(() => {
      loading.close();
    }, 300);
    let errorMessage = "请求错误！请刷新页面再试！";
    if (error.response) {
      errorMessage = error.response.data === null ? errorMessage : error.response.data.message;
    }
    if (_error) return;
    _error = true;
    Notification.error({
      title: "系统提示",
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
    if (process.env.NODE_ENV === "development") {
      params.testing_mode = 1;
    }
    return instance.post(url, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
export default request;
