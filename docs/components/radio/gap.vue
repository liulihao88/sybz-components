<script setup lang="ts">
import { ref } from 'vue'

const value = ref('待处理')
const buttonValue = ref('待处理')
const options = ['待处理', '处理中', '已完成', '已关闭']
const gap = ref(16)
</script>

<template>
  <div class="radio-gap-demo">
    <el-slider v-model="gap"></el-slider>
    <s-radio v-model="value" :options="options" :gap="gap" />
    <s-radio v-model="buttonValue" :options="options" show-type="button" :gap="gap" />
  </div>
</template>

<style scoped>
.radio-gap-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
