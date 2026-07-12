<script setup lang="ts">
import { ref } from 'vue'
const checkboxValue = ref(['xxx'])
const emptyValue = ref([])
const allValue = ref(['xyy', 'xxx', 'xrr', 'hhs', 'dlg'])
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
  { name: '小瑞瑞', id: 'xrr' },
  { name: '胡汉三', id: 'hhs' },
  { name: '大力哥', id: 'dlg' },
])
function change(checkValue) {
  console.log(`checkValue`, checkValue)
}
</script>

<template>
  <div>
    <p>一个不选</p>
    <s-checkbox v-model="emptyValue" :options="options" label="name" show-type="button" value="id" />
    <p>选中其中几项</p>
    <s-checkbox
      v-model="checkboxValue"
      :options="options"
      label="name"
      size="small"
      show-type="button"
      value="id"
      :custom-disabled="(item) => item.id === 'xrr'"
      @change="change"
    ></s-checkbox>
    <p>全选</p>
    <s-checkbox v-model="allValue" :options="options" label="name" show-type="button" value="id" />
  </div>
</template>

<style scoped lang="scss"></style>
