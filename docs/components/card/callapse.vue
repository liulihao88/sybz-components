<script setup lang="ts">
import { ref } from 'vue'
const isCollapsed = ref(true)
</script>

<template>
  <div>
    <SCard :collapsible="true">
      我是内部的文件
      <template #header>
        <s-title title="默认点击右侧图标收起">
          <template #append>
            <el-button type="primary" size="small" @click.stop="console.log(1234)">测试96</el-button>
          </template>
          <template #extra>
            <el-button type="primary" size="small" @click.stop="console.log(123)">右侧按钮不再需要手动 stop</el-button>
          </template>
        </s-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试32132107</el-button>
      </template>
    </SCard>

    <hr />

    <SCard v-model="isCollapsed" collapsible collapse-trigger="header">
      我是内部的文件
      <template #header>
        <s-title title="整块头部可点击收起"></s-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </SCard>
  </div>
</template>
