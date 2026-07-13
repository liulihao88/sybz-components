<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const t1 = ref()
</script>

<template>
  <div>
    <s-button>魔人布欧</s-button>
    <div>docs/components/test/base.vue</div>
    <s-input v-model="t1" type="textarea"></s-input>
  </div>
</template>
