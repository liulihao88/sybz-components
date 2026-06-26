<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@sybz-components/utils'
const handleClick = () => {
  $toast('handleClick')
}
</script>

<template>
  <div>
    <el-button :time="1000" @click="handleClick">
      <template #icon>
        <s-icon name="delete"></s-icon>
      </template>
      男人
    </el-button>
    <s-button :time="1000" type="primary" @click="handleClick">
      <template #icon>
        <s-icon name="delete"></s-icon>
      </template>
      男人(s-button)
    </s-button>

    <!-- loading插槽 -->
    <el-button loading @click="handleClick">
      <template #loading>
        <s-icon name="refresh"></s-icon>
      </template>
      我是loading插槽
    </el-button>

    <s-button loading type="primary" @click="handleClick">
      <template #loading>
        <s-icon name="refresh"></s-icon>
      </template>
      我是loading插槽(s-button)
    </s-button>
  </div>
</template>
