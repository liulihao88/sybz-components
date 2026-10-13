<template>
  <div class="title-icon-attrs-demo">
    <s-title title="默认图标" icon="mdi:ab-testing" />
    <s-title
      title="自定义图标大小、颜色和旋转角度"
      icon="mdi:ab-testing"
      fs="100px"
      :icon-attrs="{ size: '100%', color: 'red', rotate: 15, cursor: 'pointer' }"
    />
    <s-title title="图标也由 iconAttrs 设置" :icon-attrs="{ icon: 'mdi:star', size: 24, color: '#e6a23c' }" />
  </div>
</template>

<style scoped>
.title-icon-attrs-demo {
  display: grid;
  gap: 12px;
}
</style>
