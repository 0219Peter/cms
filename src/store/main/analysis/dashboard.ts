import { Module } from "vuex"
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from "../../../service/main/analysis/dashboard"
import { IRootState } from "../../type"
import { IDashboardState } from "./types"

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult: any = await getCategoryGoodsCount()
      commit("changeCategoryGoodsCount", categoryCountResult.data)
      const categorySaleResult: any = await getCategoryGoodsSale()
      commit("changeCategoryGoodsSale", categorySaleResult.data)
      const categoryFavorResult: any = await getCategoryGoodsFavor()
      commit("changeCategoryGoodsFavor", categoryFavorResult.data)
      const addressGoodsResult: any = await getAddressGoodsSale()
      commit("changeAddressGoodsSale", addressGoodsResult.data)
    }
  }
}
export default dashboardModule
