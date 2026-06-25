<script setup lang="ts">
import { computed } from 'vue'
import * as sybzUtils from '@sybz-components/utils'

defineOptions({
  name: 'SBuildTime',
})

declare const __SYBZ_COMPONENTS_BUILD_TIME__: string | undefined

interface BuildTimeProps {
  componentsLabel?: string
  utilsLabel?: string
  emptyText?: string
  inline?: boolean
}

type UtilsBuildTimeModule = typeof sybzUtils & {
  getUtilsBuildTime?: (fallback?: string) => string
  test?: () => string
}

const props = withDefaults(defineProps<BuildTimeProps>(), {
  componentsLabel: 'sybz-components',
  utilsLabel: '@sybz-components/utils',
  emptyText: '未注入',
  inline: false,
})

const normalizeBuildTime = (value: unknown) => {
  if (typeof value === 'string' && value) {
    return value.replace(/^build time:\s*/i, '')
  }

  return props.emptyText
}

const getComponentsBuildTime = () => {
  if (typeof __SYBZ_COMPONENTS_BUILD_TIME__ === 'string' && __SYBZ_COMPONENTS_BUILD_TIME__) {
    return __SYBZ_COMPONENTS_BUILD_TIME__
  }

  return props.emptyText
}

const getUtilsBuildTime = () => {
  const utils = sybzUtils as UtilsBuildTimeModule

  if (typeof utils.getUtilsBuildTime === 'function') {
    return normalizeBuildTime(utils.getUtilsBuildTime(props.emptyText))
  }

  if (typeof utils.test === 'function') {
    return normalizeBuildTime(utils.test())
  }

  return props.emptyText
}

const buildTimes = computed(() => [
  {
    label: props.componentsLabel,
    value: getComponentsBuildTime(),
  },
  {
    label: props.utilsLabel,
    value: getUtilsBuildTime(),
  },
])
</script>

<template>
  <div class="s-build-time" :class="{ 'is-inline': inline }">
    <div v-for="item in buildTimes" :key="item.label" class="s-build-time__item">
      <span class="s-build-time__label">{{ item.label }}</span>
      <span class="s-build-time__value">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.s-build-time {
  display: inline-grid;
  min-width: min(360px, 100%);
  gap: 8px;
  padding: 12px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  line-height: 1.5;
  background-color: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
}

.s-build-time.is-inline {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.s-build-time__item {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 12px;
  align-items: center;
}

.s-build-time.is-inline .s-build-time__item {
  grid-template-columns: 1fr;
  gap: 4px;
}

.s-build-time__label {
  color: var(--el-text-color-regular);
  white-space: nowrap;
}

.s-build-time__value {
  min-width: 0;
  color: var(--el-text-color-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .s-build-time,
  .s-build-time.is-inline {
    width: 100%;
    grid-template-columns: 1fr;
  }

  .s-build-time__item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
