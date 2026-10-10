<template>
  <div class="controls">
    <label>
      type
      <el-select v-model="type" style="width: 130px">
        <el-option v-for="value in types" :key="value" :value="value" :label="value" />
      </el-select>
    </label>
    <label>
      offsetScrollbars
      <el-select v-model="offset" style="width: 130px">
        <el-option v-for="value in offsets" :key="String(value)" :value="value" :label="String(value)" />
      </el-select>
    </label>
    <label>
      overscrollBehavior
      <el-select v-model="overscroll" style="width: 130px">
        <el-option v-for="value in ['auto', 'contain', 'none']" :key="value" :value="value" :label="value" />
      </el-select>
    </label>
    <label>
      scrollbarSize
      <el-input-number v-model="size" :min="0" :max="24" />
    </label>
    <label>
      scrollHideDelay
      <el-input-number v-model="delay" :min="0" :step="100" />
    </label>
  </div>
  <s-scroll
    width="300px"
    height="200px"
    :type="type"
    :offset-scrollbars="offset"
    :scrollbar-size="size"
    :scroll-hide-delay="delay"
    :overscroll-behavior="overscroll"
  >
    <Story />
  </s-scroll>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Story from './Story.vue'
import type { SScrollOffset, SScrollType } from '../../../packages/components/scroll/src/types'
const types: SScrollType[] = ['hover', 'scroll', 'auto', 'always', 'never']
const offsets: SScrollOffset[] = [false, true, 'x', 'y', 'present']
const type = ref<SScrollType>('always')
const offset = ref<SScrollOffset>(false)
const overscroll = ref<'auto' | 'contain' | 'none'>('auto')
const size = ref(8)
const delay = ref(1000)
</script>
<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
.controls label {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
