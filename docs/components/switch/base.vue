<script setup lang="ts">
import { ref } from 'vue'
const cc = ref(false)
const cc2 = ref(1)
const dd = ref(false)
const randomValue = ref()

async function random() {
  let random = Math.random()
  randomValue.value = random
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random >= 0.5) {
        return resolve(random)
      } else {
        return reject('我错了')
      }
    }, 500)
  })
}

const beforeChange = async () => {
  await random()
}
</script>

<template>
  <div>
    <s-switch v-model="cc"></s-switch>
    {{ cc }}
    <br />

    <s-switch v-model="cc" active-text="管理员" inactive-text="一线工程师" :inline-prompt="false"></s-switch>
    <br />
    <s-switch v-model="cc" active-text="是" inactive-text="否"></s-switch>
    <br />

    <s-switch
      v-model="cc2"
      active-text="测试更长的启用"
      inactive-text="停用"
      :active-value="1"
      :inactive-value="0"
      :width="100"
    />
    {{ cc2 }}

    <s-title title="异步方法, 自带loading; 大于等于0.5可切换, 否则不可切换"></s-title>
    <s-switch v-model="dd" :before-change="beforeChange" inactive-text="异步" active-text="异步"></s-switch>
    {{ randomValue }} => {{ dd }}
  </div>
</template>
