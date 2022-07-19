<template>
  <el-table :data="userList" style="width: 100%" border>
    <template v-for="propItem in propList" :key="propItem.prop">
      <el-table-column v-bind="propItem" align="center">
        <template #default="scope">
          <slot :name="propItem.slotname">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    userList: {
      type: Object,
      default: () => { },
      required: true
    },
    propList: {
      type: Array,
      default: [],
      required: true
    }
  },
  setup() {
    return {}
  }

})

</script>
<style lang='less' scoped>
</style>