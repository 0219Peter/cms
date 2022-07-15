import myRequest from "../index"
import { Iaccount, IDateType, ILoginResult } from "./type"

export function accountLoginRequest(account: Iaccount) {
  return myRequest.post<IDateType<ILoginResult>>({
    url: "/login",
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IDateType>({
    url: "/users/" + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return myRequest.get<IDateType>({
    url: "/role/" + id + "/menu"
  })
}
