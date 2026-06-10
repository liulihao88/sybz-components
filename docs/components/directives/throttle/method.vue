<script setup lang="ts">
import { ref } from 'vue'

const logs = ref<{ id: number; text: string }[]>([])
let logId = 0

function getTime() {
  return new Date().toLocaleTimeString()
}

function addLog(label: string, event: Event, extra = '') {
  logId += 1
  logs.value.unshift({
    id: logId,
    text: `${getTime()} ${label} ${event.type}${extra ? ` ${extra}` : ''}`,
  })
  logs.value = logs.value.slice(0, 6)
}

function handleWithParams(event: Event, action: string) {
  addLog('传参', event, action)
}

function handleMouseenter(event: Event) {
  addLog('mouseenter', event)
}

function handleClickOrScroll(event: Event) {
  addLog('click / scroll', event)
}
</script>

<template>
  <div class="throttle-demo">
    <el-button type="primary" v-throttle="($event) => handleWithParams($event, '保存')">传参调用</el-button>

    <div class="throttle-demo__box" v-throttle.mouseenter.1500="handleMouseenter">mouseenter 事件 1500ms</div>

    <div class="throttle-demo__scroll" v-throttle.click.scroll.1000="handleClickOrScroll">
      <div class="throttle-demo__scroll-content">
        <p v-for="item in 8" :key="item">点击或滚动区域 {{ item }}</p>
      </div>
    </div>

    <ul class="throttle-demo__logs">
      <li v-for="log in logs" :key="log.id">{{ log.text }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.throttle-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.throttle-demo__box {
  width: 220px;
  padding: 12px;
  color: var(--el-color-primary);
  cursor: default;
  border: 1px solid var(--el-color-primary-light-5);
  border-radius: 4px;
}

.throttle-demo__scroll {
  width: 320px;
  height: 120px;
  padding: 12px;
  overflow: auto;
  cursor: pointer;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.throttle-demo__scroll-content {
  min-height: 260px;
}

.throttle-demo__scroll-content p {
  margin: 0 0 12px;
}

.throttle-demo__logs {
  padding-left: 18px;
  margin: 0;
  color: var(--el-text-color-secondary);
}
</style>
