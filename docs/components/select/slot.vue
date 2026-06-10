<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectValue = ref()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])

const confirm = (op, item) => {
  console.log(`74 item`, item)
  console.log(`38 op`, op)
}
</script>

<template>
  <div>
    <s-select v-model="selectValue" :options="options" width="100%">
      <template #header>自定义头部</template>
      <template #label="{ key, label, value }">{{ key }} ?? {{ label }} == {{ value }}</template>
      <!-- <template #label="arg">{{ arg }}</template> -->
      <template #default="{ options, item }">
        <div class="flex justify-between items-center w-full">
          <span>{{ item.label }}</span>
          <s-popconfirm @confirm="confirm(options, item)" trigger="click">
            <s-icon name="delete" @click.stop></s-icon>
          </s-popconfirm>
        </div>
      </template>
      <template #footer>自定义底部</template>
    </s-select>
  </div>
</template>
