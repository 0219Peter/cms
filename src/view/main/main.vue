<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <navMenu :collapse="isCollapse"></navMenu>
      </el-aside>
      <el-container>
        <el-header class="page-header">
          <navHeader @foldchange="handleFoldChange"></navHeader>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
             <router-view> </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import navMenu from '../../components/nav-menu/index'
import navHeader from '../../components/nav-header/index'

export default defineComponent({
  components: {
    navMenu,
    navHeader
  },
  setup() {
    const isCollapse = ref(false)

    const handleFoldChange = (isFold) => {
      isCollapse.value = isFold
    }

    return {
      handleFoldChange,
      isCollapse
    }
  }

})

</script>
<style lang='less' scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.page-info{
  background-color: #fff;
  border-radius: 5px;
}
.main-content {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.page-info {
  background-color: #fff;
  border-radius: 5px;
}


.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */

  /* &::-webkit-scrollbar {
    display: none;
  } */
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>