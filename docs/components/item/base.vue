<script lang="ts" setup>
import { $toast } from '@sybz-components/utils'
</script>

<template>
  <div class="item-demo-list">
    <SItem title="发起对话" sub-title="与数字员工直接交流" extra="立即进入" clickable>
      <template #prefix>💬</template>
    </SItem>

    <SItem title="插槽用法" sub-title="标题、前缀、右侧操作和正文均可替换">
      <template #img>
        <span class="avatar">AI</span>
      </template>
      <template #actions>
        <el-button text type="primary" @click.stop="$toast('已打开')">打开</el-button>
      </template>
      最近更新：今天 10:30
    </SItem>
  </div>
</template>

<style lang="scss" scoped>
.item-demo-list {
  display: grid;
  gap: 12px;
  max-width: 680px;
}

.avatar {
  display: grid;
  width: 40px;
  height: 40px;
  color: #fff;
  background: #409eff;
  border-radius: 50%;
  place-items: center;
}
</style>
