import Tabs from '../components/Tabs.vue';
import Panel from '../components/Panel.vue';
import Page from '../components/page/Page.vue';

const obj = {
  install: function(Vue) {
    Vue.component('Tabs', Tabs);
    Vue.component('Panel', Panel);
    Vue.component('Page', Page);
  },
};
export default obj;
