<template>
  <div class="user">
    <page-search :formItems="formItems" ></page-search>
    <page-content :propList="propList" :title="title" :pageName="'role'"
    @newBtnClick="handleNewClick" @editBtnClick="handleEditClick"></page-content>
    <page-modal ref="pageModalRef" :modalConfig="modalConfig" :pageName="'role'" :defaultInfo="defaultInfo"></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import MyForm, { IForm, IFormItem } from '../../../../base-ui/form/index'
import PageSearch from '../../../../components/page-search/index'
import { useStore } from 'vuex'
import PageContent from '../../../../components/page-content/src/page-content.vue'
import PageModal from '../../../../components/page-modal/page-modal/page-modal.vue'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
},
  name: 'user',
  setup() {
    const title = '权限控制'



    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100', slotname: 'name' },
      { prop: 'role', label: '权限控制', minWidth: '100', slotname: 'role' },
      { prop: 'createAt', label: '创建时间', minWidth: '100', slotname: 'createAt' },
      { prop: 'updateAt', label: '更新时间', minWidth: '100', slotname: 'updateAt' },
      { label: '操作', minWidth: '120', slotname: 'handle' },
    ]




    const formItems: IFormItem[] = [
      {
        field: 'id',
        type: 'input',
        label: '角色名称',
        placeholder: '请输入角色'
      },
      {
        field: 'name',
        type: 'input',
        label: '权限介绍',
        placeholder: '请输入'
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

    //对话框

    const modalConfig: IForm = {
      formItems: [
        {
          field: 'name',
          type: 'input',
          label: '用户名',
          placeholder: '请输入用户名'
        },
        {
          field: 'intro',
          type: 'input',
          label: '角色介绍',
          placeholder: '请输入角色介绍'
        },
      ],
      collLayout: { span: 24 }
    }



    const pageModalRef = ref<InstanceType<typeof PageModal>>()
    const defaultInfo = ref({})
    const handleNewClick = () => {
      defaultInfo.value = {}
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
    }

    const handleEditClick = (item: any) => {
      defaultInfo.value = { ...item }
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
    }
    return {
      formItems,
      propList,
      title,
      modalConfig,
      handleEditClick,
      handleNewClick,
      defaultInfo,
      pageModalRef
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
