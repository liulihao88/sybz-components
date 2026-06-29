<script setup lang="ts">
import { ref } from 'vue'
const data = ref([
  { name: '<1023', value: 12345, value2: Number.MAX_SAFE_INTEGER },
  { name: '<2M', value: 3, value2: 444444 },
])

const data2 = ref([
  { name: '<1023', value: 1, value2: 123451 },
  { name: '<2M', value: 1, value2: 444444 },
  // { name: '<3M', value: 3, value2: 444444 },
  // { name: '<4M', value: 3, value2: 444444 },
  // { name: '<5M', value: 3, value2: 1984444342113 },
])
</script>

<template>
  <div>
    <SCountBarOld :data="data" style="height: 300px"></SCountBarOld>
    <hr />
    <hr />
    <SCountBarOld :data="data2" style="height: 300px"></SCountBarOld>
  </div>
</template>
