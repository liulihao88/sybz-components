<script setup lang="ts">
import { reactive } from 'vue'

const visible = reactive({
  delete: false,
  base: false,
  noFooter: false,
  buttons: false,
  header: false,
})
</script>

<template>
  <div class="chenghua-dialog-demo">
    <s-button theme="chenghua" type="primary" @click="visible.delete = true">删除确认</s-button>
    <s-button theme="chenghua" @click="visible.base = true">默认底部按钮</s-button>
    <s-button theme="chenghua" type="primary" @click="visible.noFooter = true">隐藏底部按钮</s-button>
    <s-button theme="chenghua" type="danger" @click="visible.buttons = true">自定义按钮</s-button>
    <s-button theme="chenghua" @click="visible.header = true">自定义标题</s-button>

    <s-dialog v-model="visible.delete" title="删除确认" theme="chenghua">
      成华主题默认展示底部按钮，和普通 dialog 行为保持一致。
    </s-dialog>

    <s-dialog v-model="visible.base" title="默认成华弹框" theme="chenghua" width="512px">
      成华主题默认展示底部按钮，和普通 dialog 行为保持一致。
    </s-dialog>

    <s-dialog v-model="visible.noFooter" title="隐藏底部按钮" theme="chenghua" width="512px" :show-footer="false">
      需要隐藏底部操作区时，可以显式设置 show-footer 为 false。
    </s-dialog>

    <s-dialog
      v-model="visible.buttons"
      title="自定义按钮"
      sub-title="sub-title"
      theme="chenghua"
      width="512px"
      cancel-text="暂不处理"
      confirm-text="立即提交"
      :cancel-attrs="{ width: 96, height: 40 }"
      :confirm-attrs="{ width: 112, height: 40 }"
    >
      confirmAttrs 和 cancelAttrs 会传给底部的 SButton，支持 width、height 等按钮属性。
    </s-dialog>

    <s-dialog v-model="visible.header" theme="chenghua" width="512px">
      <template #header>成华 AI 服务申请</template>
      自定义 header 插槽时，标题区域仍会沿用成华主题字号。
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
