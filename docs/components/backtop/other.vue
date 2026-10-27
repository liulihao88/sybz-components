<script setup lang="ts">
import { ref } from 'vue'

const target = ref('.backtop-demo-scroll')
const visibilityHeight = ref(100)
const right = ref(80)
const bottom = ref(80)
const duration = ref(500)
const custom = ref(false)
const clicks = ref(0)
</script>

<template>
  <div>
    <div class="backtop-options">
      <label>
        target（默认：页面）
        <select v-model="target">
          <option value="">页面（默认）</option>
          <option value=".backtop-demo-scroll">.backtop-demo-scroll</option>
        </select>
      </label>
      <label>
        visibilityHeight（默认：200px）
        <select v-model.number="visibilityHeight">
          <option :value="0">0</option>
          <option :value="100">100</option>
          <option :value="200">200（默认）</option>
        </select>
      </label>
      <label>
        right（默认：40px）
        <select v-model.number="right">
          <option :value="20">20</option>
          <option :value="40">40（默认）</option>
          <option :value="80">80</option>
        </select>
      </label>
      <label>
        bottom（默认：40px）
        <select v-model.number="bottom">
          <option :value="20">20</option>
          <option :value="40">40（默认）</option>
          <option :value="80">80</option>
        </select>
      </label>
      <label>
        duration（默认：500ms）
        <select v-model.number="duration">
          <option :value="0">0（立即）</option>
          <option :value="500">500（默认）</option>
          <option :value="1000">1000</option>
        </select>
      </label>
      <label>
        默认插槽（默认：箭头）
        <select v-model="custom">
          <option :value="false">箭头（默认）</option>
          <option :value="true">文字“顶部”</option>
        </select>
      </label>
    </div>
    <p>点击次数：{{ clicks }}。选择容器后，请先滚动下面的区域；选择页面后，请滚动当前页面。</p>
    <div class="backtop-demo-scroll">
      <p v-for="item in 20" :key="item">滚动内容 {{ item }}</p>
    </div>
    <s-backtop
      v-if="custom"
      :target="target || undefined"
      :visibility-height="visibilityHeight"
      :right="right"
      :bottom="bottom"
      :duration="duration"
      @click="clicks++"
    >
      <span>顶部</span>
    </s-backtop>
    <s-backtop
      v-else
      :target="target || undefined"
      :visibility-height="visibilityHeight"
      :right="right"
      :bottom="bottom"
      :duration="duration"
      @click="clicks++"
    />
  </div>
</template>

<style scoped>
.backtop-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.backtop-options label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.backtop-demo-scroll {
  height: 200px;
  overflow: auto;
  border: 1px solid var(--el-border-color);
  padding: 12px;
}
</style>
