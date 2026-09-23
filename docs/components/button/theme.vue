<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'

const theme = ref<(typeof docThemeOptions)[number]>('default')
</script>

<template>
  <SRadio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <div class="button-theme-demo">
    <div class="button-theme-demo__row">
      <s-button :theme="theme" type="primary" icon="plus">主要按钮</s-button>
      <s-button :theme="theme" icon="search">次要按钮</s-button>
      <s-button :theme="theme" type="primary" disabled>禁用按钮</s-button>
    </div>
    <div class="button-theme-demo__row">
      <s-button :theme="theme" type="success">成功</s-button>
      <s-button :theme="theme" type="warning">警告</s-button>
      <s-button :theme="theme" type="danger">危险</s-button>
      <s-button :theme="theme" type="info">信息</s-button>
    </div>
    <div class="button-theme-demo__row">
      <s-button :theme="theme" type="primary" ghost>幽灵按钮</s-button>
      <s-button :theme="theme" variant="outline">描边变体</s-button>
      <s-button :theme="theme" variant="gradient" type="primary">渐变变体</s-button>
      <s-button :theme="theme" link>链接按钮</s-button>
    </div>
    <div class="button-theme-demo__row">
      <s-button :theme="theme" type="primary" size="small">小尺寸</s-button>
      <s-button :theme="theme" type="primary">默认尺寸</s-button>
      <s-button :theme="theme" type="primary" size="large">大尺寸</s-button>
    </div>
  </div>
</template>

<style scoped>
.button-theme-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button-theme-demo__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
