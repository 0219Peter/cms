<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon>
              <CircleCloseFilled />
            </el-icon>退出登录
          </el-dropdown-item>

          <el-dropdown-item divided>
            <el-icon>
              <UserFilled />
            </el-icon>用户信息
          </el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from '../../../store/index'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userinfo.name)
    return {
      name
    }
  }

})

</script>
<style lang='less' scoped>
</style>