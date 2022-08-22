<template>
  <div class="menu">
    <PageContent :title="title" :propList="propList" :pageName="'menu'" :childrenProps="childrenProps"></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '../../../../components/page-content/src/page-content.vue'

export default defineComponent({
    name: "Mymenu",
    setup() {
        const title='菜单列表'
        const propList = [
            { prop: "name", label: "菜单名称", minWidth: "100" },
            { prop: "type", label: "类型", minWidth: "60" },
            { prop: "url", label: "菜单url", minWidth: "100" },
            { prop: "enable", label: "状态", minWidth: "100" },
            { prop: "icon", label: "菜单icon", minWidth: "100" },
            { prop: "permission", label: "按钮权限", minWidth: "100" },
            { prop: "createAt", label: "创建时间", minWidth: "220" },
            { prop: "updateAt", label: "更新时间", minWidth: "220" },
            { label: "操作", minWidth: "120", slotname: "handle" },
        ];
        const childrenProps={
            rowKey:'id',
            treeProp:{
              children:'children'
            }
        }
        return {
          title,
          propList,
          childrenProps
        };
    },
    components: { PageContent }
})
</script>

<style scoped></style>
