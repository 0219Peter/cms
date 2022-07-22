import { Module } from "vuex"
import { IRootState } from "../../type"
import { ISystemState } from "./type"
import { getPageListData } from "../../../service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      Count: [],
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters:{
   pageListData(state){
    return (pageName:string) => {
      switch(pageName){
        case 'users':
          return state.userList;
        default:
          return (state as any)[`${pageName}List`]
      }
    }
   },
   pageListCount(state){
    return (pageName:string) => {
      switch(pageName){
        case 'users':
          return state.userCount;
        default:
          return (state as any)[`${pageName}Count`]
      }
    }
   }

  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad: any) {
      //获取pageUrl
      const pageName = payLoad.pageUrl
      let pageUrl = ""
      switch (pageName) {
        case "users":
          pageUrl = "/users/list"
          break
        case "role":
          pageUrl = "/role/list "
          break
      }
      //发送请求
      const pageResult = await getPageListData(pageUrl, payLoad.queryInfo)
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case "users":
          commit("changeUserList", list)
          commit("changeUserCount", totalCount)
          break
        case "role":
          commit("changeRoleList", list)
          commit("changeRoleCount", totalCount)
          break
      }
    }
  }
}

export default systemModule
