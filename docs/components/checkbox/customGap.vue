<template>
  <div class="demo-box">
    <div>
      水平间距 x：{{ horizontalGap }}px
      <el-slider v-model="horizontalGap" />
    </div>
    <div>垂直间距 y：{{ verticalGap }}px</div>
    <el-slider v-model="verticalGap" :max="40" />
    <s-title title="gap：单值控制水平间距，垂直默认 8px；数组 [x, y] 分别控制水平和垂直间距（默认未设置）" />
    <s-checkbox v-model="value" :options="options" :gap="[horizontalGap, verticalGap]"></s-checkbox>
    <s-checkbox v-model="value" :options="options" :gap="[horizontalGap, verticalGap]" variant="button"></s-checkbox>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])

const horizontalGap = ref(16)
const verticalGap = ref(8)

const options: any = ref([])

for (let i = 0; i < 20; i++) {
  options.value.push({
    label: `男人${i + 1}`,
    value: i,
  })
}
</script>

<style scoped lang="scss">
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
