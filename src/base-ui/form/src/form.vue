<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form label-width="100px">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="8">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input' || item.type == 'password'">
                <el-input :placeholder="item.placeholder" v-model="formData[`${item.field}`]"></el-input>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select :placeholder="item.placeholder" v-model="formData[`${item.field}`]">
                  <el-option v-for="option in item.options" :value="option.value" :key="option.value"  >{{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker v-bind="item.otherOption" v-model="formData[`${item.field}`]"></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { emit } from 'process';
import { defineComponent, PropType,computed ,ref,watch} from 'vue';
import { IFormItem } from '../type/index'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    modelValue:{
      type:Object,
      require:true
    },

    collLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits:['update:modelValue'],
  setup(props,{emit}) {
    const formData = ref({...props.modelValue})
    watch(formData,(newValue) => emit('update:modelValue',newValue),{
      deep:true  //深监听
    })


    return {
      formData
    }
  }

})

</script>
<style lang='less' scoped>

</style>