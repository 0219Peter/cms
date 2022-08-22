<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <my-form v-bind="modalConfig" v-model="formData"></my-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmClick">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import MyForm from '../../../base-ui/form';

export default defineComponent({
  components: {
    MyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    pageName:{
      type:String,
      required:true
    },
    defaultInfo: {
      type: Object,
      default: () => ({
      })
    }
  },
  setup(props) {
    const formData = ref<any>({})
    const dialogVisible = ref(false)
    const store= useStore()
    //监听编辑按钮的初始化值
    watch(() => props.defaultInfo, (newValue) => {
      for (const item of props.modalConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    })

    //确认按钮后提交数据
   const handleConfirmClick =() => {
     dialogVisible.value = false
     if(Object.keys(props.defaultInfo).length){
      //编辑
      console.log('编辑用户')
      store.dispatch('system/editPageDataAction',{
        pageName:props.pageName,
        editData:{...formData.value},
        id:props.defaultInfo.id
      })
     }else{
      //新建

      store.dispatch('system/createPageDataAction',{
        pageName:props.pageName,
        newData:{...formData.value},
      })
     }


     //
   }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }

})

</script>
<style lang='less' scoped>
</style>