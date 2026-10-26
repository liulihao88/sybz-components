<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'

const theme = ref<(typeof docThemeOptions)[number]>('default')
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <s-flex gap="small" wrap>
    <s-button :theme="theme" type="primary">默认圆角</s-button>
    <s-button :theme="theme" type="primary" round>圆角按钮</s-button>
    <s-button :theme="theme" type="primary" round content="圆角按钮提示">带提示的圆角按钮</s-button>
  </s-flex>
</template>
