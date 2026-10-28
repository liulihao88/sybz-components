<template>
  <s-config-provider size="large" :clearable="false" :disabled="true" h="400" w="500">
    <s-flex gap="small" align="center">
      <s-button h="100%">禁用按钮</s-button>
      <s-input v-model="cc" placeholder="禁用且不可清空" width="160" />
      <s-input-number v-model="cc" width="160" />
      <s-input v-model="cc" placeholder="禁用且不可清空" width="160" type="textarea" />
      <s-input v-model="cc" :disabled="false" :clearable="true" placeholder="子组件显式覆盖" width="160" />
    </s-flex>
  </s-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const cc = ref(123)
</script>
