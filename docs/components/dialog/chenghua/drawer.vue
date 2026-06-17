<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const configs = [
  { label: 'theme', value: 'chenghua', defaultValue: "''" },
  { label: 'type', value: 'drawer', defaultValue: "''" },
  { label: 'showFooter', value: 'true / false', defaultValue: 'true' },
]
</script>

<template>
  <div class="chenghua-drawer-demo">
    <s-button theme="chenghua" type="primary" @click="visible = true">打开成华抽屉</s-button>
    <s-dialog
      v-model="visible"
      title="成华抽屉式 dialog"
      theme="chenghua"
      type="drawer"
      size="480px"
      confirm-text="保存"
      cancel-text="关闭"
    >
      <div class="chenghua-drawer-demo__content">
        <section class="chenghua-drawer-demo__section">
          <h4>抽屉式弹层</h4>
          <p>同时设置 theme="chenghua" 和 type="drawer" 后，会使用成华主题的右侧抽屉面板。</p>
        </section>

        <section class="chenghua-drawer-demo__section">
          <h4>示例属性</h4>
          <div class="chenghua-drawer-demo__list">
            <div v-for="item in configs" :key="item.label" class="chenghua-drawer-demo__item">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <em>默认值：{{ item.defaultValue }}</em>
            </div>
          </div>
        </section>
      </div>
    </s-dialog>
  </div>
</template>

<style scoped lang="scss">
.chenghua-drawer-demo {
  display: inline-flex;
}

.chenghua-drawer-demo__content {
  display: grid;
  gap: 16px;
}

.chenghua-drawer-demo__section {
  padding: 14px 16px;
  border: 1px solid rgba(22, 93, 255, 0.12);
  border-radius: 8px;
  background: #ffffff;

  h4 {
    margin: 0 0 8px;
    color: #1d2b4f;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
  }

  p {
    margin: 0;
    color: #33415f;
    font-size: 14px;
    line-height: 1.7;
  }
}

.chenghua-drawer-demo__list {
  display: grid;
  gap: 8px;
}

.chenghua-drawer-demo__item {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 4px 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  background: #f8fbff;

  span {
    color: #6f7a95;
    font-size: 13px;
  }

  strong {
    color: #165dff;
    font-size: 14px;
    font-weight: 600;
  }

  em {
    grid-column: 2;
    color: #6f7a95;
    font-size: 12px;
    font-style: normal;
  }
}
</style>
