<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
import { confirm } from '@/utils/src/index'
const base = () => {
  confirm('确定要执行此操作吗？', { confirmButtonClass: '', cancelButtonClass: '' })
}

const useHtml = () => {
  confirm('', {
    message:
      '换行<br>注意：当桶内文件大小普遍较小 <span class="cl-blue">（<100MB）</span> 或过大（>5GB）时不推荐打开此功能?',
  })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="base">基础用法</el-button>
    <el-button type="primary" @click="useHtml">使用html</el-button>
  </div>
</template>
