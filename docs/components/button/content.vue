<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
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
    <s-button content="我是提示文字" icon="plus" @click="handleClick">有提示且有icon</s-button>
    <el-button type="primary" @click="isTest39" size="small">测试33</el-button>
    <el-button type="primary" @click="isTest39" size="small">测试33</el-button>
    <s-button
      content="我是提示文字, tooltip的属性都在tooltipAttrs下, <code>dangerouslyUseHTMLString</code> 可以控制是否解析"
      :dangerouslyUseHTMLString="true"
      :tooltipAttrs="{ placement: 'right' }"
      icon="plus"
      @click="handleClick"
    >
      有提示和提示属性
    </s-button>
    <el-button type="primary" @click="isTest39">测试33</el-button>
    <s-button content="我是提示文字" icon="plus" @click="handleClick">有提示</s-button>
    <s-button content="我是提示文字" icon="plus" @click="handleClick">有提示</s-button>
  </div>
  <s-button text icon="el-icon-delete" content="删除"></s-button>
  <s-button text icon="el-icon-refresh" content="刷新"></s-button>
</template>
