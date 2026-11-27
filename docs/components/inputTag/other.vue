<script setup lang="ts">
import { ref } from 'vue'

const tags = ref<string[]>(['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta'])
const tagProps = ref({
  split: '默认',
  allowDuplicate: false,
  maxCount: 0,
  disabled: false,
  singleLine: true,
  type: 'primary',
  effect: 'light',
})
const splitRegExpMap: Record<string, RegExp | false> = {
  默认: /(?:,|，|、|;|；|\s)+/,
  仅逗号: /,/,
  仅空白: /\s+/,
  关闭: false,
}
</script>

<template>
  <s-flex gap column>
    <s-radio
      v-model="tagProps.split"
      :options="['默认', '仅逗号', '仅空白', '关闭']"
      simple
      title="splitRegExp"
      variant="button"
      size="small"
    />
    <s-radio
      v-model="tagProps.allowDuplicate"
      :options="[true, false]"
      simple
      title="allowDuplicate"
      variant="button"
      size="small"
    />
    <s-radio v-model="tagProps.maxCount" :options="[0, 2, 5]" simple title="maxCount" variant="button" size="small" />
    <s-radio
      v-model="tagProps.disabled"
      :options="[true, false]"
      simple
      title="disabled"
      variant="button"
      size="small"
    />
    <s-radio
      v-model="tagProps.singleLine"
      :options="[true, false]"
      simple
      title="singleLine"
      variant="button"
      size="small"
    />
    <s-radio
      v-model="tagProps.type"
      :options="['primary', 'success', 'info', 'warning', 'danger']"
      simple
      title="tagAttrs.type"
      variant="button"
      size="small"
    />
    <s-radio
      v-model="tagProps.effect"
      :options="['light', 'dark', 'plain']"
      simple
      title="tagAttrs.effect"
      variant="button"
      size="small"
    />
  </s-flex>
  <s-input-tag
    v-model="tags"
    :split-reg-exp="splitRegExpMap[tagProps.split]"
    :allow-duplicate="tagProps.allowDuplicate"
    :max-count="tagProps.maxCount"
    :disabled="tagProps.disabled"
    :single-line="tagProps.singleLine"
    :tag-attrs="{ type: tagProps.type, effect: tagProps.effect }"
    placeholder="输入后回车"
    style="max-width: 420px"
  />
</template>
