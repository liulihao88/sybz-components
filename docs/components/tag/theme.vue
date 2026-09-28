<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>('default')
const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '待处理', value: 'pending' },
  { label: '异常', value: 'error' },
  { label: '未知', value: 'unknown' },
]
const serviceStatus = ['running', 'pending', 'error', 'unknown']
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <div class="tag-chenghua-demo">
    <s-flex gap="small">
      <s-tag :theme="theme" type="primary">运行中</s-tag>
      <s-tag :theme="theme" type="success">已完成</s-tag>
      <s-tag :theme="theme" type="warning">待处理</s-tag>
      <s-tag :theme="theme" type="danger">异常</s-tag>
      <s-tag :theme="theme" type="info">未知</s-tag>
    </s-flex>

    <s-flex gap="small">
      <s-tag
        v-for="status in serviceStatus"
        :key="status"
        :theme="theme"
        :value="status"
        :options="statusOptions"
        :config="{ label: 'label', value: 'value' }"
        :primary="['running']"
        :warning="['pending']"
        :danger="['error']"
        :info="['unknown']"
      />
    </s-flex>

    <s-flex gap="small">
      <s-tag :theme="theme" type="primary" effect="dark">深色主状态</s-tag>
      <s-tag :theme="theme" type="warning" effect="plain">描边提醒</s-tag>
      <s-tag :theme="theme" type="danger" closable>可关闭异常</s-tag>
    </s-flex>
  </div>
</template>

<style scoped lang="scss">
.tag-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
