<template>
  <s-flex gap="small" direction="column">
    <s-input
      v-model="input"
      title="密码框"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <s-input v-model="input" width="240" height="48" title="height: 48" placeholder="height: 48" />
  </s-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>
