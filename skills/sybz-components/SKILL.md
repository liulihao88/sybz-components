---
name: sybz-components
description: 在 Vue 项目中接入、使用或迁移到 sybz-components 与 @sybz-components/utils，或应用 chenghua/shijingshan 主题时使用。
license: MIT
---

# sybz-components

用中文交付。先检查项目现状，只改用户范围内的代码；复用组件库能力和默认值，删除迁移后无用的 import、模板、样式与辅助逻辑，不主动 build。

## 按需读取（只读当前任务需要的文件）

- 首次接入/全局配置：[references/setup.md](references/setup.md)
- 组件选择、迁移、示例：[references/components.md](references/components.md)
- `s-icon`：[references/icon.md](references/icon.md)
- 工具函数：[references/utils.md](references/utils.md)
- 主题：读 [references/themes.md](references/themes.md) 后只读一个目标主题文件。

## 通用规则

- 优先 `sybz-components`，不拆回 Element Plus 子组件；优先 `@sybz-components/utils`，不重复实现通用逻辑。
- 只传业务必要属性；不重复默认宽度、空态、分页、样式、尺寸、`clearable` 等默认值，不加无收益的包装、泛型或中间变量。
- 表单、表格优先配置化；仅在配置无法表达时使用插槽或 `render`。
- 样式以组件库为准；仅业务明确要求时保留旧页面像素样式。主题通过 `theme` 和 token 实现，避免散落硬编码色。
- API 不确定时检索当前项目源码、类型和文档，不凭示例猜测。
- 修改后运行已有 typecheck/lint（不主动 build/docsbuild）；交付时简述组件、utils、主题、删减项和校验。
