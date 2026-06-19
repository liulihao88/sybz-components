<script setup lang="ts">
import { computed } from 'vue'
import address from './pca-code.json'
import { processWidth } from '@sybz-components/utils'

defineOptions({
  name: 'SChooseArea',
})
const props = defineProps({
  width: {
    type: [String, Number],
    default: '',
  },
  height: {
    type: [String, Number],
    default: '',
  },
})
function handleCascaderChange(value) {}
const optionsProps = {
  label: 'name',
  value: 'code',
  expandTrigger: 'hover',
}

const chooseAreaStyle = computed(() => {
  const style: Record<string, any> = {
    ...processWidth(props.width),
  }

  if (props.height) {
    const chooseAreaHeight = processWidth(props.height, true)
    style.height = chooseAreaHeight
    style['--s-choose-area-height'] = chooseAreaHeight
    style['--el-input-height'] = chooseAreaHeight
  }

  return style
})
</script>

<template>
  <div>
    <el-cascader
      :options="address"
      :style="chooseAreaStyle"
      @change="handleCascaderChange"
      placeholder="请选择省市区"
      :props="optionsProps"
      v-bind="$attrs"
    ></el-cascader>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-cascader) {
  min-height: var(--s-choose-area-height, var(--el-input-height, 32px));
}

:deep(.el-cascader .el-input),
:deep(.el-cascader .el-input__wrapper) {
  height: 100%;
  min-height: var(--s-choose-area-height, var(--el-input-height, 32px));
}
</style>
