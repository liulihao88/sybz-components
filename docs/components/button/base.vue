<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from '@sybz-components/utils'
</script>

<template>
  <div>
    <s-select v-model="selectValue" :options="options" :show-all="false" @change-select="changeSelect" />
    <s-button icon="plus" type="primary">我是按钮</s-button>
    <s-button content="我是提示文字" icon="plus" type="primary">有提示且有icon</s-button>
  </div>
</template>
