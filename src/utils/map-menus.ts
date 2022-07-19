import { RouteRecordRaw } from "vue-router"

let firstMenu: any = null

export function mapMenusToRoutes(usermenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先加载默认的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = import.meta.globEager("../router/main/**/*.ts")

  console.log(routeFiles)
  Object.values(routeFiles).forEach((key) => {
    //webpack的写法
    // const route = require("../router/main" + key.split(".")[1])
    //此时route拿到的是模块module
    // allRoutes.push(route)

    //vite
    allRoutes.push(key.default)
  })

  //根据菜单获取到新的routes

  const _recurseGetRouse = (usermenus: any[]) => {
    for (const menu of usermenus) {
      if (menu.type == 2) {
        const route = allRoutes.find((route) => {
          return route.path == menu.url
        })
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRouse(menu.children)
      }
    }
  }

  _recurseGetRouse(usermenus)

  return routes
}

export function pathMapToMenu(usermenus: any[], currentPath: string): any {
  for (const menu of usermenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
