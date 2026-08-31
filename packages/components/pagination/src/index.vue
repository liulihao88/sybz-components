<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import type { StyleValue } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { SPaginationEmits, SPaginationSelfProps } from '@/types/component-props'

defineOptions({
  name: 'SPagination',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SPaginationSelfProps>(), {
  currentPage: 1,
  total: 0,
  pageSize: 10,
  pagerCount: 7,
  theme: 'default',
  background: true,
  disabled: false,
  showTotal: true,
  showJumper: true,
  showOnSinglePage: false,
  totalText: '共',
  jumpText: '前往',
  pageText: '页',
  size: 'default',
})
const emit = defineEmits<SPaginationEmits>()
const attrs = useAttrs()
const mergedProps = useGlobalComponentConfig('pagination', props)
const rootStyle = computed(() => attrs.style as StyleValue)

const resolvedPageCount = computed(() => {
  if (mergedProps.value.total <= 0) return 0
  return Math.ceil(mergedProps.value.total / Math.max(mergedProps.value.pageSize, 1))
})

const normalizePage = (value: unknown) => {
  const numericPage = Number(value)
  const page = Number.isFinite(numericPage) ? Math.floor(numericPage) : 1
  return Math.min(Math.max(page, 1), Math.max(resolvedPageCount.value, 1))
}

const activePage = ref(normalizePage(props.currentPage))
const jumpPage = ref(activePage.value)
const visible = computed(
  () => mergedProps.value.showOnSinglePage || resolvedPageCount.value > 1 || mergedProps.value.total > 0,
)
const paginationAttrs = computed(() => {
  const paginationAttrs = { ...attrs }
  delete paginationAttrs.class
  delete paginationAttrs.style
  delete paginationAttrs.pageCount
  delete paginationAttrs['page-count']
  return paginationAttrs
})

watch(
  () => mergedProps.value.currentPage,
  (page) => {
    activePage.value = normalizePage(page)
    jumpPage.value = activePage.value
  },
)

watch(resolvedPageCount, () => {
  const page = normalizePage(activePage.value)
  activePage.value = page
  jumpPage.value = page
})

const changePage = (page: number) => {
  const normalizedPage = normalizePage(page)
  activePage.value = normalizedPage
  jumpPage.value = normalizedPage
  emit('update:currentPage', normalizedPage)
  emit('change', normalizedPage)
}

const handleJump = () => {
  if (mergedProps.value.disabled) return
  const page = normalizePage(jumpPage.value)
  changePage(page)
  emit('jump', page)
}

const handlePrevClick = (page: number) => emit('prev-click', page)
const handleNextClick = (page: number) => emit('next-click', page)
</script>

<template>
  <div
    v-if="visible"
    class="s-pagination"
    :class="[$attrs.class, `s-pagination--${mergedProps.theme}`]"
    :style="rootStyle"
  >
    <div class="s-pagination__scroll">
      <div class="s-pagination__content">
        <span v-if="mergedProps.showTotal && mergedProps.total > 0" class="s-pagination__total">
          <span>{{ mergedProps.totalText }}</span>
          <span class="s-pagination__total-value">{{ mergedProps.total }}</span>
          <span>条</span>
        </span>

        <el-pagination
          v-if="resolvedPageCount > 1"
          v-bind="paginationAttrs"
          :background="mergedProps.background"
          :current-page="activePage"
          :disabled="mergedProps.disabled"
          :page-count="resolvedPageCount"
          :page-size="mergedProps.pageSize"
          :pager-count="mergedProps.pagerCount"
          :size="mergedProps.size || undefined"
          layout="prev, pager, next"
          @current-change="changePage"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
        />

        <div v-if="mergedProps.showJumper && resolvedPageCount > 1" class="s-pagination__jumper">
          <span>{{ mergedProps.jumpText }}</span>
          <s-input-number
            v-model="jumpPage"
            :controls="false"
            :disabled="mergedProps.disabled"
            :max="resolvedPageCount"
            :min="1"
            :precision="0"
            :theme="mergedProps.theme"
            :size="mergedProps.size"
            width="64"
            @keyup.enter.stop="handleJump"
          />
          <span>{{ mergedProps.pageText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.s-pagination {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.s-pagination__scroll {
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
}

.s-pagination__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: max-content;
  min-width: 100%;
  padding-bottom: 4px;
  white-space: nowrap;
}

.s-pagination__total,
.s-pagination__jumper {
  color: var(--el-text-color-regular);
  font-size: 13px;
}

.s-pagination__total {
  display: inline-flex;
  align-items: center;
}

.s-pagination__total-value {
  margin: 0 4px;
  font-weight: 900;
}

.s-pagination__jumper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.s-pagination__jumper :deep(.s-input-number) {
  flex: 0 0 64px;
}
</style>
