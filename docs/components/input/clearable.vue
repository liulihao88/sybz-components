<template>
  <s-flex direction="column" gap="16">
    <s-input v-model="clearableTextarea" width="320" type="textarea" :rows="3" placeholder="默认显示清除按钮" />
    <s-input
      v-model="fixedTextarea"
      width="320"
      type="textarea"
      :rows="3"
      :clearable="false"
      placeholder="clearable=false 不显示清除按钮"
    />
  </s-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const clearableTextarea = ref('这段内容可以通过右侧按钮清空')
const fixedTextarea = ref('这段内容不显示清除按钮')
</script>
