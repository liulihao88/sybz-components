<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ keyword: '' })
</script>

<template>
  <div class="icon-dimensions-demo">
    <div>
      <p>height="40"：40 × 40；width="40"：40 × 40；width="80" height="40"：80 × 40。</p>
      <s-icon icon="search" height="40" type="primary" variant="solid" />
      <s-icon icon="search" width="40" type="primary" variant="solid" />
      <s-icon icon="search" width="80" height="40" type="primary" variant="solid" />
    </div>
    <el-form :model="model" label-width="60px">
      <el-form-item label="搜索">
        <div class="icon-dimensions-demo__field">
          <s-input v-model="model.keyword" height="100%" placeholder="请输入关键词" />
          <s-icon icon="search" height="100%" type="primary" variant="solid" content="搜索" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.icon-dimensions-demo {
  display: grid;
  gap: 24px;
}

.icon-dimensions-demo__field {
  display: flex;
  gap: 8px;
  width: 100%;
  height: 40px;
}

.icon-dimensions-demo__field > .s-input {
  flex: 1;
  min-width: 0;
}
</style>
