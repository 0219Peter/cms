import myRequest from "../../index"
import { IDateType } from "../../type"

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDateType>({
    url: url,
    data: queryInfo
  })
}
