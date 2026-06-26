<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
const isShow = ref(false)
const c = ref()

console.log(`7行 docs/components/test/base.vue 1 `, 1);

</script>

<template>
  <div>
    <el-input v-model="cc" v-copy="cc"></el-input>
    1233334455
    <div></div>

    <el-button type="primary" size="small">测试02</el-button>
    <s-button theme="chenghua" size="small" type="primary"></s-button>
    <!-- <s-table></s-table> -->
    <s-empty description="暂无数据" width="48" height="48"></s-empty>

    <el-dialog title="33"></el-dialog>
    <s-dialog
      v-model="isShow"
      title2="12321"
      theme="chenghua"
      type="drawer"
      confirmText=""
      :show-confirm="false"
    ></s-dialog>

    <s-tag theme="chenghua">我不服</s-tag>

    <s-flex justify="space-between2的撒"></s-flex>

    <SItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></SItem>
    <hr />
    <SItem label="label" value="value"></SItem>
    <s-title title="插槽用法" tb="8"></s-title>
    <s-item class="abc">
      <template #img>
        <img src="https://img.yzcdn.cn/vant/logo.png" />
      </template>
      <template #label>label</template>
      <template #value>value</template>
    </s-item>

    <s-date-picker></s-date-picker>

    <s-input v-model="cc" height="30" size="large" :clearable="false" theme="chenghua"></s-input>

    <!-- <s-select multiple label="1" ></s-select> -->
  </div>
</template>
