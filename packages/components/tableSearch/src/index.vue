<template>
  <div
    class="s-table-search"
    :class="[`s-table-search--${mergedProps.theme}`, { 's-table-search--with-actions': hasExtraActions }]"
    :style="{ '--s-table-search-columns': mergedProps.column }"
  >
    <div class="s-table-search__layout">
      <el-form
        :model="form"
        class="s-table-search__form"
        label-suffix=":"
        @submit.prevent
        @keyup.enter.prevent="handleSearch"
      >
        <div class="s-table-search__grid">
          <el-form-item v-for="(item, index) in fields" :key="item.prop || index" :prop="item.prop">
            <slot
              v-if="getFieldSlotName(item)"
              :name="getFieldSlotName(item)"
              :item="item"
              :model="form"
              :value="form[item.prop]"
              :theme="getFieldTheme(item)"
              :update="(value: unknown) => updateField(item.prop, value)"
            />
            <component
              :is="item.render"
              v-else-if="item.render"
              :item="item"
              :model="form"
              :value="form[item.prop]"
              :theme="getFieldTheme(item)"
              :update="(value: unknown) => updateField(item.prop, value)"
            />
            <component
              :is="item.comp || 's-input'"
              v-else
              v-model="form[item.prop]"
              v-bind="item.attrs"
              :placeholder="item.attrs?.placeholder || getPlaceholder(item)"
              :theme="getFieldTheme(item)"
              :title="item.label"
              class="s-table-search__field"
              @update:model-value="emitModelValue"
              @change="handleFieldEvent(item, 'change', $event)"
              @clear="handleFieldEvent(item, 'clear', $event)"
            />
          </el-form-item>
        </div>
      </el-form>

      <div class="s-table-search__actions">
        <div v-if="hasExtraActions" class="s-table-search__extra">
          <slot name="actions" :theme="mergedProps.theme"><slot :theme="mergedProps.theme" /></slot>
        </div>
        <div class="s-table-search__buttons">
          <s-button :theme="mergedProps.theme" type="primary" icon="el-icon-search" height="32" @click="handleSearch">
            搜索
          </s-button>
          <s-button
            v-if="mergedProps.showReset"
            :theme="mergedProps.theme"
            icon="el-icon-refresh"
            height="32"
            @click="handleReset"
          >
            重置
          </s-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type {
  STableSearchEmits,
  STableSearchEvent,
  STableSearchField,
  STableSearchModel,
  STableSearchProps,
  STableSearchTheme,
} from './types'

defineOptions({ name: 'STableSearch' })

const props = withDefaults(defineProps<STableSearchProps>(), {
  theme: 'default',
  options: () => [],
  items: undefined,
  column: 3,
  modelValue: undefined,
  initialValue: () => ({}),
  searchOn: undefined,
  showReset: true,
})
const emit = defineEmits<STableSearchEmits>()
const slots = useSlots()
const mergedProps = useGlobalComponentConfig('tableSearch', props)

const form = ref<STableSearchModel>({ ...props.initialValue, ...props.modelValue })
const fields = computed(() => mergedProps.value.items ?? mergedProps.value.options ?? [])
const hasExtraActions = computed(() => Boolean(slots.actions || slots.default))

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

const getFieldSlotName = (item: STableSearchField) => {
  if (item.useSlot === true) return item.prop
  if (typeof item.useSlot === 'string') return item.useSlot

  const legacySlotName = `field-${item.prop}`
  return slots[legacySlotName] ? legacySlotName : undefined
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

const getPlaceholder = (item: STableSearchField) => `${item.comp === 's-select' ? '请选择' : '请输入'}${item.label}`
const getFieldTheme = (item: STableSearchField): STableSearchTheme =>
  (item.attrs?.theme as STableSearchTheme | undefined) ?? mergedProps.value.theme

const getDefaultSearchEvents = (item: STableSearchField): STableSearchEvent[] =>
  item.comp === 's-select' ? ['change', 'clear'] : ['clear']

const handleFieldEvent = (item: STableSearchField, event: STableSearchEvent, value: unknown) => {
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
.s-table-search {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  container-type: inline-size;
}

.s-table-search__layout {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
}

.s-table-search__form,
.s-table-search__grid,
.s-table-search__field {
  width: 100%;
  min-width: 0;
}

.s-table-search__form {
  flex: 1 1 0;
}

.s-table-search__grid {
  display: grid;
  grid-template-columns: repeat(var(--s-table-search-columns), minmax(0, 1fr));
  gap: 16px;
}

.s-table-search__actions,
.s-table-search__extra,
.s-table-search__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.s-table-search__actions {
  flex: 0 0 176px;
  justify-content: flex-end;
}

.s-table-search__buttons {
  flex: 0 0 176px;
}

.s-table-search__buttons :deep(.el-button) {
  flex: 1 1 0;
  min-width: 0;
}

.s-table-search--with-actions .s-table-search__layout {
  flex-wrap: wrap;
}

.s-table-search--with-actions .s-table-search__form,
.s-table-search--with-actions .s-table-search__actions {
  flex-basis: 100%;
}

.s-table-search__extra {
  margin-right: auto;
}

.s-table-search :deep(.el-form-item) {
  min-width: 0;
  margin-bottom: 0;
}

.s-table-search :deep(.el-form-item__content) {
  width: 100%;
  min-width: 0;
}

@container (max-width: 900px) {
  .s-table-search__layout {
    flex-wrap: wrap;
  }

  .s-table-search__form,
  .s-table-search__actions {
    flex-basis: 100%;
  }

  .s-table-search__grid {
    grid-template-columns: 1fr;
  }
}
</style>
