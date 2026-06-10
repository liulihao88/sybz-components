<template>
  <s-flex gap="small">
    <s-input v-model.lazy="input" style="width: 240px" placeholder="lazy" />
    <s-input v-model.number="input" style="width: 240px" placeholder="number" />
    <s-input v-model.trim="input" style="width: 240px" placeholder="trim" />
    {{ input }}
  </s-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>
