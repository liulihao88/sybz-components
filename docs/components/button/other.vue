<script setup lang="ts">
import { ref, watch, h } from 'vue'

defineOptions({
  name: 'PureButton',
})

const size = ref('default')
const dynamicSize = ref()
const isDark = ref(true)

const baseRadio = ref('default')
const buttonList = [
  {
    type: '',
    text: 'Default',
    icon: 'el-icon-search',
  },
  {
    type: 'primary',
    text: 'Primary',
    icon: 'el-icon-edit',
  },
  {
    type: 'success',
    text: 'Success',
    icon: 'el-icon-check',
  },
  {
    type: 'info',
    text: 'Info',
    icon: 'el-icon-view',
  },
  {
    type: 'warning',
    text: 'Warning',
    icon: 'el-icon-star',
  },
  {
    type: 'danger',
    text: 'Danger',
    icon: 'el-icon-delete',
  },
]

watch(size, (val) => (val === 'disabled' ? (dynamicSize.value = 'default') : (dynamicSize.value = size.value)))
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <el-space wrap :size="40">
          <el-radio-group v-model="size">
            <el-radio value="large">大尺寸</el-radio>
            <el-radio value="default">默认尺寸</el-radio>
            <el-radio value="small">小尺寸</el-radio>
            <el-radio value="disabled">禁用</el-radio>
          </el-radio-group>
        </el-space>
      </div>
    </template>

    <div class="m-b-8">基础按钮</div>
    <el-radio-group v-model="baseRadio" class="m-b-12">
      <el-radio label="default" value="default" />
      <el-radio label="plain" value="plain" />
      <el-radio label="round" value="round" />
      <el-radio label="circle" value="circle" />
      <el-radio label="link" value="link" />
      <el-radio label="text" value="text" />
      <el-radio label="text-bg" value="text-bg" />
    </el-radio-group>
    <br />
    <el-space wrap>
      <s-button
        v-for="(button, index) in buttonList"
        :key="index"
        :type="button.type as any"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
        :plain="baseRadio === 'plain'"
        :round="baseRadio === 'round'"
        :circle="baseRadio === 'circle'"
        :link="baseRadio === 'link'"
        :text="baseRadio === 'text' || baseRadio === 'text-bg'"
        :bg="baseRadio === 'text-bg'"
        :icon="button.icon"
      >
        <template v-if="baseRadio !== 'circle'" #default>
          <p>{{ button.text }}</p>
        </template>
      </s-button>
    </el-space>
    <el-divider />

    <div class="m-b-16">加载状态按钮</div>
    <s-button text bg type="primary" :size="dynamicSize" :disabled="size === 'disabled'" :loading="size !== 'disabled'">
      {{ size === 'disabled' ? '停止加载' : '加载中' }}
    </s-button>
    <s-button
      type="primary"
      plain
      :size="dynamicSize"
      :disabled="size === 'disabled'"
      :loading-icon="h('ep:eleme')"
      :loading="size !== 'disabled'"
    >
      {{ size === 'disabled' ? '停止加载' : '加载中' }}
    </s-button>
    <s-button type="primary" :size="dynamicSize" :disabled="size === 'disabled'" :loading="size !== 'disabled'">
      <template #loading>
        <div class="custom-loading">
          <svg class="circular" viewBox="-10, -10, 50, 50">
            <path
              class="path"
              d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
              style="fill: rgb(0 0 0 / 0%); stroke-width: 4px"
            />
          </svg>
        </div>
      </template>
      {{ size === 'disabled' ? '停止加载' : '加载中' }}
    </s-button>
    <el-divider />

    <div class="m-b-16">自定义元素标签。例如：按钮、div、链接</div>
    <s-button :size="dynamicSize" :disabled="size === 'disabled'">button 标签</s-button>
    <s-button tag="div" role="button" tabindex="0" :size="dynamicSize" :disabled="size === 'disabled'">
      div 标签
    </s-button>
    <s-button
      type="primary"
      tag="a"
      :href="size === 'disabled' ? 'javascript:void(0);' : 'https://element-plus.org/zh-CN/component/button.html#tag'"
      :target="size === 'disabled' ? '_self' : '_blank'"
      rel="noopener noreferrer"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    >
      a 链接
    </s-button>
    <el-divider />

    <s-radio v-model="isDark" :options="[true, false]" type="simple" title="是否黑色主题"></s-radio>
    <div class="m-b-16">自定义颜色</div>
    <el-space wrap>
      <s-button color="#626aef" :dark="isDark">Default</s-button>
      <s-button color="#626aef" :dark="isDark" plain>Plain</s-button>

      <s-button color="#626aef" :dark="isDark" disabled>Disabled</s-button>
      <s-button color="#626aef" :dark="isDark" disabled plain>Disabled Plain</s-button>
    </el-space>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-divider--horizontal) {
  margin: 17px 0;
}

.s-button .custom-loading .circular {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  animation: loading-rotate 2s linear infinite;
}

.s-button .custom-loading .circular .path {
  stroke: var(--el-button-text-color);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: loading-dash 1.5s ease-in-out infinite;
}
</style>
