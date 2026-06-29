<script setup lang="ts">
import { ref } from 'vue'
import SafeHtml from '@/components/utils/SafeHtml.vue'
import { formatTextToHtml, $toast } from '@/utils/src/index'
const parse$toast = (str) => {
  $toast(formatTextToHtml(str), {
    duration: 5000,
    dangerouslyUseHTMLString: true,
  })
}
</script>

<template>
  <s-title title="1. 提示"></s-title>
  <s-button type="primary" @click="parse$toast('Hello\nWorld')">基础</s-button>
  <s-button type="primary" @click="parse$toast('Item1\tItem2')">包含制表符</s-button>
  <s-button type="primary" @click="parse$toast('Error log:\n  Time: 2024-01-01\n  Message: Something went wrong')">
    实际应用场景
  </s-button>
  <s-button
    type="primary"
    @click="
      parse$toast(
        'Example file\n\t  File : 111.jpeg\n\t  CreateTime : 1721011155921 2024-07-15 10:39:15\n\t  LastUpdateTime : 1721011155921 2024-07-15 10:39:15\n------------------------------------------------------------------------\n\tExtract:\n\t  aa=231\n------------------------------------------------------------------------\n',
      )
    "
  >
    实际应用场景2
  </s-button>

  <s-title title="2. 直接在html中使用"></s-title>
  <SafeHtml tag="div" :html="formatTextToHtml('Error log:\n  Time: 2024-01-01\n  Message: Something went wrong')" />
</template>
