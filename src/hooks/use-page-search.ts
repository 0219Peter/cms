import { ref } from "vue"
import pageContent from "../components/page-content"

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getpageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getpageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
