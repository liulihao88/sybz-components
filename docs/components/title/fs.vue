<template>
  <div class="title-fs-demo">
    <s-title title="小字号标题" fs="small" />
    <s-title title="默认字号标题" fs="default" />
    <s-title title="大字号标题" fs="large" />
    <s-title title="自定义 100px 标题" fs="100px" />
    <s-title title="自定义 100px 标题" fs="100px" icon="mdi:ab-testing" :icon-attrs="{ size: '200px' }" />
    <s-title title="大尺寸布局与小字号标题" size="large" fs="small" />
  </div>
</template>

<style scoped>
.title-fs-demo {
  display: grid;
  gap: 12px;
}
</style>
