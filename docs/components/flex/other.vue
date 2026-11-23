<script setup lang="ts">
import { ref } from 'vue'

type AlignContent =
  | 'normal'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
type AlignSelf = 'auto' | 'normal' | 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'flex-start' | 'flex-end'

const alignContent = ref<AlignContent>('normal')
const horizontalGap = ref('small')
const verticalGap = ref('small')
const inline = ref(false)
const column = ref(false)
const alignSelf = ref<AlignSelf>('auto')
const order = ref(0)
</script>

<template>
  <s-title title="column：垂直排列简写，等价于 direction='column'（默认 false）" />
  <s-switch v-model="column" />
  <s-flex :column="column" gap="small" bg="#f8fafc" class="demo-preview">
    <s-button>按钮 1</s-button>
    <s-button>按钮 2</s-button>
  </s-flex>

  <s-title title="alignContent：多行对齐（默认 normal）" />
  <s-radio
    v-model="alignContent"
    :options="['normal', 'start', 'end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly']"
    type="simple"
  />
  <s-title title="gap 数组第一个值：水平间距 x（默认 0px）" />
  <s-radio v-model="horizontalGap" :options="['0', 'small', 'default', 'large']" type="simple" />
  <s-title title="gap 数组第二个值：垂直间距 y（默认 0px）" />
  <s-radio v-model="verticalGap" :options="['0', 'small', 'default', 'large']" type="simple" />
  <s-title title="inline：行内布局（默认 false）" />
  <s-switch v-model="inline" />

  <div class="demo-preview">
    <s-flex
      wrap
      :gap="[horizontalGap, verticalGap]"
      :align-content="alignContent"
      :inline="inline"
      width="280"
      height="180"
      bg="#f8fafc"
    >
      <span v-for="item in 6" :key="item" class="demo-item">{{ item }}</span>
    </s-flex>
    <span>后续行内文本</span>
  </div>

  <s-title title="alignSelf：子项对齐（默认 auto）" />
  <s-radio
    v-model="alignSelf"
    :options="['auto', 'normal', 'start', 'end', 'center', 'baseline', 'stretch', 'flex-start', 'flex-end']"
    type="simple"
  />
  <s-title title="order：子项视觉顺序（默认 0）" />
  <s-radio v-model="order" :options="[-1, 0, 1]" type="simple" />
  <s-flex align="center" gap="12" height="80" bg="#f8fafc">
    <s-button>普通子项</s-button>
    <s-button :align-self="alignSelf" :order="order">当前子项</s-button>
    <s-button>普通子项</s-button>
  </s-flex>
</template>

<style scoped>
.demo-preview {
  margin: 12px 0;
}

.demo-item {
  display: block;
  width: 72px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #e0f2fe;
}
</style>
