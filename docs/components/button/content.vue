<script setup lang="ts">
import { ref } from 'vue'
const handleClick = () => {
  console.log('handleClick')
}
const isTest39 = () => {
  console.log('isTest39')
}
</script>

<template>
  <div>
    <s-title title="这里主要是测试button之间有margin-left: 12px"></s-title>
    <s-button icon="plus" type="primary" content="<code type='danger'>你好</code>" :dangerously-use-html-string="true"
      >我是按钮</s-button
    >
    <s-button content="我是提示文字" icon="plus" @click="handleClick">有提示且有icon</s-button>
    <el-button type="primary" size="small" @click="isTest39">测试33</el-button>
    <el-button type="primary" size="small" @click="isTest39">测试33</el-button>
    <s-button
      content="我是提示文字, tooltip的属性都在tooltipAttrs下, <code>dangerouslyUseHTMLString</code> 可以控制是否解析"
      :dangerously-use-html-string="true"
      :tooltip-attrs="{ placement: 'right' }"
      icon="plus"
      @click="handleClick"
    >
      有提示和提示属性
    </s-button>
    <el-button type="primary" @click="isTest39">测试33</el-button>
  </div>
  <s-button text icon="el-icon-delete" content="删除"></s-button>
  <s-button text icon="el-icon-refresh" content="刷新"></s-button>
</template>
