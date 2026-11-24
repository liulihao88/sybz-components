<script setup lang="ts">
import { $toast } from '@sybz-components/utils'
import { ref } from 'vue'
const showToast = () => {
  $toast('保存成功')
}
const paperTitle = ref('121321')
console.log(`6行 docs/components/utils/$toast/base.vue 123 `, 123)
$toast(`已保存 3333<s-tag>33333333${paperTitle.value}44444</s-tag>55555`, { theme: 'sybz', duration: 0 })
</script>

<template>
  <div>
    <el-button type="primary" @click="showToast">基础</el-button>
  </div>
</template>
