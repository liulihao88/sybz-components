<script setup lang="ts">
import { computed } from 'vue'
import SIcon from '@/components/icon'
import type { SMenuFieldNames, SMenuItem } from './types'

defineOptions({ name: 'SMenuNode' })

const props = defineProps<{ item: SMenuItem; fieldNames: Required<SMenuFieldNames> }>()

const read = (field: keyof SMenuFieldNames) => props.item[props.fieldNames[field]]
const children = computed<SMenuItem[]>(() => read('children') || [])
const index = computed(() => String(read('index') || read('path') || ''))
const icon = computed(() => read('icon'))
const isComponentIcon = computed(() => typeof icon.value !== 'string')
const suffixIcon = computed(() => props.item.suffixIcon)
const isComponentSuffixIcon = computed(() => typeof suffixIcon.value !== 'string')
const suffixIconName = computed(() => (typeof suffixIcon.value === 'string' ? suffixIcon.value : ''))
</script>

<template>
  <template v-if="item.type === 'group'">
    <div class="s-menu-node__group">{{ read('title') }}</div>
    <SMenuNode
      v-for="(child, childIndex) in children"
      :key="String(child[fieldNames.index] || child[fieldNames.path] || child[fieldNames.title] || childIndex)"
      :item="child"
      :field-names="fieldNames"
    />
  </template>
  <el-sub-menu v-else-if="children.length" :index="index" :disabled="Boolean(read('disabled'))">
    <template #title>
      <el-icon v-if="icon && isComponentIcon"><component :is="icon" /></el-icon>
      <SIcon v-else-if="icon" :icon="icon" />
      <span>{{ read('title') }}</span>
    </template>
    <SMenuNode
      v-for="(child, childIndex) in children"
      :key="String(child[fieldNames.index] || child[fieldNames.path] || child[fieldNames.title] || childIndex)"
      :item="child"
      :field-names="fieldNames"
    />
  </el-sub-menu>
  <el-tooltip v-else :disabled="!item.detail" placement="right" :show-after="300" popper-class="s-menu-detail-popper">
    <template #content>
      <div class="s-menu-node__detail">
        <span v-if="item.detail?.tag">{{ item.detail.tag }}</span>
        <strong>{{ item.detail?.title || read('title') }}</strong>
        <small v-if="item.detail?.description">{{ item.detail.description }}</small>
      </div>
    </template>
    <el-menu-item :index="index" :route="read('route') || read('path')" :disabled="Boolean(read('disabled'))">
      <el-icon v-if="icon && isComponentIcon"><component :is="icon" /></el-icon>
      <SIcon v-else-if="icon" :icon="icon" />
      <template #title>
        <span v-if="item.tag" class="s-menu-node__tag" :style="{ color: item.tagColor }">{{ item.tag }}</span>
        <span class="s-menu-node__title">{{ read('title') }}</span>
        <el-icon v-if="suffixIcon && isComponentSuffixIcon" class="s-menu-node__suffix">
          <component :is="suffixIcon" />
        </el-icon>
        <SIcon v-else-if="suffixIconName" class="s-menu-node__suffix" :icon="suffixIconName" />
      </template>
    </el-menu-item>
  </el-tooltip>
</template>

<style scoped lang="scss">
.s-menu-node {
  &__group {
    padding: 20px 18px 8px;
    color: #8da0b8;
    font-size: 13px;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__tag {
    flex: none;
    padding: 2px 7px;
    border-radius: 5px;
    font-size: 12px;
  }
  &__suffix {
    flex: none;
    margin-left: auto !important;
  }
  &__detail {
    display: grid;
    min-width: 260px;
    gap: 7px;
    padding: 8px 6px;
  }
  &__detail span {
    width: fit-content;
    padding: 3px 8px;
    border-radius: 5px;
    background: #e5f1ff;
    color: #1677d2;
    font-size: 12px;
  }
  &__detail strong {
    color: #fff;
    font-size: 16px;
  }
  &__detail small {
    color: #b8c4d1;
    font-size: 13px;
  }
}
</style>
