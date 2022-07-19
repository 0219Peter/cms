<template>
  <div class="user">
    <page-search :formItems="formItems"></page-search>
    <div class="content">
      <mytable :data="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }} </el-button>
        </template>
      </mytable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import MyForm, { IFormItem } from '../../../../base-ui/form/index'
import PageSearch from '../../../../components/page-search/index'
import { useStore } from 'vuex'
import Mytable from '../../../../base-ui/table/index'

export default defineComponent({
  components: {
    PageSearch,
    Mytable
  },
  name: 'user',
  setup() {
    const store = useStore()
    store.dispatch("system/getPageListAction", {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100', slotname: 'name' },
      { prop: 'realname', label: '姓名', minWidth: '100', slotname: 'realname' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100', slotname: 'cellphone' },
      { prop: 'enable', label: '状态', minWidth: '100', slotname: 'status' },
      { prop: 'createAt', label: '创建时间', minWidth: '100', slotname: 'createAt' },
      { prop: 'updateAt', label: '更新时间', minWidth: '100', slotname: 'updateAt' },
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
        field: 'password',
        type: 'password',
        label: '密码',
        placeholder: '请输入密码'
      },
      {
        field: 'sport',
        type: 'select',
        label: '喜欢的运动',
        placeholder: '请选择喜欢的运动',
        options: [
          { title: '篮球', value: 'basketball' },
          { title: '足球', value: 'football' }
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
      formItems,
      propList,
      userList
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
