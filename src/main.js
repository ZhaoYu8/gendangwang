import Vue from 'vue';
import App from './App.vue';
import router from './router';
import http from './api/index';
import common from './assets/common';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Print from 'vue-print-nb';
Vue.config.productionTip = false;
let arr = [];
Vue.prototype.$post = http.post;
Vue.prototype.$common = common;
Vue.directive('focus', {
	inserted: function(el) {
		arr.push(el.children[0]);
		el.onkeydown = function(event) {
			if (event.keyCode === 13) {
				let ar = arr.findIndex((r) => event.target === r);
				if (arr[ar + 7]) {
					arr[ar + 7].focus();
				}
			}
		};
	},
});
Vue.use(ElementUI);
Vue.use(Print);
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
