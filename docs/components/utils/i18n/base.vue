<script setup lang="ts">
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const locale = ref(zhCn)
// const locale = ref(en)
const changeLanguage = () => {
  if (locale.value.name === 'zh-cn') {
    locale.value = en
  } else {
    locale.value = zhCn
  }
}
const timeValue = ref([])
const dateValue = ref([])
</script>

<template>
  <div style="margin-bottom: 16px">
    <el-button type="primary" @click="changeLanguage">切换语言 => {{ locale.name }}</el-button>
  </div>

  <el-config-provider :locale="locale">
    <s-flex gap="8">
      <el-time-picker v-model="timeValue" is-range :teleported="false" />
      <s-date-picker
        v-model="dateValue"
        width="600"
        format="YYYY-MM-DD HH:mm:ss"
        type="datetimerange"
        :shortcuts="false"
        :teleported="false"
      ></s-date-picker>
    </s-flex>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
