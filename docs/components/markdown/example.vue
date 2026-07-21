<script setup lang="ts">
const source = `"近30天（2026-06-14 20:00至2026-07-13 20:00）各产线平均制程一次合格率如下：\n1. LINE-03：98.38%\n2. LINE-12：98.10%\n3. LINE-07：98.06%\n4. LINE-05：98.02%\n5. LINE-09：98.00%\n\n整体平均一次合格率为98.11%，最高为LINE-03，最低为LINE-09 [REF-DATA-FIRST-PASS-YIELD-80D3CEF3]。\n\n![近30天各产线平均制程一次合格率对比]()\n\n## 制程一次合格率对比\n\n![制程一次合格率对比](/api/v1/files/download?file_id=FILE-e67a6c85fc20429180ee88de5ff1e367&user_id=E001)\n",`
</script>

<template>
  <s-markdown :source="source" allow-html />
</template>
