import actions from './actions';
import mutations from './mutations';
let state = {
  user: [], // 员工数据合集
  delivery: [],
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
