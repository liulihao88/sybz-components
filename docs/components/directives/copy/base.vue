<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const searchSix = ref('copy')
const text = ref('可复制的文本')
const silentText = ref('静默复制的文本')
</script>

<template>
  <div>
    <div class="mb-2">
      文本复制指令（双击输入框内容即可复制）
      <el-input v-model="searchSix" v-copy="searchSix" class="w-[200px]" />
      <!-- <el-input v-model="searchSix" /> -->
    </div>
    <div>
      文本复制指令（自定义触发事件，单击复制）
      <span v-copy:click="text" class="cursor-pointer text-[var(--blue)]">{{ text }}</span>
    </div>
    <div class="mt-2">
      文本复制指令（不显示 toast）
      <span v-copy:click="{ value: silentText, hideToast: true }" class="cursor-pointer text-[var(--blue)]">
        {{ silentText }}
      </span>
    </div>
  </div>
</template>
