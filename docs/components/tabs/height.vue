<script setup lang="ts">
import { ref } from 'vue'

const active = ref('all')
const navList = [
  { label: '全部', value: 'all' },
  { label: '开发工具', value: 'development' },
  { label: '其他', value: 'other' },
]
</script>

<template>
  <div class="tabs-height-demo">
    <s-tabs v-model="active" :options="navList" type="capsule" height="100%" header-margin="0" />
  </div>
</template>

<style scoped>
.tabs-height-demo {
  height: 40px;
}
</style>
