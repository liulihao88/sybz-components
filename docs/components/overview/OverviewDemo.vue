<script setup lang="ts">
import { computed, ref } from 'vue'

type ThemeName = 'default' | 'chenghua' | 'shijingshan'
type SizeName = 'small' | 'default' | 'large'
type RadioShowType = 'radio' | 'button'
type CheckboxShowType = 'check' | 'button'

const currentTheme = ref<ThemeName>('default')
const currentSize = ref<SizeName>('default')
const keyword = ref('文件管理')
const selectedStatus = ref('running')
const selectedType = ref('compute')
const selectedDate = ref('')
const quotaValue = ref(64)
const enabled = ref(true)
const agreeItems = ref(['log'])
const radioValue = ref('private')
const showDialog = ref(false)
const radioShowType = ref<RadioShowType>('radio')
const checkboxShowType = ref<CheckboxShowType>('check')
const currentPage = ref(1)

const themes: Array<{ label: string; value: ThemeName }> = [
  { label: 'default', value: 'default' },
  { label: 'chenghua', value: 'chenghua' },
  { label: 'shijingshan', value: 'shijingshan' },
]

const sizes: Array<{ label: string; value: SizeName }> = [
  { label: 'small', value: 'small' },
  { label: 'default', value: 'default' },
  { label: 'large', value: 'large' },
]

const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '等待中', value: 'pending' },
  { label: '已停止', value: 'stopped' },
]

const serviceOptions = [
  { label: '云主机', value: 'compute' },
  { label: '对象存储', value: 'object' },
  { label: '数据库', value: 'database' },
]

const checkboxOptions = [
  { label: '审计日志', value: 'log' },
  { label: '告警通知', value: 'notice' },
  { label: '自动备份', value: 'backup' },
]

const radioOptions = [
  { label: '私有', value: 'private' },
  { label: '团队', value: 'team' },
  { label: '公开', value: 'public' },
]

const radioShowTypeOptions = [
  { label: 'radio', value: 'radio' },
  { label: 'button', value: 'button' },
]

const checkboxShowTypeOptions = [
  { label: 'check', value: 'check' },
  { label: 'button', value: 'button' },
]

const tagOptions = [
  { label: '运行中', value: 'running' },
  { label: '等待中', value: 'pending' },
  { label: '异常', value: 'error' },
]

const descOptions = computed(() => [
  { label: '当前主题', value: currentTheme.value },
  { label: '服务类型', value: serviceOptions.find((item) => item.value === selectedType.value)?.label || '-' },
  { label: '资源状态', value: statusOptions.find((item) => item.value === selectedStatus.value)?.label || '-' },
  { label: '容量使用', value: `${quotaValue.value}%` },
])

const tableColumns = [
  { label: '服务名称', prop: 'name' },
  { label: '状态', prop: 'status' },
  { label: '负责人', prop: 'owner' },
]
const tabsValue = ref('chenghua')
const navList = [
  {
    label: '成华',
    value: 'chenghua',
  },
  {
    label: '石景山',
    value: 'shijingshan',
  },
]

const isDisabled = ref(false)

const tableData = [
  { name: '对象存储', status: '运行中', owner: '平台组' },
  { name: '日志服务', status: '等待中', owner: '运维组' },
  { name: '数据库', status: '异常', owner: '数据组' },
]
</script>

