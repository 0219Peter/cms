<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统
    </h1>
      <el-tabs type="border-card" stretch v-model="currentType">
        <el-tab-pane label="账号登录" name="account">
          <loginAccount ref="accountRef"></loginAccount>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <loginPhone ref="phoneRef">
        </loginPhone></el-tab-pane>
      </el-tabs>
      <div class="login-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>

      </div>
      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
  import {defineComponent  , ref} from 'vue';
  import loginAccount from  './login-account.vue'
  import loginPhone from  './login-phone.vue'
  export default defineComponent({
  components:{
    loginAccount,
    loginPhone
  },
  setup(){
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()

    const currentType = ref<string>('account')

    const handleLoginClick =() => {
      if(currentType.value == 'account'){
        accountRef.value?.loginAction(isKeepPassword.value)
       console.log(1)
      }else{

      }

    }

  return {
    isKeepPassword,
    handleLoginClick,
    currentType,
    accountRef,
    phoneRef
  }
 }
})

</script>
<style lang='less' scoped>
   .login-panel{
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 320px;
   }
   .title{
      text-align: center;
     }
  .login-control{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn{
    width:100%;
    margin-top: 10px;
  }
</style>