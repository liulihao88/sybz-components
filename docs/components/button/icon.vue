<script setup lang="ts">
import { Plus, Search, StarFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="button-icon-demo">
    <s-button :icon="Plus" type="primary">导入 Plus</s-button>
    <s-button icon="plus" type="primary">plus</s-button>
    <s-button icon="el-icon-plus" type="primary">el-icon-plus</s-button>
    <s-button :icon="Search" type="success" size="large">大按钮</s-button>
    <s-button icon="el-icon-plus" type="warning" size="small">小按钮</s-button>
    <s-button icon="tabler:user-dollar" type="warning" size="large">Tabler Iconify 图标</s-button>
    <s-button icon="mdi:account-tie-woman" type="danger" size="large">Tabler Iconify 图标2</s-button>
    <s-button icon="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/1.jpg" type="primary">
      HTTP 线上图片图标
    </s-button>
    <s-button type="primary" plain size="large">
      <template #icon>
        <StarFilled class="button-icon-demo__custom-icon" />
      </template>
      自定义大小颜色
    </s-button>
  </div>
</template>

<style scoped lang="scss">
.button-icon-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.button-icon-demo__custom-icon {
  color: red;
}
</style>
