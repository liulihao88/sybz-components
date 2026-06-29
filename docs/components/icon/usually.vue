<script setup lang="ts">
import { ref } from 'vue'
const lists = [
  { label: '新增', value: 'plus' },
  { label: '删除', value: 'delete' },
  { label: '搜索', value: 'search' },
  { label: '查看', value: 'view' },
  { label: '编辑', value: 'edit' },
  { label: '等待', value: 'loading' },
  { label: '下载', value: 'download' },
  { label: '正确', value: 'check' },
  { label: '关闭', value: 'close' },
  { label: '圆环关闭', value: 'circle-close' },
  { label: '更多', value: 'more' },
  { label: '刷新', value: 'refresh' },
  { label: '右箭头', value: 'arrow-right' },
  { label: '放大', value: 'zoom-in' },
  { label: '缩小', value: 'zoom-out' },
  { label: '锁定', value: 'lock' },
  { label: '未锁定', value: 'unlock' },
]
</script>

<template>
  <div>
    <sItemWrapper :columns="3">
      <div v-for="(v, i) in lists" :key="i">
        <div class="f-st-ct">
          <div class="m-r-8">{{ v.label }} ({{ v.value }}) -></div>
          <s-icon :name="v.value" color="var(--blue)"></s-icon>
        </div>
      </div>
    </sItemWrapper>
  </div>
</template>
