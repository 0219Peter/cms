export interface Iaccount {
  name: string
  password: string
}
export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDateType<T = any> {
  code: number
  data: T
}
