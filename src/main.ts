import { createApp, App } from "vue"
import rootApp from "./App.vue"
import router from "./router"
import store from "./store"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import CRequest from "./service"
import "normalize.css"
import { setupStore } from "./store"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app: App = createApp(rootApp)
setupStore()
app.use(router)
app.use(store)
app.use(ElementPlus)

//引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount("#app")

// type DataType = {
//   returnCode: string
//   success: boolean
// }

// CRequest.request<DataType>({
//   url: "/home/multidata",
//   method: "GET",
//   showloading: true
// }).then()
