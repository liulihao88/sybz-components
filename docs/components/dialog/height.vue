<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
const mode = ref<'dialog' | 'drawer'>('dialog')
const height = ref<string | number>(420)

const open = (nextMode: 'dialog' | 'drawer', nextHeight: string | number) => {
  mode.value = nextMode
  height.value = nextHeight
  isShow.value = true
}
</script>

<template>
  <div>
    <s-button @click="open('dialog', 420)">打开 420px 弹窗</s-button>
    <s-button @click="open('dialog', 'calc(100vh - 10px)')">打开接近全屏的弹窗 height="calc(100vh - 10px)"</s-button>
    <s-button @click="open('drawer', '60vh')">打开 60vh 抽屉</s-button>
    <s-dialog v-model="isShow" title="自定义高度" :height="height">
      {{ height }}
      <div class="h-100%">
        <p v-for="item in 24" :key="item">第 {{ item }} 条内容</p>
      </div>
    </s-dialog>
  </div>
</template>
