# Skills 使用说明

## 推荐接入方式（Claude Code、Cursor、Codex 通用）

业务项目安装 `sybz-components` 后，不需要改变开发者习惯，也不需要把规则强制安装到某个 AI 工具的全局目录。推荐把下面这段项目约定放在业务项目根目录的规则文件中：

- Claude Code：`CLAUDE.md`
- Cursor：`.cursor/rules/sybz-components.mdc`（旧版也可使用项目根目录的 `.cursorrules`）
- Codex 或其他支持项目规则的工具：`AGENTS.md`

同一个项目可以同时保留这些文件；内容保持一致即可。不要把规则写死为只能读取 `.codex` 目录。

如果 `./node_modules/sybz-components/skills/sybz-components/SKILL.md` 不存在，请先安装或更新依赖：

<div class="skill-rule-code-anchor"></div>

```md
## 当前项目使用 sybz-components 组件库规范

本项目使用 `sybz-components` 组件库。处理文件时，请先判断任务是否涉及 `sybz-components`、`@sybz-components/utils`、Element Plus 组件迁移、主题或组件示例：涉及这些内容时，先阅读并遵循 `./node_modules/sybz-components/skills/sybz-components/SKILL.md`；涉及具体组件、工具函数或主题时，再按需阅读该 skill 的 `references/` 目录下相关规范。普通业务逻辑（例如接口请求、状态计算、数据转换、路由或与组件库无关的 JS/TS 工具代码）不要求读取这份 skill。若普通逻辑文件直接引入或调用 `@sybz-components/utils`，则按工具函数场景处理。修改前先检查当前项目已有实现，保留已有配置，只补充缺失的组件注册、样式导入和 Vite 插件。
```

::: code-group

```sh [pnpm]
pnpm add sybz-components
```

```sh [bun]
bun add sybz-components
```

```sh [npm]
npm install sybz-components
```

:::
这样 Claude Code、Cursor、Codex 以及其他支持项目级规则的 AI 工具，都可以从当前项目依赖中读取同一份规范。

## 路径说明

当前包会把 skill 源文件随 npm 包一起发布。业务项目安装依赖后，规范文件位于：

```sh
./node_modules/sybz-components/skills/sybz-components/SKILL.md
```

相关参考文件位于：

```sh
./node_modules/sybz-components/skills/sybz-components/references/
```

这套方式不依赖 `.codex` 目录，也不要求使用者额外执行全局安装命令。AI 工具只要能读取项目规则文件，并能访问 `node_modules`，就可以按规则找到当前组件库的 skill。

## 暴露路径

当前包通过 `package.json` 暴露了以下 skill 文件：

```json
{
  "./skills/sybz-components": "./skills/sybz-components/SKILL.md",
  "./skills/sybz-components/*": "./skills/sybz-components/*"
}
```

对应内容包括：

- `skills/sybz-components/SKILL.md`：主 skill 说明
- `skills/sybz-components/references/components.md`：组件使用参考
- `skills/sybz-components/references/utils.md`：工具函数参考
- `skills/sybz-components/references/themes.md`：主题总说明
- `skills/sybz-components/references/chenghua-ui.md`：成华主题规范
- `skills/sybz-components/references/shijingshan-ui.md`：石景山主题规范

## 可选：安装到 AI 工具的全局目录

如果希望某个 AI 工具在任意项目中都能自动发现该 skill，可以额外复制到该工具的全局规则目录。Codex 可执行：

```sh
pnpm skills:install
```

该命令会把当前仓库的 `skills/sybz-components` 复制到：

```sh
~/.codex/skills/sybz-components
```

业务项目中也可以执行：

```sh
node ./node_modules/sybz-components/scripts/install-sybz-skill.mjs
```

这是特定工具的增强用法，不是跨工具的默认推荐方式；跨 Claude Code、Cursor、Codex 协作时，优先使用项目根目录规则文件。

## 适用场景

当你希望 AI 助手在业务项目中执行以下任务时，可以使用该 skill：

- 将 Element Plus 组件迁移为 `sybz-components` 组件
- 优先使用 `@sybz-components/utils` 中已有工具函数
- 按 `chenghua` 或 `shijingshan` 主题规范开发页面
- 查询组件属性、默认值、示例写法和主题差异
- 清理迁移后多余的 import、样式和辅助函数
