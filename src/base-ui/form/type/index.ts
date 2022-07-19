type IFormType = "input" | "password" | "select" | "datepicker"

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any
  otherOption?: any
}
