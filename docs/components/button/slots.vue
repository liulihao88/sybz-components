<script setup lang="ts">
import { ref } from 'vue'
import { $toast } from '@sybz-components/utils'
const handleClick = () => {
  $toast('handleClick')
}
</script>

<template>
  <div class="button-slot-demo">
    <div class="button-slot-demo__row">
      <s-button type="primary" @click="handleClick">
        <template #icon>
          <s-icon name="delete"></s-icon>
        </template>
        左侧图标 + 文字
      </s-button>

      <s-button type="primary" @click="handleClick">
        <span class="button-slot-demo__content">
          <span>文字 + 右侧图标</span>
          <s-icon name="arrow-right"></s-icon>
        </span>
      </s-button>
    </div>

    <div class="button-slot-demo__row">
      <s-button loading type="primary" @click="handleClick">
        <template #loading>
          <s-icon name="refresh"></s-icon>
        </template>
        自定义 loading
      </s-button>

      <s-button :time="1000" type="success" @click="handleClick">
        <template #icon>
          <s-icon name="plus"></s-icon>
        </template>
        1秒防抖
      </s-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.button-slot-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button-slot-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.button-slot-demo__content {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}
</style>
