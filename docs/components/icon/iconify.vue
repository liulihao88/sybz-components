<script setup lang="ts">
import { addIconifyIcon } from 'sybz-components'

// 可选：内网或离线项目可以提前注册图标数据，注册后不会请求 Iconify API。
addIconifyIcon('project:rocket', {
  width: 24,
  height: 24,
  body: '<path fill="currentColor" d="M12 2c3.2 1.5 5.1 4.4 5.4 8.1l2.1 2.1-3.2 1.1-.7 2.2-2.2.7-1.1 3.2-2.1-2.1C6.5 17 3.6 15.1 2 12c2.3-1.5 4.8-2.4 7.4-2.6C9.7 6.8 10.6 4.3 12 2Zm2 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>',
})
</script>

<template>
  <div class="iconify-demo">
    <div class="iconify-demo__item">
      <!-- 最简单的在线用法：检测到名称包含冒号后自动使用 Iconify。 -->
      <s-icon name="tabler:home" size="28" content="Tabler Icons" />
      <span>Tabler 默认推荐</span>
    </div>

    <div class="iconify-demo__item">
      <!-- 需要明确指定来源时，可以传 source="iconify"。 -->
      <s-icon name="tabler:search" source="iconify" size="28" type="primary" content="Tabler Icons" />
      <span>指定来源</span>
    </div>

    <div class="iconify-demo__item">
      <!-- 单色图标使用 currentColor，可以通过 type 或 color 修改颜色。 -->
      <s-icon name="tabler:book" size="28" type="success" />
      <span>语义颜色</span>
    </div>

    <div class="iconify-demo__item">
      <!-- iconifyAttrs 会直接传给 Iconify Icon。 -->
      <s-icon name="tabler:login" size="28" :iconify-attrs="{ flip: 'horizontal' }" />
      <span>水平翻转</span>
    </div>

    <div class="iconify-demo__item">
      <!-- logos 图标集通常自带多种颜色，设置 color 不一定会改变它。 -->
      <s-icon name="logos:vue" size="28" content="多彩图标" />
      <span>多彩图标</span>
    </div>

    <div class="iconify-demo__item">
      <!-- project:rocket 已在 script 中注册，可在无网络环境下使用。 -->
      <s-icon name="project:rocket" size="28" type="danger" content="离线注册" />
      <span>离线图标</span>
    </div>
  </div>
</template>

<style scoped>
.iconify-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  gap: 20px;
}

.iconify-demo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-regular);
  font-size: 13px;
}
</style>