<template>
  <div class="overview-page">
    <div class="overview-toolbar">
      <div class="overview-toolbar__item">
        <span>主题</span>
        <s-radio v-model="currentTheme" :options="themes" show-type="button" />
      </div>
      <div class="overview-toolbar__item">
        <span>尺寸</span>
        <s-radio v-model="currentSize" :options="sizes" show-type="button" />
      </div>
      <div class="overview-toolbar__item">
        <span>是否禁用</span>
        <s-switch v-model="isDisabled" active-text="是" inactive-text="否" />
      </div>
    </div>

    <section class="overview-section">
      <s-title title="基础输入" :theme="currentTheme" />
      <div class="overview-grid overview-grid--form">
        <s-input
          v-model="keyword"
          title="关键词"
          placeholder="请输入关键词"
          :theme="currentTheme"
          :size="currentSize"
          width="260"
          :disabled="isDisabled"
        />
        <s-select
          v-model="selectedStatus"
          title="状态"
          :options="statusOptions"
          :theme="currentTheme"
          :size="currentSize"
          width="260"
          :disabled="isDisabled"
        />
        <s-select
          v-model="selectedType"
          title="服务"
          :options="serviceOptions"
          :theme="currentTheme"
          :size="currentSize"
          width="260"
          :disabled="isDisabled"
        />
        <s-date-picker
          v-model="selectedDate"
          title="申请日期"
          :theme="currentTheme"
          :size="currentSize"
          width="260"
          :disabled="isDisabled"
        />
        <s-input-number
          v-model="quotaValue"
          title="容量"
          :min="0"
          :max="100"
          :theme="currentTheme"
          :size="currentSize"
          width="260"
          :disabled="isDisabled"
        />
        <div class="overview-switch">
          <span>启用策略</span>
          <s-switch
            v-model="enabled"
            :theme="currentTheme"
            :size="currentSize"
            active-text="开"
            inactive-text="关"
            :disabled="isDisabled"
          />
        </div>
      </div>
    </section>

    <section>
      <s-flex gap="16">
        <s-tabs v-model="tabsValue" :options="navList" :theme="currentTheme" :size="currentSize" width="200"></s-tabs>
        <s-tabs
          v-model="tabsValue"
          :options="navList"
          :theme="currentTheme"
          :size="currentSize"
          height="100%"
          type="capsule"
        ></s-tabs>
      </s-flex>
      <s-tooltip content="超出字符就隐藏, 鼠标移入显示全部" width="100"></s-tooltip>
      <s-warning content="这是基础用法" title="我是title" :theme="currentTheme"></s-warning>
    </section>

    <section class="overview-section">
      <s-title title="选择和状态" :theme="currentTheme" />
      <s-flex gap="small" class="m-b-16">
        <s-select
          v-model="radioShowType"
          title="单选 showType（默认值：radio）"
          :options="radioShowTypeOptions"
          :theme="currentTheme"
          :size="currentSize"
          width="400"
        />
        <s-radio
          v-model="radioValue"
          :options="radioOptions"
          :theme="currentTheme"
          :size="currentSize"
          :disabled="isDisabled"
          :show-type="radioShowType"
        />
      </s-flex>
      <s-flex gap="small">
        <s-select
          v-model="checkboxShowType"
          title="多选 showType（默认值：check）"
          :options="checkboxShowTypeOptions"
          width="400"
          :theme="currentTheme"
          :size="currentSize"
        />

        <s-checkbox
          v-model="agreeItems"
          :options="checkboxOptions"
          :theme="currentTheme"
          :size="currentSize"
          :disabled="isDisabled"
          :show-type="checkboxShowType"
        />
      </s-flex>
      <div class="overview-stack">
        <div class="overview-tags">
          <s-tag
            v-for="item in tagOptions"
            :key="item.value"
            :theme="currentTheme"
            :size="currentSize"
            :value="item.value"
            :options="tagOptions"
            :config="{ label: 'label', value: 'value' }"
            :primary="['running']"
            :warning="['pending']"
            :danger="['error']"
          />
        </div>
      </div>
    </section>

    <section class="overview-section">
      <s-title title="数据展示" :theme="currentTheme" />
      <div class="overview-grid overview-grid--display">
        <s-card title="s-descriptions组件" :theme="currentTheme" :size="currentSize" shadow="hover">
          <s-descriptions :options="descOptions" :theme="currentTheme" :column="2" show-all />
        </s-card>
        <s-card title="容量水位" :theme="currentTheme" :size="currentSize" shadow="hover">
          <s-progress :percentage="quotaValue" />
          <div class="overview-progress-text">当前使用 {{ quotaValue }}%</div>
        </s-card>
      </div>
      <s-table
        class="overview-table"
        :data="tableData"
        :columns="tableColumns"
        :theme="currentTheme"
        :size="currentSize"
        :total="30"
      />
    </section>

    <section class="overview-section">
      <s-title title="反馈组件" :theme="currentTheme" />
      <div class="overview-actions">
        <s-button
          type="primary"
          :theme="currentTheme"
          :size="currentSize"
          :disabled="isDisabled"
          icon="tabler:folder-open"
          @click="showDialog = true"
        >
          打开弹窗
        </s-button>
        <s-popconfirm title="确认提交当前配置吗？" :theme="currentTheme" :disabled="isDisabled">
          <s-button :theme="currentTheme" :size="currentSize" :disabled="isDisabled" icon="tabler:tooltip">
            popconfirm
          </s-button>
        </s-popconfirm>
        <s-empty description="暂无更多数据" :theme="currentTheme" width="72" />
      </div>
    </section>
    <s-title title="icon" :theme="currentTheme">
      <s-icon :theme="currentTheme" icon="tabler:layout-dashboard" hover-animation size="40" type="primary" />
      <s-icon :theme="currentTheme" icon="tabler:user" type="danger" hover-animation size="40" />
      <s-icon :theme="currentTheme" icon="tabler:settings" type="info" hover-animation size="40" />
      <s-icon :theme="currentTheme" icon="tabler:search" type="default" hover-animation size="40" />
      <s-icon :theme="currentTheme" icon="tabler:trash" type="warning" hover-animation size="40" />
      <s-icon :theme="currentTheme" icon="el-icon-plus" type="info" hover-animation size="40"></s-icon>
      <s-button :theme="currentTheme" icon="tabler:layout-dashboard" hover-animation size="40" type="primary" />
      <s-button :theme="currentTheme" icon="tabler:user" type="danger" hover-animation />
      <s-button :theme="currentTheme" icon="tabler:settings" type="info" hover-animation />
      <s-button :theme="currentTheme" icon="tabler:search" type="default" hover-animation />
      <s-button :theme="currentTheme" icon="tabler:trash" type="warning" hover-animation />
      <s-button :theme="currentTheme" icon="el-icon-plus" type="info" hover-animation></s-button>
    </s-title>
    <s-title title="tag">
      <s-tag :theme="currentTheme" class="m-r-8" type="primary">默认</s-tag>
      <s-tag :theme="currentTheme" class="m-r-8" type="warning">警告</s-tag>
      <s-tag :theme="currentTheme" class="m-r-8" type="danger">危险</s-tag>
      <s-tag :theme="currentTheme" class="m-r-8" type="info">未知</s-tag>
    </s-title>

    <s-title title="pagination">
      <s-pagination v-model:current-page="currentPage" :theme="currentTheme" :total="80" :page-size="10" />
    </s-title>

    <s-dialog v-model="showDialog" title="主题预览" :theme="currentTheme" width="520">
      当前总览页正在使用 {{ currentTheme }} 主题。
    </s-dialog>
  </div>
</template>

<style scoped lang="scss">
.overview-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.overview-toolbar {
  position: sticky;
  top: 64px;
  z-index: 999;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 0;
  background: var(--vp-c-bg);
}

.overview-toolbar__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-regular);
}

.overview-section {
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.overview-grid {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.overview-grid--form {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: center;
}

.overview-grid--display {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.overview-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.overview-tags,
.overview-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.overview-switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 32px;
  color: var(--el-text-color-regular);
}

.overview-progress-text {
  margin-top: 12px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.overview-table {
  margin-top: 16px;
}

.overview-actions :deep(.el-empty) {
  padding: 0;
}

@media (max-width: 640px) {
  .overview-toolbar {
    justify-content: flex-start;
    overflow-x: auto;
  }

  .overview-grid--form,
  .overview-grid--display {
    grid-template-columns: 1fr;
  }
}
</style>
