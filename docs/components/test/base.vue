<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const t1 = ref()
</script>

<template>
  <div>
    <s-button>魔人布欧</s-button>
    <div>docs/components/test/base.vue</div>
    <s-select
      v-model="t1"
      disabled
      theme="shijingshan"
      title="简单的"
      :options="[
        {
          label: '莎莎',
          value: 'ss',
        },
      ]"
    />
  </div>
</template>
