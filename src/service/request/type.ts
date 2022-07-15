import { AxiosRequestConfig, AxiosResponse } from "axios"

export interface CRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}
export interface CRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CRequestInterceptors
  showloading?: boolean
}
