import axios, { Axios, AxiosInstance, AxiosRequestConfig } from "axios"
import { CRequestConfig, CRequestInterceptors } from "./type"
import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/es/components/loading/src/loading"
import { fa } from "element-plus/es/locale"
class CRequest {
  instance: AxiosInstance
  interceptors?: CRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: CRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showloading ?? false
    //所有实例有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgb(0,0,0,0.5)"
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        //移除Loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        const data = res.data
        return data
      },
      (err) => {
        // if (err.response.status === 404) {
        // }
        return err
      }
    )

    //取出实例的拦截器
    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
  }

  request<T = any>(config: CRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showloading == false) {
        this.showLoading == config.showloading
      }
      this.showLoading == true

      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // console.log(res)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  post<T>(config: CRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "Post" })
  }
  get<T>(config: CRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "Get" })
  }
}

export default CRequest
