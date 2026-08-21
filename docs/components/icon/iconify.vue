<script setup lang="ts">
import { addIconifyIcon } from 'sybz-components'

// 可选：私有部署或离线项目可以直接注册图标数据，不请求 Iconify API。
addIconifyIcon('project:rocket', {
  body: '<path fill="currentColor" d="M12 2c3.2 1.5 5.1 4.4 5.4 8.1l2.1 2.1-3.2 1.1-.7 2.2-2.2.7-1.1 3.2-2.1-2.1C6.5 17 3.6 15.1 2 12c2.3-1.5 4.8-2.4 7.4-2.6C9.7 6.8 10.6 4.3 12 2Zm2 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>',
})
</script>

<template>
  <div class="iconify-demo">
    <s-icon name="mdi:home" size="28" content="Material Design Icons" />
    <s-icon name="lucide:search" size="28" color="#409eff" content="Lucide" />
    <s-icon name="logos:vue" size="28" content="多彩图标" />
    <s-icon name="project:rocket" size="28" color="#f56c6c" content="离线注册" />
  </div>
</template>

<style scoped>
.iconify-demo {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
