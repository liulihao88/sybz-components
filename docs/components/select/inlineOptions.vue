<script setup lang="ts">
import { ref } from 'vue'

const value = ref('all')
</script>

<template>
  <s-select v-model="value" width="300" :show-quick="true" title="el-option作为默认slot">
    <el-option label="全部类型" value="all" />
    <el-option label="付款节点" value="payment" />
    <el-option label="交付节点" value="delivery" />
  </s-select>
</template>
