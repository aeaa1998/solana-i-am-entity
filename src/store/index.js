import { createStore } from "vuex";
import wallet from "./wallet";
import connection from "./connection";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    wallet,
    connection
  },
});
