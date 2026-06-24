<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from '@/index.ts'
import { sleep, $toast } from '@sybz-components/utils'

const count = ref(0)
const { loading, withLoading } = useLoading(false)

const submit = () => {
  withLoading(async () => {
    await sleep(1000)
    count.value += 1
    $toast('提交完成')
  })
}
</script>

<template>
  <s-flex gap="12" align="center" wrap>
    <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
    <el-tag>提交次数：{{ count }}</el-tag>
  </s-flex>
</template>
