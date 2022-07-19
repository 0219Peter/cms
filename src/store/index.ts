import { Store } from "element-plus/es/components/table/src/store"
import { createStore, useStore as useVuexStore } from "vuex"
import login from "./login/login"
import { IRootState, IStoreType } from "./type"
import system from "./main/system/system"

const store = createStore<IRootState>({
  state() {
    return {
      name: "",
      age: 0
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch("login/LoadLocalLogin")
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
