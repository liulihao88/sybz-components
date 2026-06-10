<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { clone } from '@sybz-components/utils'

const refValue = ref([11, 22, 33])

const options = ref([
  { label: 'clone([1,2,3])', value: clone([1, 2, 3]) },
  {
    label: ' {a: 1, b:{c:2}, d:new Date(), e: /regex/, f:function(){}, self: null}',
    value: {
      a: 1,
      b: { c: 2 },
      d: new Date(),
      e: /regex/,
      f22: function () {
        return '123'
      }, // JSON.stringify 会丢失
      self: null, // 循环引用
    },
  },
  {
    label: 'clone([1,2,3], 3)',
    value: clone([1, 2, 3], 3),
  },
  {
    label: 'clone(12)',
    value: clone(12),
  },
  {
    label: 'clone(refValue)',
    labelSlot: 'refValue',
    value: clone(refValue),
  },
])
</script>

<template>
  <SFunctionSourceCode functionName="clone"></SFunctionSourceCode>
  <div>
    <s-descriptions :options="options" :column="1" labelWidth="300" :showAll="true">
      <template #refValue="{ item }">
        <s-flex justify="end">
          <div class="mr-2">clone(refValue)</div>
          <div class="flex justify-start items-center">
            <s-tooltip content="const refValue = ref([11, 22, 33])" class="h-[16px]">
              <s-icon name="warning"></s-icon>
            </s-tooltip>
          </div>
        </s-flex>
      </template>
    </s-descriptions>
  </div>
</template>
