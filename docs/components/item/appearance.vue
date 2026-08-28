<template>
  <div class="item-demo-list">
    <SItem
      title="自定义卡片外观"
      sub-title="background、border 和 border-radius 可直接控制根节点"
      background="#f3f8ff"
      hover-background="#e8f2ff"
      border="1px solid #a8cbff"
      border-radius="14"
      clickable
    />

    <SItem
      title="渐变背景"
      sub-title="background 接收完整的 CSS background，线性渐变和径向渐变均可直接使用"
      background="linear-gradient(135deg, #eaf4ff 0%, #f3edff 52%, #fff1ec 100%)"
      hover-background="linear-gradient(135deg, #ddecff 0%, #ebe2ff 52%, #ffe8df 100%)"
      border="1px solid rgba(124, 104, 238, 0.22)"
      border-radius="14"
      clickable
    />

    <SItem
      title="列表分割线"
      sub-title="border=false 时不显示外框，divider 只保留底部分隔"
      :border="false"
      divider
      padding="12px 4px"
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
