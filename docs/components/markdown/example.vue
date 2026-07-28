<script setup lang="ts">
// const source = `"近30天（2026-06-14 20:00至2026-07-13 20:00）各产线平均制程一次合格率如下：\n1. LINE-03：98.38%\n2. LINE-12：98.10%\n3. LINE-07：98.06%\n4. LINE-05：98.02%\n5. LINE-09：98.00%\n\n整体平均一次合格率为98.11%，最高为LINE-03，最低为LINE-09 [REF-DATA-FIRST-PASS-YIELD-80D3CEF3]。\n\n![近30天各产线平均制程一次合格率对比]()\n\n## 制程一次合格率对比\n\n![制程一次合格率对比](/api/v1/files/download?file_id=FILE-e67a6c85fc20429180ee88de5ff1e367&user_id=E001)\n",`

// const source = `"工厂当前全部问题综合分析报告已生成就绪，页面将展示报告文件，你可以直接查看。\n该报告覆盖当前全部23个问题的综合分析内容，可参考编号为[REF-REPORT-REPORT-bbc0cf9641574d6796b386f26373154a]的报告文件。\n\n[下载 PDF 报告](/api/v1/files/download?file_id=REPORT-bbc0cf9641574d6796b386f26373154a&format=pdf&user_id=E001) | [下载 DOCX 报告](/api/v1/files/download?file_id=REPORT-bbc0cf9641574d6796b386f26373154a&format=docx&user_id=E001)\n"`

const source = `
当前最需要优先处理的问题是LINE-12产线D-001设备的<strong>轴承润滑或机械磨损异常</strong>，置信度86%，属于严重故障。

### 优先处置依据
1.  故障已造成明确业务影响：关联停机68分钟，关联抽检缺陷14件
2.  核心异常已同步触发告警：轴承温度连续10分钟超80°C，振动值同步升高至3.1mm/s[ALM-001-01-M]，且温度、振动参数在同一时间窗内同步偏离正常区间[LOG-001-03]

### 立即执行的处置动作
降低负载并检查轴承温度、振动和润滑状态，必要时停机确认
`
</script>

<template>
  <s-markdown :source="source" allow-html :image-preview="false" />
</template>
