<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown, ArrowRight, House, Notebook, Operation, Plus, Reading, User } from '@element-plus/icons-vue'

const active = ref('/account')
const menus = [
  { path: '/home', title: '首页', icon: House },
  { path: '/library', title: '题库 / 卷库', icon: Notebook },
  { path: '/knowledge', title: '知识库', icon: Reading },
  { path: '/points', title: '知识点管理', icon: Operation },
  { path: '/account', title: '账号管理', icon: User },
]
const projects = ref([
  {
    id: 'material',
    name: '教材打标',
    count: 6,
    open: true,
    items: [
      { id: 1, title: '一年级上册数学教学准备...', time: '11-23 17:32' },
      { id: 2, title: '随机选两题出题制卷', time: '11-20 13:40' },
      { id: 3, title: '66_数学二年级上册_单元...', time: '11-19 15:34' },
    ],
  },
  { id: '321', name: '32132131321321', count: 11, open: false, items: [] },
])
const recent = [
  { id: 1, title: '一年级上册数学教学准备', time: '11-23 17:03' },
  { id: 2, title: '一年级上册数学学习任务', time: '11-23 16:45' },
  { id: 3, title: '一年级上册数学综合卷生成...', time: '11-23 16:40' },
  { id: 4, title: '三年级基础数学表达讲解附...', time: '11-23 09:41' },
  { id: 5, title: '小学数学习题同题型仿编3道', time: '11-21 23:01' },
]
</script>

<template>
  <SMenu v-model="active" variant="light" :options="menus" :router="false" width="320px" height="680px">
    <template #header>
      <div class="side-brand">
        <span class="side-brand__icon"><SIcon :icon="Reading" :size="24" /></span>
        <strong>智慧教育</strong>
      </div>
    </template>
    <template #append>
      <SButton type="primary" w :icon="Plus">新建任务</SButton>
    </template>

    <div class="side-extra">
      <section class="side-section">
        <div class="side-section__head">
          <strong>项目</strong>
          <SIcon :icon="Plus" :size="18" />
        </div>
        <div v-for="project in projects" :key="project.id" class="project">
          <button class="project__head" type="button" @click="project.open = !project.open">
            <SIcon :icon="project.open ? ArrowDown : ArrowRight" :size="14" />
            <span>{{ project.name }}</span>
            <em>{{ project.count }}</em>
          </button>
          <div v-show="project.open" class="project__list">
            <button v-for="item in project.items" :key="item.id" class="project__item" type="button">
              <span>{{ item.title }}</span>
              <time>{{ item.time }}</time>
            </button>
          </div>
        </div>
      </section>

      <section class="side-section">
        <div class="side-section__head"><strong>最近</strong></div>
        <button v-for="item in recent" :key="item.id" class="project__item" type="button">
          <span>{{ item.title }}</span>
          <time>{{ item.time }}</time>
        </button>
      </section>
    </div>

    <template #footer>
      <div class="side-account">
        <span class="side-account__avatar">a</span>
        <div class="side-account__info">
          <strong>admin</strong>
          <small>管理员</small>
        </div>
        <SButton type="primary" variant="outline" size="small">退出</SButton>
      </div>
    </template>
  </SMenu>
</template>

<style scoped lang="scss">
.side-brand {
  display: flex;
  gap: 12px;
  align-items: center;
}
.side-brand__icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid #c9d9ec;
  border-radius: 10px;
  color: #2f6fed;
}
.side-brand strong {
  color: #193957;
  font-size: 22px;
}
.side-extra {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 8px;
}
.side-section__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.side-section__head strong {
  color: #193957;
  font-size: 16px;
}
.project + .project {
  margin-top: 6px;
}
.project__head {
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 6px 0;
  color: #193957;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}
.project__head span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.project__head em {
  display: grid;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  place-items: center;
  border-radius: 11px;
  background: #eef4ff;
  color: #2f6fed;
  font-size: 12px;
  font-style: normal;
}
.project__list {
  margin-left: 7px;
  padding-left: 12px;
  border-left: 1px solid #dce5ef;
}
.project__item {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  color: #334155;
  font-size: 14px;
  text-align: left;
}
.project__item span {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.project__item time {
  flex: none;
  color: #8da0b8;
  font-size: 12px;
}
.project__item:hover {
  color: #2f6fed;
}
.side-account {
  display: flex;
  gap: 10px;
  align-items: center;
}
.side-account__avatar {
  display: grid;
  width: 42px;
  height: 42px;
  flex: none;
  place-items: center;
  border-radius: 50%;
  background: #111827;
  color: #fff;
  font-size: 20px;
}
.side-account__info {
  flex: 1;
  min-width: 0;
}
.side-account__info strong,
.side-account__info small {
  display: block;
}
.side-account__info strong {
  color: #193957;
  font-size: 14px;
}
.side-account__info small {
  margin-top: 2px;
  color: #8da0b8;
  font-size: 12px;
}

// 自定义头尾不像内置 header/footer 那样有折叠样式，需要自己处理收起和展开过程。
:global(.s-menu.is-collapse .s-menu__append),
:global(.s-menu.is-expanding .s-menu__append) {
  display: none;
}
:global(.s-menu.is-collapse .side-brand),
:global(.s-menu.is-expanding .side-brand) {
  justify-content: center;
}
:global(.s-menu.is-collapse .side-brand strong),
:global(.s-menu.is-expanding .side-brand strong) {
  display: none;
}
:global(.s-menu.is-collapse .side-brand__icon),
:global(.s-menu.is-expanding .side-brand__icon) {
  width: 32px;
  height: 32px;
}
:global(.s-menu.is-collapse .side-account),
:global(.s-menu.is-expanding .side-account) {
  justify-content: center;
}
:global(.s-menu.is-collapse .side-account__info),
:global(.s-menu.is-expanding .side-account__info),
:global(.s-menu.is-collapse .side-account .el-button),
:global(.s-menu.is-expanding .side-account .el-button) {
  display: none;
}
:global(.s-menu.is-collapse .side-account__avatar),
:global(.s-menu.is-expanding .side-account__avatar) {
  width: 32px;
  height: 32px;
}
</style>
