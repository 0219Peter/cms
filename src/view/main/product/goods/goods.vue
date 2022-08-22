<template>
  <div class="user">
    <page-content  :propList="propList" :pageName="'goods'">
    <template #image="scope">
      <el-image style="width:100px; height:100px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]">
      </el-image>
    </template>
  </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import MyForm, { IFormItem } from '../../../../base-ui/form/index'
import PageSearch from '../../../../components/page-search/index'
import PageContent from '../../../../components/page-content/src/page-content.vue'

import { usePageSearch } from '../../../../hooks/use-page-search'

export default defineComponent({
  components: {
    PageSearch,
    PageContent
},
  setup() {

    const propList = [
      { prop: 'name', label: '商品名称', minWidth: '80'},
      { prop: 'oldPrice', label: '原价格', minWidth: '80' },
      { prop: 'newPrice', label: '现价格', minWidth: '80' },
      { prop: 'imgUrl', label: '商品图片', minWidth: '100',slotName:'image'},
      { prop: 'status', label: '状态', minWidth: '100',slotName:'status'},
      { prop: 'createAt', label: '创建  时间', minWidth: '80' },
      { prop: 'updateAt', label: '更新时间', minWidth: '80' },
    ]



    return {
      propList,
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
