<template>
  <div class="item-demo-list">
    <SItem
      title="多行副标题"
      sub-title="副标题可能来自接口中的长段落。设置 sub-title-lines 后，可稳定显示两行或三行；只有实际溢出时，鼠标移入才会显示完整内容。"
      :sub-title-lines="2"
      align="start"
      extra="两行"
      border
    >
      正文区域也可以放标签、按钮、状态或任意业务内容。
    </SItem>

    <SItem
      title="不限制行数"
      sub-title="title-lines 和 sub-title-lines 传 0 时不做截断，内容会自然撑开信息项。这个模式适合公告、说明和描述长度不可预期的场景。"
      :sub-title-lines="0"
      align="start"
      border
    />
  </div>
</template>

<style scoped>
.item-demo-list {
  display: grid;
  gap: 12px;
  max-width: 680px;
}
</style>
