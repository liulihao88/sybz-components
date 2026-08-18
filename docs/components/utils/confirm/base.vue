<script setup lang="ts">
import { confirm, configureUtils } from '@/utils/src/index'
// configureUtils({ theme: 'shijingshan' })
const base = () => {
  confirm('确定要执行此操作吗？', { confirmButtonClass: '', cancelButtonClass: '' })
}

const useHtml = () => {
  confirm({
    message:
      '换行<br>注意：当桶内文件大小普遍较小 <span class="cl-blue">（<100MB）</span> 或过大（>5GB）时不推荐打开此功能?',
  })
}

const deleteConfirm = () => {
  confirm({
    target:
      '4a731a90594a4af544c0c25941171jpeg.jpeg、小米汽车.png、蓝紫渐变闪粉艺术玻璃花瓶产品参数.xlsx、戴珍珠耳环的少女.png、雕像.png Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!',
  })
}

const warningConfirm = () => {
  confirm('该操作可能影响现有数据，请确认后继续。', {
    variant: 'warning',
    theme: 'shijingshan',
  })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="base">基础用法</el-button>
    <el-button type="primary" @click="useHtml">使用html</el-button>
    <el-button type="danger" @click="deleteConfirm">删除确认</el-button>
    <el-button type="warning" @click="warningConfirm">警告确认</el-button>
  </div>
</template>
