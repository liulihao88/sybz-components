<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const language = ref<'zh-cn' | 'en'>('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const size = ref<'small' | 'default' | 'large'>('default')
const buttonPlain = ref(false)
const tablePage = ref(true)
const clearable = ref(true)
const disabled = ref(false)
const inputValue = ref('可清空的内容')
const padding = ref<'small' | 'default' | 'large'>('small')
</script>

<template>
  <s-config-provider size="small">
    <s-radio v-model="language" :options="['zh-cn', 'en']" type="simple" title="locale：语言（Element Plus 默认 en）" />
    <s-radio
      v-model="size"
      :options="['small', 'default', 'large']"
      type="simple"
      title="size：全局尺寸（默认 default）"
    />
    <s-switch v-model="buttonPlain" title="button.plain：按钮朴素样式（默认 false）" />
    <s-switch v-model="tablePage" title="table.showPage：sybz 表格分页（默认 true）" />
    <s-switch v-model="clearable" title="clearable：输入类组件清空按钮（true / false；默认继承组件自身）" />
    <s-switch v-model="disabled" title="disabled：禁用子组件（true / false；默认 false）" />
    <s-radio
      v-model="padding"
      :options="['small', 'default', 'large']"
      type="simple"
      title="p：Provider 容器内边距（small / default / large；默认不设置）"
    />
  </s-config-provider>

  <s-config-provider
    :locale="locale"
    :size="size"
    :clearable="clearable"
    :disabled="disabled"
    :p="padding"
    bg="var(--el-fill-color-light)"
    :button="{ plain: buttonPlain }"
    :table="{ showPage: tablePage }"
  >
    <s-flex gap="small" direction="column">
      <s-button type="primary">局部按钮配置</s-button>
      <s-input v-model="inputValue" placeholder="观察清空与禁用状态" />
      <s-pagination :total="100" />
      <s-table :columns="[{ label: '名称', prop: 'name' }]" :data="[{ name: '局部表格配置' }]" :total="1" />
      <s-config-provider :button="{ plain: false }">
        <s-button type="primary">嵌套覆盖 plain</s-button>
      </s-config-provider>
    </s-flex>
  </s-config-provider>
</template>
