import { useStore } from "vuex"

export function usePermission(pageName: String, handleName: String) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item: any) => item == verifyPermission)
}
