<script setup lang="ts">
import { ref } from 'vue'
const smallCount = ref(1)
const strictCount = ref(2)
</script>

<template>
  <div>
    <s-item-wrapper :columns="2">
      <s-input v-model="smallCount"></s-input>
      <s-input-number v-model="smallCount" title="宽度" width="200" />
      <s-input-number v-model="smallCount" title="最大1, 最小5" :min="1" :max="5" />
      <s-input-number v-model="smallCount" title="禁用" disabled />
      <s-input-number v-model="smallCount" title="精度:precision " :precision="2" />
      <s-input-number v-model="smallCount" title="前缀和后缀 ">
        <template #prefix>
          <span>￥</span>
        </template>
        <template #suffix>
          <span>RMB</span>
        </template>
      </s-input-number>
      <s-input-number v-model="smallCount" title="按钮位置: controls-position " controls-position="" />
      <s-input-number v-model="smallCount" title="步进2" :step="2" />
      <s-input-number v-model="strictCount" title="严格步进2" :step="2" step-strictly />
      <s-input-number v-model="smallCount" title="当输入框被清空显示的值" :value-on-clear="1" />
    </s-item-wrapper>
  </div>
</template>
