import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from "vue-router"
import localCache from "../utils/cache"
import Main from "../view/main/main.vue"
import login from "../view/login/login.vue"
import { firstMenu } from "../utils/map-menus"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/main",
    name: "main",
    component: Main
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../view/not-found/not-found.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes]
})

router.beforeEach((to) => {
  const token = localCache.getCache("token")
  if (to.path !== "/login") {
    if (!token) {
      return "/login"
    }
  }
  if (to.path == "/main") {
    return firstMenu.url
  }
})
export default router
