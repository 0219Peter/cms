<template>
  <div class="user">
    <page-search :formItems="formItems"  @resetBtnClick="handleResetClick" @queryBtnClick="handleQueryClick"></page-search>
    <page-content ref="pageContentRef" :propList="propList" :title="title" :pageName="'users'"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import MyForm, { IFormItem } from '../../../../base-ui/form/index'
import PageSearch from '../../../../components/page-search/index'
import PageContent from '../../../../components/page-content/src/page-content.vue'

import { usePageSearch } from '../../../../hooks/use-page-search'

export default defineComponent({
  components: {
    PageSearch,
    PageContent
},
  name: 'user',
  setup() {
    const title = '用户列表'
    const [pageContentRef,handleResetClick,handleQueryClick] = usePageSearch()

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100', slotname: 'name' },
      { prop: 'realname', label: '姓名', minWidth: '100', slotname: 'realname' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100', slotname: 'cellphone' },
      { prop: 'enable', label: '状态', minWidth: '100', slotname: 'status' },
      { prop: 'createAt', label: '创建时间', minWidth: '100', slotname: 'createAt' },
      { prop: 'updateAt', label: '更新时间', minWidth: '100', slotname: 'updateAt' },
      { label: '操作', minWidth: '120', slotname: 'handle' },
    ]




    const formItems: IFormItem[] = [
      {
        field: 'id',
        type: 'input',
        label: 'id',
        placeholder: '请输入id'
      },
      {
        field: 'name',
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      },
      {
        field: 'realname',
        type: 'input',
        label: '真实姓名',
        placeholder: '请输入真实姓名'
      },
      {
        field: 'cellphone',
        type: 'input',
        label: '电话号码',
        placeholder: '请输入电话号码'
      },
      {
        field: 'enable',
        type: 'select',
        label: '用户状态',
        placeholder: '请选择用户状态',
        options: [
          { title: '启用', value: 1 },
          { title: '禁用', value: 0 }
        ]
      },
      {
        field: 'createTime',
        type: 'datepicker',
        label: '创建时间',
        placeholder: '请选择创建时间',
        otherOption: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      },
    ]


    return {
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      formItems,
      propList,
      title
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
