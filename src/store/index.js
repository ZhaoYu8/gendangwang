import actions from "./actions";
import mutations from "./mutations";
let state = {
  customer: [],
  delivery: [],
  location: [],
  member: [],
  warehouse: [],
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
