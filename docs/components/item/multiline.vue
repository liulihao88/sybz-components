<template>
  <div class="item-demo-list">
    <SItem
      title="多行副标题多行副标题多行副标题多行副标题多行副标题多行副标题多行副标题多行副标题多行副标题多行副标题"
      sub-title="副标题可能来自接口中的长段落。设置 subTitleAttrs.lineClamp 后，可稳定显示两行或三行；只有实际溢出时，鼠标移入才会显示完整内容。副标题可能来自接口中的长段落。设置 subTitleAttrs.lineClamp 后，可稳定显示两行或三行；只有实际溢出时，鼠标移入才会显示完整内容。"
      :sub-title-attrs="{ lineClamp: 2, showAfter: 300, disabled: true }"
      align="start"
      extra="两行"
    >
      正文区域也可以放标签、按钮、状态或任意业务内容。
    </SItem>

    <SItem
      title="不限制行数"
      sub-title="titleAttrs.lineClamp 和 subTitleAttrs.lineClamp 传 0 时不做截断，内容会自然撑开信息项。这个模式适合公告、说明和描述长度不可预期的场景。titleAttrs.lineClamp 和 subTitleAttrs.lineClamp 传 0 时不做截断，内容会自然撑开信息项。这个模式适合公告、说明和描述长度不可预期的场景。titleAttrs.lineClamp 和 subTitleAttrs.lineClamp 传 0 时不做截断，内容会自然撑开信息项。这个模式适合公告、说明和描述长度不可预期的场景。titleAttrs.lineClamp 和 subTitleAttrs.lineClamp 传 0 时不做截断，内容会自然撑开信息项。这个模式适合公告、说明和描述长度不可预期的场景。"
      :sub-title-attrs="{ lineClamp: 0 }"
      align="start"
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
