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
  <div class="shijingshan-dialog-demo">
    <s-button theme="shijingshan" type="danger" @click="visible.delete = true">删除确认</s-button>
    <s-button theme="shijingshan" @click="visible.base = true">默认底部按钮</s-button>
    <s-button theme="shijingshan" type="primary" @click="visible.noFooter = true">隐藏底部按钮</s-button>
    <s-button theme="shijingshan" type="danger" @click="visible.buttons = true">自定义按钮</s-button>
    <s-button theme="shijingshan" @click="visible.header = true">自定义标题</s-button>

    <s-dialog v-model="visible.delete" theme="shijingshan" variant="delete" target="要删除的内容"> </s-dialog>

    <s-dialog v-model="visible.base" title="默认石景山弹框" theme="shijingshan" width="512px">
      石景山主题默认展示底部按钮，和普通 dialog 行为保持一致。
    </s-dialog>

    <s-dialog v-model="visible.noFooter" title="隐藏底部按钮" theme="shijingshan" width="512px" :show-footer="false">
      需要隐藏底部操作区时，可以显式设置 show-footer 为 false。
    </s-dialog>

    <s-dialog
      v-model="visible.buttons"
      title="自定义按钮"
      sub-title="sub-title"
      theme="shijingshan"
      width="512px"
      cancel-text="暂不处理"
      confirm-text="立即提交"
      :cancel-attrs="{ width: 96, height: 40 }"
      :confirm-attrs="{ width: 112, height: 40 }"
    >
      confirmAttrs 和 cancelAttrs 会传给底部的 SButton，支持 width、height 等按钮属性。
    </s-dialog>

    <s-dialog v-model="visible.header" theme="shijingshan" width="512px">
      <template #header>石景山 AI 服务申请</template>
      自定义 header 插槽时，标题区域仍会沿用石景山主题字号。
    </s-dialog>
  </div>
</template>

<style lang="scss" scoped>
.shijingshan-dialog-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
