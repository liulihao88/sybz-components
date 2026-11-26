<script setup lang="ts">
import { ref } from 'vue'
const backtopProps = ref({
  right: 40,
  bottom: 40,
  duration: 500,
})
</script>

<template>
  <s-flex gap column>
    <s-radio v-model="backtopProps.right" :options="[20, 40, 80]" simple title="right" variant="button" size="small" />
    <s-radio
      v-model="backtopProps.bottom"
      :options="[20, 40, 80]"
      simple
      title="bottom"
      variant="button"
      size="small"
    />
    <s-radio
      v-model="backtopProps.duration"
      :options="[0, 500, 1000]"
      simple
      title="duration"
      variant="button"
      size="small"
    />
  </s-flex>
  <s-backtop v-bind="backtopProps" :visibility-height="0" />
</template>
