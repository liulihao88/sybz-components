<script setup lang="ts">
import { ref } from 'vue'
import { http } from '@/utils/src/index'

const result = ref('点击按钮查看请求结果')

const parameterOptions = [
  { label: 'url', value: "'/api/users'，默认值：必填" },
  { label: 'params', value: '{ page: 1 }，默认值：未设置' },
  { label: 'config', value: '{}，默认值：{}' },
]

const request = async () => {
  try {
    const data = await http.get('/api/users', { page: 1 })
    result.value = JSON.stringify(data)
  } catch (error) {
    result.value = error instanceof Error ? error.message : String(error)
  }
}

const rawRequest = async () => {
  try {
    const response = await http.send({ url: '/api/users', method: 'GET', rawResponse: true })
    result.value = `status: ${response.status}\ndata: ${JSON.stringify(response.data)}`
  } catch (error) {
    result.value = error instanceof Error ? error.message : String(error)
  }
}
</script>

<template>
  <div class="http-demo">
    <s-descriptions
      :options="parameterOptions"
      title="基础用法（http.get 默认返回响应体）"
      :column="1"
      label-width="100"
      show-all
    />
    <div class="http-demo__actions">
      <el-button type="primary" @click="request">GET 请求</el-button>
      <el-button @click="rawRequest">获取完整响应</el-button>
    </div>
    <pre class="http-demo__result">{{ result }}</pre>
  </div>
</template>

<style scoped>
.http-demo {
  display: grid;
  gap: 16px;
}
.http-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.http-demo__result {
  min-height: 48px;
  margin: 0;
  white-space: pre-wrap;
}
</style>
