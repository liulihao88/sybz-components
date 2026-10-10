<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { reactive, ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const visible = reactive({
  delete: false,
  base: false,
  noFooter: false,
  buttons: false,
  header: false,
  drawer: false,
})
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <div class="chenghua-dialog-demo">
    <s-button :theme="theme" type="danger" @click="visible.delete = true">删除确认</s-button>
    <s-button :theme="theme" @click="visible.base = true">默认底部按钮</s-button>
    <s-button :theme="theme" type="primary" @click="visible.noFooter = true">隐藏底部按钮</s-button>
    <s-button :theme="theme" type="danger" @click="visible.buttons = true">自定义按钮</s-button>
    <s-button :theme="theme" @click="visible.header = true">自定义标题</s-button>
    <s-button :theme="theme" type="primary" @click="visible.drawer = true">打开抽屉</s-button>

    <s-dialog v-model="visible.delete" :theme="theme" variant="delete" target="要删除的内容"></s-dialog>

    <s-dialog v-model="visible.base" title="默认成华弹框" :theme="theme" width="512px">
      成华主题默认展示底部按钮，和普通 dialog 行为保持一致。
    </s-dialog>

    <s-dialog v-model="visible.noFooter" title="隐藏底部按钮" :theme="theme" width="512px" :show-footer="false">
      需要隐藏底部操作区时，可以显式设置 show-footer 为 false。
    </s-dialog>

    <s-dialog
      v-model="visible.buttons"
      title="自定义按钮"
      sub-title="sub-title"
      :theme="theme"
      width="512px"
      cancel-text="暂不处理"
      confirm-text="立即提交"
      :cancel-attrs="{ width: 96, height: 40 }"
      :confirm-attrs="{ width: 112, height: 40 }"
    >
      confirmAttrs 和 cancelAttrs 会传给底部的 SButton，支持 width、height 等按钮属性。
    </s-dialog>

    <s-dialog v-model="visible.header" :theme="theme" width="512px">
      <template #header>成华 AI 服务申请</template>
      自定义 header 插槽时，标题区域仍会沿用成华主题字号。
    </s-dialog>

    <s-dialog
      v-model="visible.drawer"
      title="主题抽屉式弹层"
      :theme="theme"
      mode="drawer"
      width="1000"
      confirm-text="保存"
      cancel-text="关闭"
    >
      `theme` 跟随顶部选项切换，`mode` 可选 `dialog / drawer`，默认值 `dialog`；`width` 默认值 `''`，用于控制抽屉宽度。
    </s-dialog>
  </div>
</template>

<style lang="scss" scoped>
.chenghua-dialog-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
