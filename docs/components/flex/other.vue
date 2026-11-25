<script setup lang="ts">
import { ref } from 'vue'
const flexProps = ref({
  column: false,
  wrap: 'nowrap',
})
</script>

<template>
  <s-flex gap column>
    <s-radio
      v-model="flexProps.column"
      size="small"
      variant="button"
      simple
      :options="[true, false]"
      title="column"
    ></s-radio>
    <s-radio
      v-model="flexProps.wrap"
      :options="['wrap', 'nowrap', 'wrap-reverse']"
      simple
      title="wrap"
      size="small"
      variant="button"
    ></s-radio>
  </s-flex>
  <s-flex v-bind="flexProps">
    <div>1</div>
    <div>2</div>
  </s-flex>
</template>
