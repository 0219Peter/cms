import { Module } from "vuex"
import { IRootState } from "../../type"
import { ISystemState } from "./type"
import { getPageListData } from "../../../service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad: any) {
      const pageResult = await getPageListData(
        payLoad.pageUrl,
        payLoad.queryInfo
      )
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit("changeUserList", list)
      commit("changeUserCount", totalCount)
    }
  }
}

export default systemModule
