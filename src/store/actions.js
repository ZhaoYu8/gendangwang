// import { ActionTree } from 'vuex'
import TYPES from "./types";
let that = new Vue();
const actions = {
  async getUser({ commit }, data = {}) {
    // 员工
    const res = await that.$post("/delivery_plans/new_plan", data).then((res) => res.data.data);
    if (!res) return;
    commit(TYPES.SET_USER, res);
    return res;
  },
};
export default actions;
