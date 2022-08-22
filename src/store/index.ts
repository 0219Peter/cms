import { Store } from "element-plus/es/components/table/src/store"
import { createStore, useStore as useVuexStore } from "vuex"
import login from "./login/login"
import { IRootState, IStoreType } from "./type"
import system from "./main/system/system"
import { getPageListData } from "../service/main/system/system"
import dashboard from "./main/analysis/dashboard"
const store = createStore<IRootState>({
  state() {
    return {
      name: "",
      age: 0,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  getters: {},
  actions: {
    //吧编辑的选择权限和角色放在根目录
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      //保存数据
      commit("changeEntireDepartment", departmentList)
      commit("changeEntireRole", roleList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch("login/LoadLocalLogin")
  store.dispatch('getInitialDataAction')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
