<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
</script>

<template>
  <s-title title="是否使用深色模式" b="24">
    <s-radio v-model="isDark" :options="[true, false]" />
  </s-title>
  <el-space wrap>
    <s-button color="red" :dark="isDark" disabled>red</s-button>
    <s-button color="yellow" :dark="isDark">yellow</s-button>
    <s-button color="blue" :dark="isDark">blue</s-button>
    <s-button color="green" :dark="isDark">green</s-button>

    <s-button color="#626aef" :dark="isDark">Default</s-button>
    <s-button color="#626aef" :dark="isDark" plain>Plain</s-button>
    <s-button color="#626aef" :dark="isDark" link>Link</s-button>
    <s-button color="#626aef" :dark="isDark" text>Text</s-button>
    <s-button color="#626aef" :dark="isDark" text bg>Text BG</s-button>

    <s-button color="#626aef" :dark="isDark" disabled>Disabled</s-button>
    <s-button color="#626aef" :dark="isDark" disabled plain> Disabled Plain </s-button>
    <s-button color="#626aef" :dark="isDark" disabled link> Disabled Link </s-button>
    <s-button color="#626aef" :dark="isDark" disabled text> Disabled Text </s-button>
    <s-button color="#626aef" :dark="isDark" disabled text bg> Disabled Text BG </s-button>
  </el-space>
</template>
