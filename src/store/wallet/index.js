import actions from "./actions";
import mutations from "./mutations";
import stateStore from "./stateStore";
import * as types from "./types";

export default {
    state: stateStore.state,
    getters: stateStore.getters,
    actions,
    mutations
  }