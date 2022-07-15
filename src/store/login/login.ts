import { Module } from "vuex"
import { IRootState } from "../type"
import { ILoginState } from "./type"
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "../../service/login/login"
import { Iaccount } from "../../service/login/type"
import localCache from "../../utils/cache"
import router from "../../router"

const LoginMoule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userinfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserinfo(state, userinfo: string) {
      state.userinfo = userinfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payLoad: Iaccount) {
      const LoginResult = await accountLoginRequest(payLoad)
      console.log(LoginResult)
      const { id, token } = LoginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)

      //用户信息
      const userinfoResult = await requestUserInfoById(id)
      const userinfo = userinfoResult.data
      commit("changeUserinfo", userinfo)
      localCache.setCache("userinfo", userinfo)

      //请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userinfo.role.id)
      const userMenus = userMenusResult.data
      commit("changeUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)

      //跳转到首页
      router.push("/main")
    },
    LoadLocalLogin({ commit }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }
      const userinfo = localCache.getCache("userinfo")
      if (userinfo) {
        commit("changeUserinfo", userinfo)
      }
      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("changeUserMenus", userMenus)
      }
    }
  }
}

export default LoginMoule
