<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
const count = ref(0)
</script>

<template>
  <s-button @click="isShow = true">标题追加按钮</s-button>
  <s-dialog v-model="isShow" title="基础 dialog" sub-title="使用 append 插槽后，副标题仍然保留" theme="shijingshan">
    <template #append>
      <s-button icon="plus" @click="count++">添加</s-button>
      <s-button icon="delete" type="danger" @click="count--">删除</s-button>
    </template>
    已添加 {{ count }} 项
  </s-dialog>
</template>
