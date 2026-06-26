<template>
  <div>
    <div>
      <h4>自定义单个选项插槽</h4>
      <s-radio v-model="value" :options="options" size="large" @change="change">
        <template #mySlot="scope">
          <div>自定义单个选项插槽---{{ scope.label }}---{{ scope.value }}</div>
        </template>
      </s-radio>
    </div>
    <div>
      <h4>默认插槽</h4>
      <s-radio id="value" v-model="value2" size="large" name="value" value="value" @change="change2">
        <el-radio :value="1" label="上海1" />
        <el-radio :value="2" label="北京" disabled />
        <el-radio :value="3" label="广州" />
        <el-radio :value="4" label="深圳" />
      </s-radio>
      <br />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, slot: 'mySlot' },
])

const value2 = ref(3)
function change(value, ...a) {
  console.log(`value`, value)
  console.log(`2282 38行 docs/examples/SRadio/slot.vue a `, a)
}
function change2(value, ...a) {
  console.log(`value`, value)
  console.log(`2282 38行 docs/examples/SRadio/slot.vue a `, a)
}
</script>
