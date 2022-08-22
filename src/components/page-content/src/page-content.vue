<template>
  <div class="content">
    <mytable :dataList="dataList" :propList="propList" :listCount="dataCount" :title="title" v-model:page="pageInfo"
      :childrenProps="childrenProps">
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="mini" v-if="isCreate" @click="handleNewClick()">新建用户</el-button>
      </template>

      <!-- 列中插槽 -->
      <template #status="scope">
        <el-button>{{ scope.row.enable ? "启用" : "禁用" }} </el-button>
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button size="mini" type="text" v-if="isUpdate" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" v-if="isDelete" @click="handleDeleteClick">删除</el-button>
        </div>
      </template>
      <template v-for="item in otherSlot" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </mytable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import Mytable from "../../../base-ui/table/index"
import { usePermission } from "../../../hooks/use-permission"
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
    },
    childrenProps: {
      type: Object,
      default: () => ({
      })
    },

  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    //获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isquery = usePermission(props.pageName, 'query')


    //绑定page信息
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => {
      getpageData()
    })

    //发送网络请求
    const getpageData = (queryInfo: any = {}) => {
      if (!isquery) return
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

    //获取其他动态插槽
    const otherSlot = props.propList?.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'handle') return false
      return true
    })


    //删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletPageDataAtcion', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      getpageData,
      dataCount,
      pageInfo,
      otherSlot,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>
<style lang="less" scoped>
</style>
