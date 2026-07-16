<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast, clone } from '@sybz-components/utils'
const t1 = ref()

const user = clone({ name: 'andy', extra: { id: 1 } })
console.log(`23 user`, user)
// { name: 'andy', extra: { id: 1 } }

const list = clone([1, 2, 3], 2)
console.log(`18 list`, list)
// [1, 2, 3, 1, 2, 3]

const copied = clone(ref([{ id: 1 }]))
console.log(`63 copied`, copied)
// [{ id: 1 }]
</script>

<template>
  <div>
    <s-button>魔人布欧</s-button>
    <div>docs/components/test/base.vue</div>
    <s-input v-model="t1" type="textarea"></s-input>
  </div>
</template>
