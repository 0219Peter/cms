<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
       <el-input v-model="account.name"/>
      </el-form-item  >
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">

  import {defineComponent,reactive,ref} from 'vue';
  import {ElForm} from 'element-plus';
  import localCache from '../../../utils/cache'
  import { useStore } from 'vuex';
  export default defineComponent({
  setup(){
   const account = reactive({
    name:localCache.getCache('name') ?? '',
    password:localCache.getCache('password') ?? ''
   })

   const store = useStore()

  const formRef = ref<InstanceType<typeof ElForm>>()
   //规则
    const rules = {
    name:[{
      required:true,
      message:'用户名必须输入',
      trigger:'blur'
    },{
      pattern:/^[a-z0-9]{5,10}$/,
      message:'五到十个字母或者数字',
      trigger: 'blur'
    }],
    password:[
      {
        required:true,
        message:'密码必须输入',
        trigger:'blur'
      },
      {
        pattern:/^[a-z0-9]{5,10}$/,
        message:'五到十个字母或者数字',
        trigger:'blur'
      }
    ]
   }

   const loginAction =(isKeepPassword:boolean) => {
     console.log('account')
     formRef.value?.validate((valid) => {
      if(valid){
       //判断是否需要密码
        if(isKeepPassword){
          //本地缓存
          localCache.setCache('name',account.name)
          localCache.setCache('password',account.password)

        }else{
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }
       //开始登录验证
       store.dispatch('login/accountLoginAction',{...account})
      }
     })
   }

  return {
    account,
    rules,
    loginAction,
    formRef
  }
 }

})

</script>
<style lang='less' scoped>
</style>