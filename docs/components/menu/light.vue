<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, ChatDotRound, Document, FolderOpened, Plus, Right } from '@element-plus/icons-vue'

const active = ref('/chat')
const headerConfig = { title: '合同智管', icon: Document }
const actionConfig = { text: '新建对话', icon: Plus }
const footerConfig = { title: '管理员用户', subtitle: '系统管理员', avatar: '管' }
const handleNewChat = () => {
  active.value = '/chat'
}
const menus = [
  {
    type: 'group',
    title: '功能菜单',
    children: [
      { path: '/chat', title: '智能对话', icon: ChatDotRound, suffixIcon: Right },
      { path: '/contracts', title: '合同管理', icon: FolderOpened },
      { path: '/warning', title: '履约预警', icon: Calendar },
      { path: '/templates', title: '模板库', icon: Document },
    ],
  },
  {
    type: 'group',
    title: '历史记录 · 今日',
    children: [
      {
        path: '/history/create',
        title: '采购合同生成与付款节点确...',
        icon: Document,
        tag: '生成',
        tagColor: '#3979c9',
      },
      { path: '/history/extract', title: '技术服务合同信息提取', icon: Document, tag: '提取', tagColor: '#8758d5' },
    ],
  },
  {
    type: 'group',
    title: '昨天',
    children: [
      {
        path: '/history/review',
        title: '数字内容服务合同风险审查',
        icon: 'CircleCheck',
        tag: '审查',
        tagColor: '#1677d2',
        detail: {
          tag: '审查记录',
          title: '数字内容服务合同风险审查',
          description: '16:28 · 发现 3 项风险',
        },
      },
    ],
  },
  {
    type: 'group',
    title: '近7天',
    children: [
      { path: '/history/compare', title: '供应商框架协议版本比对', icon: Document, tag: '比对', tagColor: '#008f83' },
    ],
  },
]
</script>

<template>
  <SMenu
    v-model="active"
    variant="light"
    :options="menus"
    :router="false"
    :header-config="headerConfig"
    :action-config="actionConfig"
    :footer-config="footerConfig"
    width="360px"
    height="760px"
    @action-click="handleNewChat"
  />
</template>
