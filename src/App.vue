
<template>
  <keep-alive>
    <el-config-provider :locale="zhCn">
        <router-view/>
    </el-config-provider>

  </keep-alive>
</template>


<script lang="ts" setup>
  // import { defineComponent } from 'vue'

  // export default defineComponent({
  //     name: 'App',
  //     props: {
  //       name: {
  //         type: String
  //       }
  //     }
  //   })
</script>



<style>


</style>
