import TYPES from "./types";

const mutations = {
  [TYPES.SET_USER](state, data) {
    state.customer = data.customer_options; // 客户
    state.delivery = data.delivery_shift_options;
    state.location = data.location_options; // 仓位
    state.member = data.member_options; // 会员
    state.warehouse = data.warehouse_options; // 仓库
  },
};
export default mutations;
