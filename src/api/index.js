import axios from 'axios';
import { Loading, Notification } from 'element-ui';
let baseURL = 'https://www.gendanwang.com/v1/api';
if (process.env.NODE_ENV === 'development') {
	baseURL = '/ccc';
}
let instance = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	responseType: 'json',
	validateStatus(status) {
		return status === 200;
	},
});
let loading;
// 拦截请求
instance.interceptors.request.use(
	(config) => {
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
		setTimeout(() => {
			loading.close();
		}, 300);
		return response;
	},
	(error) => {
		setTimeout(() => {
			loading.close();
		}, 300);
		let errorMessage = '系统内部异常，请联系网站管理员';
		if (error.response) {
			errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message;
		}
		Notification.error({
			title: '系统提示',
			message: errorMessage,
			duration: 4000,
		});
		return Promise.reject(error);
	}
);
const request = {
	post(url, params = {}) {
	params = { ...params, ...{ current_org: this.$route.query.current_org || '423', current_member: this.$route.query.current_member || '1092' } };
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
