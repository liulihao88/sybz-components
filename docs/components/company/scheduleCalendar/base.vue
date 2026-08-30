<script setup lang="ts">
import { ref } from 'vue'
import type {
  ScheduleCalendarDay,
  ScheduleCalendarTask,
  ScheduleCalendarView,
} from '@/components/company/scheduleCalendar'

const currentMonth = ref(new Date(2026, 7, 1))
const view = ref<ScheduleCalendarView>('month')
const keyword = ref('')
const type = ref('all')

const tasks: ScheduleCalendarTask[] = [
  {
    id: 1,
    title: '项目启动会',
    date: '2026-08-05',
    type: '会议',
    contractName: '数字内容产业服务平台技术服务合同',
    reminder: '提前1天',
    color: '#7b4cc9',
    backgroundColor: '#f3ecff',
  },
  {
    id: 2,
    title: '首期服务费付款',
    date: '2026-08-12',
    type: '付款',
    contractName: '数字内容产业服务平台技术服务合同',
    reminder: '提前3天',
  },
  {
    id: 3,
    title: '软件交付确认',
    date: '2026-08-12',
    type: '交付',
    contractName: '年度软件采购框架协议',
    reminder: '提前1天',
    color: '#16866f',
    backgroundColor: '#e8f6f2',
  },
  {
    id: 4,
    title: '阶段成果提交',
    date: '2026-08-18',
    type: '交付',
    contractName: '金牛山项目施工合同',
    reminder: '提前7天',
    color: '#16866f',
    backgroundColor: '#e8f6f2',
  },
  {
    id: 5,
    title: '场地租金支付',
    date: '2026-08-25',
    type: '付款',
    contractName: '文儒坊办公场地租赁合同',
    reminder: '提前3天',
  },
  {
    id: 6,
    title: '设备到场验收',
    date: '2026-08-25',
    type: '验收',
    contractName: '金牛山项目施工合同',
    reminder: '提前1天',
  },
  {
    id: 7,
    title: '服务报告提交',
    date: '2026-08-25',
    type: '交付',
    contractName: '数字内容产业服务平台技术服务合同',
    reminder: '当天提醒',
  },
  {
    id: 8,
    title: '第二期服务费付款',
    date: '2026-08-29',
    type: '付款',
    contractName: '数字内容产业服务平台技术服务合同',
    reminder: '当天提醒',
  },
  {
    id: 9,
    title: '质保金退还',
    date: '2026-08-31',
    type: '付款',
    contractName: '年度软件采购框架协议',
    reminder: '提前7天',
  },
]

const handleDayClick = (day: ScheduleCalendarDay) => console.log('点击日期：', day.dateKey)
const handleTaskClick = (task: ScheduleCalendarTask) => console.log('点击任务：', task)
</script>

<template>
  <s-schedule-calendar
    v-model="currentMonth"
    v-model:view="view"
    :tasks="tasks"
    @day-click="handleDayClick"
    @task-click="handleTaskClick"
  >
    <template #filters>
      <s-input v-model="keyword" placeholder="输入或选择合同" clearable style="width: 240px" />
      <s-select v-model="type" style="width: 150px">
        <el-option label="全部类型" value="all" />
        <el-option label="付款节点" value="payment" />
        <el-option label="交付节点" value="delivery" />
      </s-select>
    </template>
  </s-schedule-calendar>
</template>
