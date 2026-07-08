---
name: sybz-components
description: 在 Vue 项目中使用或迁移到 sybz-components 组件库和 @sybz-components/utils 工具库；需要查询组件/函数用法、替换 Element Plus 写法、应用 chenghua 或 shijingshan 主题规范时使用。
license: MIT
---

# sybz-components

本 skill 帮助 Codex 在 Vue 3 项目中优先使用 `sybz-components`、`@sybz-components/utils`，并按组件库已有主题规范交付代码。所有说明、总结、代码注释和交付描述都使用中文。

## 使用前检查

先确认目标项目已安装并注册组件库：

```ts
import SybzComponents from 'sybz-components'
import 'sybz-components/style.css'

app.use(SybzComponents)
```

工具函数从 `@sybz-components/utils` 引入。

## 工作流程

1. 先读当前代码，确认项目已有注册方式、样式约定和组件使用习惯。
2. 需要替换组件时，读取 [references/components.md](references/components.md)。
3. 需要替换工具函数时，读取 [references/utils.md](references/utils.md)。
4. 需要按主题实现 UI 时，先读取 [references/themes.md](references/themes.md)，再按需读取：
   - 成华主题：[references/chenghua-ui.md](references/chenghua-ui.md)
   - 石景山主题：[references/shijingshan-ui.md](references/shijingshan-ui.md)
5. 修改后删除不再需要的 import、类型、样式、计算属性和辅助函数。
6. 交付时说明替换了哪些组件/函数、是否应用主题、运行了哪些校验。

## 核心原则

- 优先使用 `sybz-components` 已有组件，不把能力拆回 Element Plus 子组件。
- 优先使用 `@sybz-components/utils` 已有函数，不重复手写通用逻辑。
- 组件库已有默认属性不重复声明，例如默认宽度、默认空态、默认分页配置、默认样式、默认大小、默认clearable。
- 代码尽量短，能靠组件配置完成的，不额外写复杂类型、泛型、包装函数或中间变量。
- 替换后的样式以组件库用法为准；只有业务明确要求时才保持旧页面像素级样式。
- 主题 UI 要使用组件的 `theme` 属性和主题 token，避免在业务页面零散硬编码主题色。

## 常用检索

```bash
rg "el-table|el-select|el-form|el-descriptions|ElMessage|ElMessageBox|lodash|cloneDeep|debounce|throttle"
```

## 交付格式

完成后用中文简要说明：

1. 替换或新增了哪些 `sybz-components` 组件。
2. 替换或新增了哪些 `@sybz-components/utils` 函数。
3. 应用了哪个主题规范。
4. 删除了哪些多余代码。
5. 已运行或未运行的校验命令。
