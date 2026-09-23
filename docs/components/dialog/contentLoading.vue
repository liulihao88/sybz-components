<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
const loading = ref(true)
const mode = ref<'dialog' | 'drawer'>('dialog')

const open = (nextMode: 'dialog' | 'drawer') => {
  mode.value = nextMode
  loading.value = true
  isShow.value = true
}
</script>

<template>
  <div>
    <s-button @click="open('dialog')">打开弹窗</s-button>
    <s-button @click="open('drawer')">打开抽屉</s-button>
    <s-button @click="loading = !loading">切换内容区 loading</s-button>
    <s-dialog v-model="isShow" title="内容加载" :mode="mode" :loading="loading">
      <p>内容加载完成后显示在这里。</p>
    </s-dialog>
  </div>
</template>
