import TYPES from "./types";

const mutations = {
  [TYPES.SET_USER](state, data) {
    state.user = data.customer_options;
    state.delivery = data.delivery_shift_options;
  },
};
export default mutations;
