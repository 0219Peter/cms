import { Module } from "vuex"
import { IRootState } from "../../type"
import { ISystemState } from "./type"
import {
  createPageData,
  deletePageData,
  editPageData,
  getPageListData
} from "../../../service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      Count: [],
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "users":
            return state.userList
          default:
            return (state as any)[`${pageName}List`]
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "users":
            return state.userCount
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
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
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
        case "goods":
          pageUrl = "/goods/list"
          break
        case "menu":
          pageUrl = "/menu/list"
          break
      }
      //发送请求
      const pageResult = await getPageListData(pageUrl, payLoad.queryInfo)
      console.log(pageResult.data)
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case "users":
          commit("changeUserList", list)
          commit("changeUserCount", totalCount)
          break
        case "role":
          commit("changeRoleList", list)
          commit("changeRoleCount", totalCount)
        case "goods":
          commit("changeGoodsList", list)
          commit("changeGoodsCount", totalCount)
          break
        case "menu":
          commit("changeMenuList", list)
          commit("changeMenuCount", totalCount)
          break
      }
    },

    async deletPageDataAtcion({ dispatch }, payLoad: any) {
      const { pageName, id } = payLoad
      const pageUrl1 = `/${pageName}/${id}`
      await deletePageData(pageUrl1)
      //然后重新请求数据
      const pageUrl = pageName
      dispatch("getPageListAction", {
        pageUrl,
        queryInfo: {
          offset: 1,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payLoad: any) {
      const { pageName, newData } = payLoad
      const pageUrl1 = `/${pageName}`
      await createPageData(pageUrl1, newData)
      //然后重新请求数据
      const pageUrl = pageName
      dispatch("getPageListAction", {
        pageUrl,
        queryInfo: {
          offset: 1,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payLoad) {
      const { pageName, editData, id } = payLoad
      const pageUrl1 = `/${pageName}/${id}`
      await editPageData(pageUrl1, editData)
      // 然后重新请求数据
      const pageUrl = pageName
      dispatch("getPageListAction", {
        pageUrl,
        queryInfo: {
          offset: 1,
          size: 10
        }
      })
    }
  }
}

export default systemModule
