import Tabs from "../components/Tabs.vue";
import Panel from "../components/Panel.vue";

const obj = {
  install: function(Vue) {
    Vue.component("Tabs", Tabs);
    Vue.component("Panel", Panel);
  },
};
export default obj;
