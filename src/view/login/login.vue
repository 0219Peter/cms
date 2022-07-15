<template>
  <div class="login">
   <loginpanel></loginpanel>
  </div>

</template>


<script lang="ts">
  import {defineComponent} from 'vue';
  import loginpanel from './cpns/login-panel.vue'

  export default defineComponent({
    components: {
      loginpanel
    },
     setup(){

     }
  })


</script>

<style>
   .login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   }
</style>