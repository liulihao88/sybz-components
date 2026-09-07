<script setup lang="ts">
import { ref } from 'vue'
const tabsValue = ref('chenghua')
const navList = [
  {
    label: '成华',
    value: 'chenghua',
  },
  {
    label: '思云博智',
    value: 'sybz',
  },
]
</script>

<template>
  <div>
    <s-tabs v-model="tabsValue" :options="navList" width="300"></s-tabs>
    <div v-if="tabsValue === 'chenghua'">成华内容</div>
    <div v-else>思云博智内容</div>
  </div>
</template>
