<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'default' | 'chenghua' | 'shijingshan'>('default')
</script>

<template>
  <div class="button-link-demo">
    <el-radio-group v-model="theme" size="small">
      <el-radio-button label="default">Default</el-radio-button>
      <el-radio-button label="chenghua">Chenghua</el-radio-button>
      <el-radio-button label="shijingshan">Shijingshan</el-radio-button>
    </el-radio-group>
    <div class="button-link-demo__row">
      <s-button :theme="theme" link type="primary" href="https://element-plus.org">Primary</s-button>
      <s-button :theme="theme" link type="success" href="https://element-plus.org">Success</s-button>
      <s-button :theme="theme" link type="warning" href="https://element-plus.org">Warning</s-button>
      <s-button :theme="theme" link type="danger" href="https://element-plus.org">Danger</s-button>
      <s-button :theme="theme" link type="info" href="https://element-plus.org">Info</s-button>
    </div>
  </div>
</template>

<style scoped>
.button-link-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}
</style>
