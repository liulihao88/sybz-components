# Overview 组件总览

<script setup lang="ts">
import { buildVscodeFileUrl, getSourceDir, joinLocalPath } from '../../.vitepress/theme/utils/localFile'

const sourceDir = getSourceDir()
const overviewDemoUrl = sourceDir
  ? buildVscodeFileUrl(joinLocalPath(sourceDir, 'docs/components/overview/OverviewDemo.vue'))
  : undefined
</script>

## Hidden Title {.md-hidden}

组件总览用于集中查看常用组件在不同业务主题下的展示效果。默认主题为 `default`，可以切换到 `chenghua` 和 `shijingshan`。

<!-- prettier-ignore-start -->
<s-button
  :href="overviewDemoUrl"
  :disabled="!overviewDemoUrl"
  target="_blank"
  theme="shijingshan"
  size="small"
>
  在 VS Code 中打开 OverviewDemo
</s-button>
<!-- prettier-ignore-end -->

<OverviewDemo />
