<template>
  <div class="header">
    <slot name="header">
      <div class="title">
        {{ title }}
        <slot name="headerHandler"></slot>
      </div>
    </slot>
  </div>
  <el-table :data="dataList" style="width: 100%" border>
    <template v-for="propItem in propList" :key="propItem.prop">
      <el-table-column v-bind="propItem" align="center">
        <template #default="scope">
          <slot :name="propItem.slotname" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="footer">
    <slot name="footer">
      <el-pagination v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize"
        :page-sizes="[10, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
        layout="total, sizes, prev, pager, next, jumper" :total="listCount" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    listCount: {
      type: Number,
      default: 0
    },
    dataList: {
      type: Object,
      default: () => { },
      require: true
    },
    propList: {
      type: Array,
      default: [],
      require: true
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        currentSize: 10
      })
    }
  },
  emits: ["update:page"],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: any) => {
      emit("update:page", { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage })
    }

    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>