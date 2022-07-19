<template>
  <div class="nav-header">

    <el-icon class="fold" :class="isFold">
      <DArrowLeft @click="handleFoldClickleft" />
      <DArrowRight @click="handleFoldClickright" />
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <UserInfo></UserInfo>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserInfo from './user-info.vue';
export default defineComponent({
  components: {
    UserInfo
  },
  emits: ['foldchange'],
  setup(props, ctx) {
    const isFold = ref(false)
    const handleFoldClickleft = () => {
      isFold.value = true
      ctx.emit('foldchange', isFold.value)
    }
    const handleFoldClickright = () => {
      isFold.value = false
      ctx.emit('foldchange', isFold.value)
    }
    return {
      isFold,
      handleFoldClickleft,
      handleFoldClickright,
    }
  }

})

</script>
<style lang='less' scoped>
.nav-header {
  display: flex;
  width: 100%;

}

.fold {
  font-size: 30px;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>