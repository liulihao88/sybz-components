<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
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
    <s-icon name="delete"></s-icon>
    <s-icon name="warning" content="警告"></s-icon>
    <s-icon name="refresh" content="刷新" @click="tt" color="var(--yellow)" size="50" placement="right"></s-icon>
    <s-icon name="close" class="is-loading"></s-icon>
    <s-icon name="refresh" content="刷新" class="text-[var(--blue)]"></s-icon>

    <hr />

    <div>
      <template v-for="(v, i) in iconLists" :key="i">
        <s-icon :name="v" :content="v"></s-icon>
      </template>
    </div>

    <hr />
    <s-title title="支持首字母大写, 驼峰, 中划线命名"></s-title>
    <s-icon name="AddLocation"></s-icon>
    <s-icon name="addLocation"></s-icon>
    <s-icon name="add-location"></s-icon>
    <br />
  </div>
</template>

<style scoped lang="scss"></style>
