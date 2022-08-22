import myRequest from "../../index"
import { IDateType } from "../../type"

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDateType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return myRequest.delete<IDateType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return myRequest.post<IDateType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, newData: any) {
  return myRequest.patch<IDateType>({
    url: url,
    data: newData
  })
}