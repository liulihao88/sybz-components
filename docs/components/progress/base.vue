<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-progress :percentage="80"></s-progress>
    <br />
    <s-progress :percentage="50" :indeterminate="true" color="blue" ></s-progress>
    <br />
    <s-progress :percentage="50" :indeterminate="true"  :stroke-width="10" :show-text="false"></s-progress>
    <br />
    <s-progress type="circle" :percentage="25"></s-progress>
    <br />
    <s-progress type="circle" :percentage="60" :stroke-width="10"></s-progress>
  </div>
</template>

<style scoped lang="scss"></style>
