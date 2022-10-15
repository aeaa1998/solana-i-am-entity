import actions from "./actions";
// import mutations from "./mutations";
import stateStore from "./state";
import mutations from "./mutations";

export default {
    state: stateStore.state,
    getters: stateStore.getters,
    actions,
    mutations
  }