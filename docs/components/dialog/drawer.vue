<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)

const props = [
  { name: 'type', values: "'' / drawer", defaultValue: "''" },
  { name: 'width', values: 'string / number', defaultValue: "''" },
  { name: 'title', values: 'string', defaultValue: '提示' },
  { name: 'showFooter', values: 'true / false', defaultValue: 'true' },
]
</script>

<template>
  <div class="dialog-drawer-demo">
    <el-button type="primary" @click="isShow = true">打开 drawer</el-button>
    <s-dialog v-model="isShow" title="抽屉式 dialog" mode="drawer" width="1200">
      <div class="dialog-drawer-demo__content">
        <p>设置 mode="drawer" 后，s-dialog 会使用抽屉方式从页面侧边打开；设置 width 可以控制抽屉宽度。</p>
        <div class="dialog-drawer-demo__list">
          <div v-for="item in props" :key="item.name" class="dialog-drawer-demo__item">
            <span>{{ item.name }}</span>
            <strong>{{ item.values }}</strong>
            <em>默认值：{{ item.defaultValue }}</em>
          </div>
        </div>
      </div>
    </s-dialog>
  </div>
</template>

<style scoped lang="scss">
.dialog-drawer-demo {
  display: inline-flex;
}

.dialog-drawer-demo__content {
  display: grid;
  gap: 14px;

  p {
    margin: 0;
    color: var(--el-text-color-regular);
    font-size: 14px;
    line-height: 1.7;
  }
}

.dialog-drawer-demo__list {
  display: grid;
  gap: 8px;
}

.dialog-drawer-demo__item {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 4px 12px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
  background: var(--el-fill-color-extra-light);

  span {
    color: var(--el-text-color-secondary);
    font-size: 13px;
  }

  strong {
    color: var(--el-color-primary);
    font-size: 14px;
    font-weight: 600;
  }

  em {
    grid-column: 2;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    font-style: normal;
  }
}
</style>
