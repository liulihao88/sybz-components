# Skills 使用说明

## 推荐使用方式

业务项目安装 `sybz-components` 后，不需要改变使用者习惯，也不需要强制安装到 `.codex` 目录。推荐在业务项目根目录的 `AGENTS.md` 中加入下面这段说明：

```md
## 当前项目 使用 sybz-components 组件库规范

本项目使用 `sybz-components` 组件库。处理本项目任意文件时，必须先阅读并遵循 `./node_modules/sybz-components/skills/sybz-components/SKILL.md` 中的要求；涉及组件、工具函数、主题、迁移或示例写法时，还必须按需阅读并遵循该 skill 的 `references/` 目录下相关规范。
```

如果 `./node_modules/sybz-components/skills/sybz-components/SKILL.md` 不存在，请先安装或更新依赖：

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
这样 Codex、Cursor 或其他能读取 `AGENTS.md` / 项目规则的 AI 工具，都可以从当前项目依赖中找到这份规范。

## 路径说明

当前包会把 skill 源文件随 npm 包一起发布。业务项目安装依赖后，规范文件位于：

```sh
./node_modules/sybz-components/skills/sybz-components/SKILL.md
```

相关参考文件位于：

```sh
./node_modules/sybz-components/skills/sybz-components/references/
```

这套方式不依赖 `.codex` 目录，也不要求使用者额外执行安装命令。AI 工具只要能读取项目根目录规则，并能访问 `node_modules`，就可以按规则找到当前组件库的 skill。

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

## 可选：安装到 Codex 全局目录

如果希望 Codex 在任意项目中都能自动发现该 skill，可以额外执行：

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

这是 Codex 的增强用法，不是默认推荐用法。

## 适用场景

当你希望 AI 助手在业务项目中执行以下任务时，可以使用该 skill：

- 将 Element Plus 组件迁移为 `sybz-components` 组件
- 优先使用 `@sybz-components/utils` 中已有工具函数
- 按 `chenghua` 或 `shijingshan` 主题规范开发页面
- 查询组件属性、默认值、示例写法和主题差异
- 清理迁移后多余的 import、样式和辅助函数
