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
import { mapMenusToPermissions, mapMenusToRoutes } from "../../utils/map-menus"
import user from "../../router/main/system/user/user"

const LoginMoule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userinfo: {},
      userMenus: [],
      permissions: []
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

      //菜单形成路由映射
      const routes = mapMenusToRoutes(userMenus)
      console.log(routes, "routes")
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      //获取按钮权限
      const permission = mapMenusToPermissions(userMenus)
      state.permissions = permission
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payLoad: Iaccount) {
      //实现登录
      const LoginResult = await accountLoginRequest(payLoad)
      console.log(LoginResult)
      const { id, token } = LoginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)
      //发送初始化请求
      dispatch("getInitialDataAction", null, { root: true })

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
    LoadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
        dispatch("getInitialDataAction", null, { root: true })
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
