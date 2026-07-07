<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <SafeHtml class="demo-description" text="sm" :html="descriptionWithCopy" @click="handleDescriptionClick" />
    <div class="example">
      <Example :path="path" />
      <ElDivider class="m-0" />
      <div class="op-btns">
        <ElTooltip v-if="isDev" content="跳转页面" :show-arrow="false" :teleported="false">
          <ElIcon :size="16" class="op-btn" @click="jumpPath">
            <el-icon-promotion />
            <!-- <o-icon name="promotion"></o-icon> -->
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="复制代码" :show-arrow="false" :teleported="false">
          <ElIcon :size="16" class="op-btn" @click="copyCode">
            <el-icon-copy-document />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="查看源代码" :show-arrow="false" :teleported="false">
          <ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">
            <el-icon-view />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import { getStorage } from '@sybz-components/utils'
import SafeHtml from '@/components/utils/SafeHtml.vue'

import Example from './vp-example.vue'
import SourceCode from './vp-source-code.vue'
import { buildVscodeFileUrl, getSourceDir, joinLocalPath } from '../../../theme/utils/localFile'
const isDev = ref(import.meta.env.DEV)

const props = defineProps<{
  rawSource: string // 源码
  source: string
  path: string
  description?: string
}>()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const sourceVisible = ref(true)
onMounted(() => {
  sourceVisible.value = !!getStorage('codeVisible')
})

const toggleSourceVisible = (isOpen?: boolean) => {
  if (isOpen === false) {
    sourceVisible.value = isOpen
  } else {
    sourceVisible.value = !sourceVisible.value
  }
}

const decodedDescription = computed(() => decodeURIComponent(props.description!))
const descriptionWithCopy = computed(() => {
  return decodedDescription.value.replace(
    /((?:基础写法|基础用法)：\s*<code>[\s\S]*?<\/code>)/,
    '$1<button class="demo-description__copy" type="button" data-demo-basic-copy>复制</button>',
  )
})

const copyCode = async () => {
  if (!isSupported) {
    ElMessage.error('复制失败')
  }
  try {
    await copy()
    ElMessage.success('已复制')
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}

const copyBasicUsage = async (code: string) => {
  if (!isSupported) {
    ElMessage.error('复制失败')
  }
  try {
    await copy(code)
    ElMessage.success('已复制基础写法')
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}

const handleDescriptionClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const button = target.closest<HTMLButtonElement>('[data-demo-basic-copy]')
  if (!button) return

  const code =
    button.previousElementSibling?.tagName.toLowerCase() === 'code' ? button.previousElementSibling.textContent : ''

  if (!code) {
    ElMessage.warning('未找到可复制的基础写法')
    return
  }

  copyBasicUsage(code)
}

const jumpPath = async () => {
  const sourceDir = getSourceDir()

  if (!sourceDir) {
    ElMessage.warning('请在根目录先配置 VITE_SOURCE_DIR 环境变量，例如 VITE_SOURCE_DIR=/path/to/sybz-components')
    return
  }

  const fullPath = joinLocalPath(sourceDir, 'docs/components', `${props.path}.vue`)
  window.open(buildVscodeFileUrl(fullPath), '_blank')
}
</script>
<style lang="scss" scoped>
.demo-description {
  margin: 1em 0;
  line-height: 1.7;

  :deep(p) {
    margin: 0;
  }

  :deep(.demo-description__copy) {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 8px;
    margin-left: 8px;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    background: var(--el-fill-color-blank);
    color: var(--el-text-color-regular);
    cursor: pointer;
    font-size: 12px;
    line-height: 20px;
    vertical-align: 1px;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
}

.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
  .m-0 {
    margin: 0;
  }
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
