<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref([])
const dateSimple = ref('')
const beforeDateValue = ref('')

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime()
}
</script>

<template>
  <div>
    <s-title title="年月日 时分秒"></s-title>
    <s-date-range v-model="dateValue" width="600" format="YYYY-MM-DD HH:mm:ss" type="datetimerange"></s-date-range>
    <s-title title="多属性"></s-title>
    <s-date-range
      v-model="dateValue"
      title="选择日期"
      start-placeholder="开始"
      end-placeholder="结束"
      range-separator="///"
    ></s-date-range>
    <s-title title="支持到可以选择时间"></s-title>
    <s-date-range
      v-model="dateValue"
      title="写入时间"
      class="mb-4"
      format="YYYY-MM-DD HH:mm:ss"
      width="500"
      :boxStyle="{ width: 80 }"
      type="datetimerange"
    />
    <s-title title="选择单个日期, 并且是时间戳"></s-title>
    <s-date-range
      v-model="dateSimple"
      title="完犊子"
      type="datetime"
      value-format="x"
    ></s-date-range>
    {{ dateSimple }}

    <br />
    <s-title title="日期仅可以选择当前日期之前的"></s-title>
    <s-date-range
      v-model="beforeDateValue"
      type="datetime"
      value-format="x"
      placeholder="日期仅可以选择当前日期之前的"
      :disabled-date="disabledDate"
    ></s-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
