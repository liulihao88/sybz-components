<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div>
    <s-title title="你好"></s-title>
    <s-title title="显示左侧树杠" sub-title="我不好"></s-title>
    <s-title title="无左侧树杠" type="simple"></s-title>
    <s-title title="form表单的类型" type="form"></s-title>
    <s-title sub-title="我不服啊" type="simple">
      <template #title> title的slot </template>
      <template #icon>
        <s-icon name="delete"></s-icon>
      </template>
      <template #extra>
        <el-button type="primary">按钮1</el-button>
        <el-button type="primary">按钮2</el-button>
      </template>
      我是默认slot
    </s-title>

    <s-title title="修改竖条颜色" type="icon" :style="{ '--lc': 'red' }"></s-title>
    <s-title title="左侧" tb="10" l="10">
      <span class="m-l-16">左侧的slot</span>
      <template #extra>
        <el-button type="primary">右侧的button</el-button>
        <el-button type="primary">右侧的button2</el-button>
        <el-button type="primary">右侧的button3</el-button>
        <el-button type="primary">右侧的button4</el-button>
      </template>
    </s-title>

    <s-title title="icon" type="simple">
      <template #icon>
        <s-icon name="plus"></s-icon>
      </template>
    </s-title>
  </div>
</template>
