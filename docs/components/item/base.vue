<script lang="ts" setup>
import { $toast } from '@sybz-components/utils'
</script>

<template>
  <div>
    <SItem title="发起对话" sub-title="与数字员工直接交流" extra="立即进入" clickable>
      <template #prefix>💬</template>
    </SItem>
    <hr />
    <SItem
      title="超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title超长title"
      sub-title="超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title超长sub-title"
      extra="立即进入"
      clickable
      @click="$toast('123')"
    >
      <template #prefix>💬</template>
    </SItem>
    <s-title title="插槽用法" tb="8"></s-title>
    <SItem class="abc">
      <template #img>
        <img src="https://img.yzcdn.cn/vant/logo.png" class="w-20" />
      </template>
      <template #title>
        title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽title插槽
      </template>
      <template #subTitle>
        sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽sub-title插槽
      </template>
    </SItem>
  </div>
</template>

<style lang="scss" scoped></style>
