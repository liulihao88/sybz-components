<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const arr = ref([])

for (let i = 0; i < 100; i++) {
  let randNum = Math.floor(Math.random() * 10000000)
  arr.value.push(randNum)
}
</script>

<template>
  <div>
    <s-input-label v-model="arr"></s-input-label>
  </div>
</template>

<style scoped lang="scss"></style>
