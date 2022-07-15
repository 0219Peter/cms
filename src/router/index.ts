import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from "vue-router"
import localCache from "../utils/cache"
import Main from "../view/main/main.vue"
import login from "../view/login/login.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/main",
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes]
})

// router.beforeEach((to) => {
//   const token = localCache.getCache("token")
//   if (to.path !== "/login") {
//     if (!token) {
//       return "/login"
//     }
//   }
// })
export default router
