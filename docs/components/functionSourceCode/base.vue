<script setup lang="ts">
import { ref } from 'vue'

const functionName = ref('uuid')
const options = ['uuid', 'isEmpty', 'formatBytes']
</script>

<template>
  <div>
    <s-radio v-model="functionName" :options="options" type="simple" class="mb-2" />
    <s-function-source-code :function-name="functionName" />
  </div>
</template>
