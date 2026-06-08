<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-title title="左侧" tb="10" l="10">
      <span class="ml2">左侧的slot</span>
      <template #right>
        <el-button type="primary">右侧的button</el-button>
        <el-button type="primary">右侧的button2</el-button>
        <el-button type="primary">右侧的button3</el-button>
        <el-button type="primary">右侧的button4</el-button>
      </template>
    </s-title>

    <s-title title="icon" type="simple">
      <template #icon>
        <s-icon name="plus"></s-icon>
      </template>
    </s-title>
  </div>
</template>
