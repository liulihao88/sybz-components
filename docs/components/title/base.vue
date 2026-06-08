<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-title title="你好"></s-title>
    <s-title title="显示左侧树杠" height="40"></s-title>
    <s-title title="无左侧树杠" type="simple"></s-title>
    <s-title title="form表单的类型" type="form">
      <template #right>
        <el-button type="primary">我是基本的button</el-button>
      </template>
    </s-title>
    <s-title title="form表单的类型" type="form"></s-title>
    <s-title title="我是插是插槽title我是插槽title我是插槽title" subTitle="我不服啊" type="simple">
      我是默认的s
      <template #icon>
        <s-icon name="delete"></s-icon>
      </template>
      <template #right>
        <el-button type="primary">按钮1</el-button>
        <el-button type="primary">按钮2</el-button>
      </template>
    </s-title>

    <s-title title="修改竖条颜色" type="" :style="{ '--lc': 'red' }"></s-title>
  </div>
</template>
