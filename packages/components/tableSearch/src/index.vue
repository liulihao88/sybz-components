<template>
  <div class="g-table-search" :style="{ '--g-table-search-columns': mergedProps.column }">
    <el-form
      :model="form"
      class="g-table-search__form"
      label-suffix=":"
      @submit.prevent
      @keyup.enter.prevent="handleSearch"
    >
      <div class="g-table-search__grid">
        <el-form-item v-for="(item, index) in fields" :key="item.prop || index" :prop="item.prop">
          <slot v-if="$slots[`field-${item.prop}`]" :name="`field-${item.prop}`" :item="item" :model="form" />
          <component
            :is="item.render"
            v-else-if="item.render"
            :item="item"
            :model="form"
            :value="form[item.prop]"
            :update="(value: unknown) => updateField(item.prop, value)"
          />
          <component
            :is="item.comp || 's-input'"
            v-else
            v-model="form[item.prop]"
            v-bind="item.attrs"
            :placeholder="item.attrs?.placeholder || getPlaceholder(item)"
            :title="item.label"
            class="g-table-search__field"
            @update:model-value="emitModelValue"
            @change="handleFieldEvent(item, 'change', $event)"
            @clear="handleFieldEvent(item, 'clear', $event)"
          />
        </el-form-item>
      </div>
    </el-form>

    <div class="g-table-search__actions">
      <div v-if="$slots.actions || $slots.default" class="g-table-search__extra">
        <slot name="actions"><slot /></slot>
      </div>
      <s-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</s-button>
      <s-button v-if="mergedProps.showReset" icon="el-icon-refresh" @click="handleReset">重置</s-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type {
  GTableSearchEmits,
  GTableSearchEvent,
  GTableSearchField,
  GTableSearchModel,
  GTableSearchProps,
} from './types'

defineOptions({ name: 'GTableSearch' })

const props = withDefaults(defineProps<GTableSearchProps>(), {
  options: () => [],
  items: undefined,
  column: 3,
  modelValue: undefined,
  initialValue: () => ({}),
  searchOn: undefined,
  showReset: true,
})
const emit = defineEmits<GTableSearchEmits>()
const mergedProps = useGlobalComponentConfig('gTableSearch', props)

const form = ref<GTableSearchModel>({ ...props.initialValue, ...props.modelValue })
const fields = computed(() => mergedProps.value.items ?? mergedProps.value.options ?? [])

watch(
  () => props.modelValue,
  (value) => {
    if (value) form.value = { ...value }
  },
  { deep: true },
)

const emitModelValue = () => emit('update:modelValue', { ...form.value })

const updateField = (prop: string, value: unknown) => {
  form.value[prop] = value
  emitModelValue()
}

let searchPending = false
const scheduleSearch = () => {
  if (searchPending) return
  searchPending = true
  queueMicrotask(() => {
    searchPending = false
    handleSearch()
  })
}

const getPlaceholder = (item: GTableSearchField) => `${item.comp === 's-select' ? '请选择' : '请输入'}${item.label}`

const getDefaultSearchEvents = (item: GTableSearchField): GTableSearchEvent[] =>
  item.comp === 's-select' ? ['change', 'clear'] : ['clear']

const handleFieldEvent = (item: GTableSearchField, event: GTableSearchEvent, value: unknown) => {
  item.on?.[event]?.(value, form.value)
  const searchOn = item.searchOn ?? mergedProps.value.searchOn ?? getDefaultSearchEvents(item)
  if (searchOn !== false && searchOn.includes(event)) scheduleSearch()
}

const handleSearch = () => emit('search', { ...form.value })

const handleReset = () => {
  form.value = { ...(mergedProps.value.initialValue ?? {}) }
  emitModelValue()
  emit('reset', { ...form.value })
}
</script>

<style scoped lang="scss">
.g-table-search {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  container-type: inline-size;
}

.g-table-search__form,
.g-table-search__grid,
.g-table-search__field {
  width: 100%;
  min-width: 0;
}

.g-table-search__grid {
  display: grid;
  grid-template-columns: repeat(var(--g-table-search-columns), minmax(0, 1fr));
  gap: 16px;
}

.g-table-search__actions,
.g-table-search__extra {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.g-table-search__actions {
  justify-content: flex-end;
  margin-top: 16px;
}

.g-table-search__extra {
  margin-right: auto;
}

.g-table-search :deep(.el-form-item) {
  min-width: 0;
  margin-bottom: 0;
}

.g-table-search :deep(.el-form-item__content) {
  width: 100%;
  min-width: 0;
}

@container (max-width: 900px) {
  .g-table-search__grid {
    grid-template-columns: 1fr;
  }

  .g-table-search__actions {
    justify-content: flex-start;
  }
}
</style>
