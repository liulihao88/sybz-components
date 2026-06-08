<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
</script>

<template>
  <div>
    <s-radio v-model="size" :options="['large', 'default', 'small']" type="simple"></s-radio>
    <SBasicLayout :size="size">
      无paddingLeft
      <template #header>
        <s-title title="更改内部样式, 无paddingTop"></s-title>
      </template>
      <template #footer>
        <el-button type="primary">无paddingBottom</el-button>
      </template>
    </SBasicLayout>
  </div>
</template>
