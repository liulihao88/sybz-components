<script setup lang="ts">
import { ref } from 'vue'

const highlight = ref(true)
</script>

<template>
  <div class="icon-highlight-demo">
    <div class="icon-highlight-demo__header">
      <s-title title="highlight 默认值：false"></s-title>
      <p class="icon-highlight-demo__tip">
        基础写法：给 s-icon 加上 highlight
        属性，鼠标移入时默认色图标的线条变成主题主色，语义色图标保持自己的颜色并加深一档；背景色和尺寸不变，禁用状态（disabled）不会高亮。
      </p>
    </div>

    <div class="icon-highlight-demo__controls">
      <s-switch v-model="highlight" active-text="highlight: true" inactive-text="highlight: false" />
    </div>

    <div class="icon-highlight-demo__group">
      <p class="icon-highlight-demo__label">默认色矢量图标：hover 变主题主色</p>
      <div class="icon-highlight-demo__list">
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:home" size="24" :highlight="highlight" />
          <span>tabler 图标</span>
        </div>
        <div class="icon-highlight-demo__item">
          <s-icon icon="edit" size="24" :highlight="highlight" />
          <span>Element Plus 图标</span>
        </div>
      </div>
    </div>

    <div class="icon-highlight-demo__group">
      <p class="icon-highlight-demo__label">语义色图标：保持自己的颜色，同色系加深</p>
      <div class="icon-highlight-demo__list">
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:home" type="primary" size="24" :highlight="highlight" />
          <span>primary</span>
        </div>
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:alert-triangle" type="warning" size="24" :highlight="highlight" />
          <span>warning</span>
        </div>
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:trash" type="danger" size="24" :highlight="highlight" />
          <span>danger</span>
        </div>
      </div>
    </div>

    <div class="icon-highlight-demo__group">
      <p class="icon-highlight-demo__label">带背景、禁用状态</p>
      <div class="icon-highlight-demo__list">
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:circle-check" type="success" variant="light" size="24" :highlight="highlight" />
          <span>success + light</span>
        </div>
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:trash" type="danger" variant="solid" size="24" :highlight="highlight" />
          <span>danger + solid</span>
        </div>
        <div class="icon-highlight-demo__item">
          <s-icon icon="tabler:settings" type="warning" size="24" :highlight="highlight" disabled />
          <span>disabled</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-highlight-demo {
  display: grid;
  gap: 20px;
}

.icon-highlight-demo__tip {
  margin: 8px 0 0;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.icon-highlight-demo__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.icon-highlight-demo__group {
  display: grid;
  gap: 12px;
}

.icon-highlight-demo__label {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.icon-highlight-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.icon-highlight-demo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-regular);
  font-size: 13px;
}
</style>
