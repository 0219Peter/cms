<template>
  <div class="search">
    <my-form :formItems="formItems" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MyForm from '../../../base-ui/form/index'

export default defineComponent({
  props: {
    formItems: {
      type: Object,
      required: true
    },
    formData:{
      type: Object,
      require:true
    }
  },
  components: {
    MyForm,

  },
  name: 'user',
  emits:['resetBtnClick','queryBtnClick'],
  setup(props,{emit}) {

     //双向绑定的属性
     const formItems = props.formItems  ?? []
     const formOriginData: any={}
    for(const item of formItems){
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //重置操作
    const handleResetClick = () => {
        // formData.value = formOriginData
       for(const key in formOriginData)
        formData.value[`${key}`] = formOriginData[key]
        emit('resetBtnClick')
    }
    //搜索功能
    const handleSearchClick = () => {
      emit('queryBtnClick',formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleSearchClick
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
