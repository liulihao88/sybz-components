<script setup lang="ts">
import { onMounted, ref } from 'vue'

const columns = ref([])
const data = ref([])
const loading = ref(false)

// 用 Promise 模拟后端接口：表头和数据都来自接口响应。
const fetchTableData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        columns: [
          { label: '项目名称', prop: 'name', minWidth: 180 },
          { label: '负责人', prop: 'owner', minWidth: 120 },
          { label: '预算金额', prop: 'amount', minWidth: 120 },
          { label: '状态', prop: 'status', minWidth: 100 },
          { label: '最近更新', prop: 'updatedAt', minWidth: 180 },
        ],
        data: [
          {
            id: 1,
            name: '客户服务平台',
            owner: '张三',
            amount: '¥128,000',
            status: '进行中',
            updatedAt: '2026-09-02 10:20',
          },
          {
            id: 2,
            name: '数据驾驶舱',
            owner: '李四',
            amount: '¥86,500',
            status: '已完成',
            updatedAt: '2026-09-01 16:45',
          },
          {
            id: 3,
            name: '移动端改版',
            owner: '王五',
            amount: '¥42,800',
            status: '已暂停',
            updatedAt: '2026-08-30 09:10',
          },
        ],
      })
    }, 1000)
  })

const loadTableData = async () => {
  loading.value = true
  try {
    const response = await fetchTableData()
    data.value = response.data
    // 接口只返回列元数据，展示样式由前端按业务补充。
    columns.value = response.columns.map((column) => ({
      ...column,
      className: column.prop === 'amount' ? 'backend-table__amount' : '',
      labelClassName: column.prop === 'status' ? 'backend-table__status-header' : '',
      useSlot: column.prop === 'status' ? 'status' : false,
    }))
  } finally {
    loading.value = false
  }
}

onMounted(loadTableData)
</script>

<template>
  <div class="backend-table-demo">
    <div class="backend-table-demo__toolbar">
      <span>表头和数据均由接口返回，状态列和金额列由前端自定义样式</span>
      <s-button size="small" type="primary" :loading="loading" @click="loadTableData">刷新数据</s-button>
    </div>

    <s-table :columns="columns" :data="data" :loading="loading" :show-page="false" height="200">
      <template #status="{ row }">
        <s-tag
          :type="row.status === '进行中' ? 'primary' : row.status === '已完成' ? 'success' : 'info'"
          effect="light"
        >
          {{ row.status }}
        </s-tag>
      </template>
    </s-table>
  </div>
</template>

<style scoped lang="scss">
.backend-table-demo {
  padding: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
}

.backend-table-demo__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

:deep(.backend-table__amount) {
  color: var(--el-color-primary);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

:deep(.backend-table__status-header) {
  color: var(--el-color-primary);
}

@media (max-width: 640px) {
  .backend-table-demo__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
