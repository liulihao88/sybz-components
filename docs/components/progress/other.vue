<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'PureProgress',
})

const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
const defaultColor = ref(true)
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <s-radio
        v-model="defaultColor"
        :options="[true, false]"
        type="simple"
        title="不使用el-progress默认颜色"
      ></s-radio>
    </template>

    <div class="m-b-16">直线进度条动画</div>
    <div class="w-25%">
      <s-progress indeterminate :percentage="50" class="m-b-16" :custom-color="defaultColor" />
      <s-progress indeterminate :percentage="100" :format="format" class="m-b-16" :custom-color="defaultColor" />
      <s-progress indeterminate :custom-color="defaultColor" :percentage="100" status="success" class="m-b-16" />
      <s-progress indeterminate :percentage="100" :custom-color="defaultColor" status="warning" class="m-b-16" />
      <s-progress indeterminate :percentage="50" status="exception" :custom-color="defaultColor" class="m-b-16" />
    </div>

    <div class="m-b-16">进度条内显示百分比标识</div>
    <div class="w-25%">
      <s-progress :text-inside="true" :stroke-width="26" :percentage="70" class="m-b-16" :custom-color="defaultColor" />
      <s-progress
        :text-inside="true"
        :stroke-width="24"
        :custom-color="defaultColor"
        :percentage="100"
        status="success"
        striped
        striped-flow
        :duration="70"
        class="m-b-16"
      />
      <s-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="80"
        status="warning"
        class="m-b-16"
        :custom-color="defaultColor"
      />
      <s-progress
        :text-inside="true"
        :custom-color="defaultColor"
        :stroke-width="20"
        :percentage="50"
        status="exception"
        striped
        striped-flow
        class="m-b-16"
      />
    </div>

    <div class="m-b-16">自定义内容</div>
    <div class="w-25% demo-progress">
      <s-progress :percentage="50" :custom-color="defaultColor">
        <el-button text>自定义内容</el-button>
      </s-progress>
      <s-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="50"
        status="exception"
        :custom-color="defaultColor"
      >
        <span>自定义内容</span>
      </s-progress>
      <s-progress type="circle" :percentage="100" status="success" :custom-color="defaultColor">
        <el-button type="success" icon="el-icon-check" circle />
      </s-progress>
      <s-progress type="dashboard" :percentage="80" :custom-color="defaultColor">
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">上升率</span>
        </template>
      </s-progress>
    </div>
  </el-card>
</template>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
