<script setup lang="ts"></script>

<template>
  <div>
    <s-empty>
      <template #image>
        这是image的插槽
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" class="img-box" />
      </template>
      <template #title>这是 title 插槽</template>
      <template #sub-title>这是 sub-title 插槽</template>
      <s-button type="primary">这是默认插槽</s-button>
    </s-empty>
  </div>
</template>

<style scoped lang="scss">
.img-box {
  width: 40px;
}
</style>
