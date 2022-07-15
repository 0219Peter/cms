<template>
  <div class="nav-header">

    <el-icon class="fold" :class="isFold">
      <DArrowLeft @click="handleFoldClickleft" />
      <DArrowRight @click="handleFoldClickright" />
    </el-icon>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
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
.nav-header {}

.fold {
  font-size: 30px;
  cursor: pointer;

}
</style>