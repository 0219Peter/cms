import CRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import localCache from "../utils/cache"

const myRequest = new CRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config: any) => {
      //携带Token的拦截
      const token = localCache.getCache("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorsCatch: (err: any) => {
      return err
    },
    responseInterceptors: (res: any) => {
      return res
    },
    responseInterceptorsCatch: (err: any) => {
      return err
    }
  }
})

export default myRequest
