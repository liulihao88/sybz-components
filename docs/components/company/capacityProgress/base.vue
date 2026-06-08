<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytes } from '@/utils/src/index.ts'

const row = ref({
  noUsed: -234,
  totalSpace: 100,
  usedSpace: 23,
  overUsedSpace: 200,
})

const testRow = ref({
  used: 103922671616,
  total: 32390658146304,
})

function parseSpace(space) {
  if (!space) {
    return '0.00B'
  }
  if (space < 0) {
    return '?'
  }
  return formatBytes(space ?? 0)
}
</script>

<template>
  <div>
    <s-capacity-progress :total="row.totalSpace" :used="row.usedSpace" width="300"></s-capacity-progress>

    <hr />

    <s-capacity-progress :total="row.totalSpace" :used="row.overUsedSpace"></s-capacity-progress>

    <hr />
    <s-capacity-progress :total="row.totalSpace" :used="row.noUsed">
      <span>{{ parseSpace(row.noUsed) }} / {{ parseSpace(row.totalSpace) }}</span>
    </s-capacity-progress>

    <br />

    <s-capacity-progress :total="testRow.total" :used="testRow.used">
      <span>{{ parseSpace(testRow.used) }} / {{ parseSpace(testRow.total) }}</span>
    </s-capacity-progress>
  </div>
</template>
