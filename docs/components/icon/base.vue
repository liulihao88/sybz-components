<script setup lang="ts">
import { ref } from 'vue'
function tt() {
  console.log('  </s-tooltip>')
}
function isTest13() {
  console.log('isTest13')
}

const iconLists = ref([
  'edit',
  'check',
  'delete',
  'warning',
  'refresh',
  'close',
  'add-location',
  'arrow-up',
  'arrow-right',
  'arrow-down',
  'arrow-left',
  'plus',
  'circle-close',
  'more',
  'zoom-in',
  'zoom-out',
  'lock',
  'unlock',
])
</script>

<template>
  <div>
    <s-icon icon="delete"></s-icon>
    <s-icon icon="warning" content="警告"></s-icon>
    <s-icon icon="info-filled" content="支持 <code>HTML</code> 提示" :dangerouslyUseHTMLString="true"></s-icon>
    <s-icon icon="refresh" content="刷新" color="var(--yellow)" size="50" placement="right" @click="tt"></s-icon>
    <s-icon icon="loading" class="is-loading"></s-icon>
    <s-icon icon="refresh" content="刷新" class="cl-blue"></s-icon>

    <hr />

    <div>
      <template v-for="(v, i) in iconLists" :key="i">
        <s-icon :icon="v" :content="v"></s-icon>
      </template>
    </div>

    <hr />
    <s-title title="支持首字母大写, 驼峰, 中划线命名"></s-title>
    <s-icon icon="AddLocation"></s-icon>
    <s-icon icon="addLocation"></s-icon>
    <s-icon icon="add-location"></s-icon>
    <s-icon icon="el-icon-plus"></s-icon>
    <br />
  </div>
</template>

<style scoped lang="scss"></style>
