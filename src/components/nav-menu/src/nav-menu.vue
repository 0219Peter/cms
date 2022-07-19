<template>
  <div class="nav-menu">
    <div class="logo">
      <span>Vue3+ts</span>
    </div>

    <el-menu active-text-color="#FFFF00" background-color="#545c95" class="el-menu-vertical-demo" :default-active="defaultValue"
      :collapse="collapse">

      <template v-for="item in userMenus" :key="item.id">

        <!-- 二级菜单 -->
        <template v-if="item.type == 1">
          <el-sub-menu :index="item.id + ''" class="el-submen">
            <template #title>
              <i v-if="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.key">
              <el-menu-item :index="subitem.id + ''" class="el-menu-item " @click="handleMenuItemClick(subitem)">
                <i v-if="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>

        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i>
            </i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed ,ref} from 'vue';
import { useStore } from '../../../store/index';
import { useRouter ,useRoute } from 'vue-router';
import {pathMapToMenu} from '../../../utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const userMenus = computed(() => {
      return store.state.login.userMenus

    });

    const route= useRoute()
    const currentPath = route.path

    const menu = pathMapToMenu(userMenus.value,currentPath)
    console.log(menu)
    const defaultValue = ref(menu.id + '')

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? 'not-found'
      })
    }
    return { userMenus, handleMenuItemClick ,defaultValue}
  }

})

</script>
<style lang='less' scoped>
.nav-menu {
  height: 100%;
  background-color: white;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

}


.el-menu-vertical-demo {
  border-right: none;
}


.el-submenu {
  background-color: #001529 !important;
}


.el-menu-item {
  padding-left: 50px !important;
  background-color: #888800 !important;
}



::v-deep .el-submenu__title {
  background-color: #001529 !important;
}

/* // hover 高亮 */
.el-menu-item:hover {
  color: #fff !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #BBBB00 !important;
}


.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>