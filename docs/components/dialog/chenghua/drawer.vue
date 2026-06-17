<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div>
    <s-button theme="chenghua" type="primary" @click="visible = true">打开成华抽屉</s-button>
    <s-dialog v-model="visible" title="成华抽屉式 dialog" theme="chenghua" type="drawer">
      <p>同时设置 theme="chenghua" 和 type="drawer" 后，会使用成华主题的抽屉式弹层。</p>
      <p>theme 可选值：''、chenghua；默认值：''。</p>
      <p>type 可选值：''、drawer；默认值：''。</p>
    </s-dialog>
  </div>
</template>
