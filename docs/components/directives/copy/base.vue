<script setup lang="ts">
import { ref } from 'vue'
const searchSix = ref('copy')
const text = ref('可复制的文本')
const silentText = ref('静默复制的文本')
</script>

<template>
  <div>
    <div class="m-b-8">
      文本复制指令（双击输入框内容即可复制）

      <el-input v-model="searchSix" v-copy="searchSix" class="w-200" />
      <!-- <el-input v-model="searchSix" /> -->
    </div>
    <div>
      文本复制指令（自定义触发事件，单击复制）
      <s-flex v-copy:click="text" class="cp cl-blue" align="center">
        <span>
          {{ text }}
        </span>
        <s-icon name="copy-document"></s-icon>
      </s-flex>
    </div>
    <div class="m-t-8">
      文本复制指令（不显示 toast）
      <span v-copy:click="{ value: silentText, hideToast: true }" class="cp cl-blue">
        {{ silentText }}
      </span>
    </div>
  </div>
</template>
