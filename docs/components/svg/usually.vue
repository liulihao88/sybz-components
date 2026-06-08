<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <s-svg name="icon_file-cloud-line" :customStyle="{ width: '100px', height: '100px', color: 'red' }"></s-svg>

    <s-svg name="403" :customStyle="{ width: '100px', height: '100px', color: 'red' }"></s-svg>
    <s-svg name="hot" :customStyle="{ width: '100px', height: '100px', color: 'blue' }"></s-svg>
    <s-svg name="back" :customStyle="{ width: '100px', height: '100px', color: 'blue' }"></s-svg>
    <s-svg name="service" :customStyle="{ width: '100px', height: '100px', color: 'blue' }"></s-svg>
    <s-svg name="dialog3" :customStyle="{ width: '100px', height: '100px', color: 'red' }"></s-svg>
  </div>
</template>
