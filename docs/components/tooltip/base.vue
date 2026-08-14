<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div>
    <s-tooltip
      width="100"
      content="这是一段比较长的提示文本，默认只展示单行，超出当前宽度后鼠标移入会显示完整内容。"
      placement="right"
    ></s-tooltip>
    <el-divider border-style="dashed"></el-divider>
    <s-tooltip width="300" content="内容没超出, 就不会显示tooltip" placement="right"></s-tooltip>
  </div>
</template>
