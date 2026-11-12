<script setup lang="ts">
import { ref } from 'vue'

const multiple = ref(false)
const singleValue = ref('北京')
const multipleValue = ref<string[]>(['北京', '上海'])
const options = ['北京', '上海', '广州']
</script>

<template>
  <s-flex direction="column" gap="12">
    <s-radio
      v-model="multiple"
      :options="[
        { label: 'false（默认）', value: false },
        { label: 'true', value: true },
      ]"
    />
    <s-select
      v-if="multiple"
      v-model="multipleValue"
      simple
      multiple
      :options="options"
      title="simple=true（默认 false），multiple=true（默认 false）"
    />
    <s-select
      v-else
      v-model="singleValue"
      simple
      :options="options"
      title="simple=true（默认 false），multiple=false（默认 false）"
    />
  </s-flex>
</template>
