<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">显示dialog</el-button>
    <s-dialog v-model="isShow" title="基础dialog" theme="shijingshan" sub-title="子">
      <template #header>
        <s-flex>
          这是header插槽, 默认icon还会保留
          <s-button icon="plus" type="danger" theme="shijingshan" @click="console.log(123)">添加</s-button>
        </s-flex>
      </template>

      我是内容

      <template #footer>这是footer插槽</template>
    </s-dialog>
  </div>
</template>
