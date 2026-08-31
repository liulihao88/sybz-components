<script setup lang="ts">
import { ref } from 'vue'
import { clone } from '@sybz-components/utils'

const refValue = ref([11, 22, 33])
const objectValue = {
  a: 1,
  b: { c: 2 },
  d: new Date(),
  e: /regex/,
  f: function () {},
  self: null,
}

const formatCloneValue = (value: unknown) => {
  const seen = new WeakSet<object>()

  return (
    JSON.stringify(value, function (key, currentValue) {
      const originalValue = key === '' ? value : this[key]

      if (originalValue instanceof Date) return `new Date('${originalValue.toISOString()}')`
      if (originalValue instanceof RegExp) return originalValue.toString()
      if (typeof originalValue === 'function') return originalValue.toString()
      if (originalValue && typeof originalValue === 'object') {
        if (seen.has(originalValue)) return '[Circular]'
        seen.add(originalValue)
      }

      return currentValue
    }) ?? String(value)
  )
}

const options = ref([
  { label: 'clone([1,2,3])', value: formatCloneValue(clone([1, 2, 3])) },
  {
    label: 'clone({a: 1, b:{c:2}, d:new Date(), e:/regex/, f:function(){}, self:null})',
    value: formatCloneValue(clone(objectValue)),
  },
  {
    label: 'clone([1,2,3], 3)',
    value: formatCloneValue(clone([1, 2, 3], 3)),
  },
  {
    label: 'clone(12)',
    value: formatCloneValue(clone(12)),
  },
  {
    label: 'clone(refValue)',
    labelSlot: 'refValue',
    value: formatCloneValue(clone(refValue)),
  },
])
</script>

<template>
  <div>
    <s-descriptions :options="options" :column="1" label-width="300" :show-all="true">
      <template #refValue="{ option, value, index }">
        <s-flex justify="end">
          <div class="m-r-8">clone(refValue)</div>
          <div class="f-st-ct">
            <s-tooltip content="const refValue = ref([11, 22, 33])" class="h-16">
              <s-icon icon="warning"></s-icon>
            </s-tooltip>
          </div>
        </s-flex>
      </template>
    </s-descriptions>
  </div>
</template>

<style scoped></style>
