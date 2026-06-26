<template>
  <div class="function-source-container">
    <details>
      <summary class="function-source-summary">函数源码: {{ functionName }}</summary>
      <div class="language-js">
        <pre><code>{{ sourceCode }}</code></pre>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import * as utilsModule from '@sybz-components/utils'
import { ref, watch } from 'vue'

defineOptions({
  name: 'SFunctionSourceCode',
})

// 从父组件接收函数名
interface FunctionSourceCodeProps {
  functionName?: string
}

const props = withDefaults(defineProps<FunctionSourceCodeProps>(), {
  functionName: 'uuid',
})

const sourceCode = ref<string>('')
const utilsRecord = utilsModule as Record<string, unknown>

const stringifyExport = (value: unknown, functionName: string): string | null => {
  if (typeof value === 'function') {
    return value.toString()
  }

  if (value !== undefined) {
    return `export const ${functionName} = ${JSON.stringify(value, null, 2)}`
  }

  return null
}

const loadUtils = (functionName: string) => {
  try {
    const code = stringifyExport(utilsRecord[functionName], functionName)

    if (functionName !== props.functionName) {
      return
    }

    sourceCode.value = code || `// 未能找到函数 "${functionName}" 的源码`
  } catch (error) {
    if (functionName === props.functionName) {
      sourceCode.value = `// 加载函数源码时出错: ${error}`
    }
  }
}

watch(
  () => props.functionName,
  (functionName) => {
    sourceCode.value = ''
    loadUtils(functionName)
  },
  { immediate: true },
)
</script>

<style scoped>
.function-source-container {
  margin: 1rem 0;
  border: 1px solid var(--el-border-color-light);
  border-radius: 5px;
}
.function-source-summary {
  padding: 10px 15px;
  background-color: var(--el-fill-color-lighter);
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
}
.language-js {
  margin: 0;
  border-radius: 0 0 5px 5px;
}
</style>
