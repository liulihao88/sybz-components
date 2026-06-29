<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div>
    <s-empty>
      <template #image>
        这是image的插槽
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" class="img-box" />
      </template>
      <template #description>这是description的插槽</template>
      这是属于默认default的底部文字
    </s-empty>
  </div>
</template>

<style scoped lang="scss">
.img-box {
  width: 40px;
}
</style>
