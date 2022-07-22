<template>
  <div class="content">
    <mytable :dataList="dataList" :propList="propList" :listCount="dataCount" :title="title" v-model:page="pageInfo">
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="mini">新建用户</el-button>
      </template>

      <!-- 列中插槽 -->
      <template #status="scope">
        <el-button>{{ scope.row.enable ? "启用" : "禁用" }} </el-button>
      </template>
      <template #handle>
        <div class="handle-btns">
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </div>
      </template>
    </mytable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import Mytable from "../../../base-ui/table/index"
import { getPageListData } from "../../../service/main/system/system"
import { useStore } from "../../../store"

export default defineComponent({
  components: {
    Mytable
  },
  props: {
    pageName: {
      type: String,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const store = useStore()

    //绑定page信息
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => {
      getpageData()
    })

    //发送网络请求
    const getpageData = (queryInfo: any = {}) => {
      const newqueryInfo: any = {}
      for (const key in queryInfo) {
        if (queryInfo[key] != "") {
          newqueryInfo[key] = queryInfo[key]
        }
      }
      store.dispatch("system/getPageListAction", {
        pageUrl: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          // ...queryInfo
          ...newqueryInfo
        }
      })
    }
    getpageData()

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    return {
      dataList,
      getpageData,
      dataCount,
      pageInfo
    }
  }
})
</script>
<style lang="less" scoped>
</style>
