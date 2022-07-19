<template>
  <div class="search">
    <my-form :formItems="formItems" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary">重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </my-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import MyForm from '../../../base-ui/form/index'

export default defineComponent({
  props: {
    formItems: {
      type: Object,
      required: true
    }
  },
  components: {
    MyForm,

  },
  name: 'user',
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: '',
    })
    return {
      formData
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
