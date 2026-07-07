<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const configs = [
  { label: 'theme', value: 'shijingshan', defaultValue: "'default'" },
  { label: 'type', value: 'drawer', defaultValue: "''" },
  { label: 'width', value: 'string / number', defaultValue: "''" },
  { label: 'showFooter', value: 'true / false', defaultValue: 'true' },
]
</script>

<template>
  <div class="shijingshan-drawer-demo">
    <s-button theme="shijingshan" type="primary" @click="visible = true">打开石景山抽屉</s-button>
    <s-dialog
      v-model="visible"
      title="石景山抽屉式 dialog"
      theme="shijingshan"
      type="drawer"
      width="1000"
      confirm-text="保存"
      cancel-text="关闭"
    >
      <div class="shijingshan-drawer-demo__content">
        <section class="shijingshan-drawer-demo__section">
          <h4>抽屉式弹层</h4>
          <p>
            同时设置 theme="shijingshan" 和 type="drawer" 后，会使用石景山主题的右侧抽屉面板；设置 width
            可以控制抽屉宽度。
          </p>
        </section>

        <section class="shijingshan-drawer-demo__section">
          <h4>示例属性</h4>
          <div class="shijingshan-drawer-demo__list">
            <div v-for="item in configs" :key="item.label" class="shijingshan-drawer-demo__item">
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
.shijingshan-drawer-demo {
  display: inline-flex;
}

.shijingshan-drawer-demo__content {
  display: grid;
  gap: 16px;
}

.shijingshan-drawer-demo__section {
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

.shijingshan-drawer-demo__list {
  display: grid;
  gap: 8px;
}

.shijingshan-drawer-demo__item {
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
