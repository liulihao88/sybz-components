<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function close() {
  proxy.$toast('关闭')
}
const iptValue = ref('')
</script>

<template>
  <div>
    <sWrapper :columns="1">
      <s-input v-model="iptValue" content="这里主要是为了让其鼠标移入显示文本">
        <template #prepend>prepend前置插槽</template>
        <template #prefix>prefix前缀插槽</template>
        <template #suffix>suffix后缀插槽</template>
        <template #append>append后置插槽</template>
      </s-input>
      <s-input v-model="iptValue" title="名字" width="500" placeholder="请输入名字" size="default"></s-input>
      <s-input v-model="iptValue" title="密码框" type="password"></s-input>
      <s-input v-model="iptValue" type="textarea"></s-input>
    </sWrapper>
  </div>
</template>

<style scoped lang="scss"></style>
