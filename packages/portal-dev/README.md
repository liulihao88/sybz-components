# @sybz-components/portal-dev

成华、石景山门户自动登录 CLI，也可登录只需用户名和密码的自定义网站，并按需启动石景山门户本地联调。

## 环境要求

- Node.js 18+
- Google Chrome 或 Microsoft Edge

macOS 会直接复用当前打开的 Google Chrome，在现有窗口中新建标签页完成登录和本地联调，不会启动独立的 Chrome 实例。Windows / Linux 使用独立浏览器实例作为兼容方案。

Windows 会优先读取 `CHROME_PATH`，然后自动查找 Chrome 和 Microsoft Edge 的常见安装位置。配置文件优先使用 `%APPDATA%`；自动启动前端项目时通过 `cmd.exe` 运行 npm、pnpm 或 Bun，结束时会清理对应的进程树。

## 安装

全局安装：

```bash
pnpm add -g @sybz-components/portal-dev
```

## 第一次使用（推荐）

全局安装后，在任意目录运行：

```bash
portal-dev config
```

根据中文提示输入账号名称、用户名和密码即可。密码输入时会显示为 `*`。同一个门户可以重复执行该命令保存多个账号；账号名称相同时会更新原账号。

默认配置文件位置：

- macOS / Linux：`~/.config/sybz-components/portal-dev.json`
- Windows：`%APPDATA%\sybz-components\portal-dev.json`

程序会自动创建目录，并尽可能将配置文件权限设为仅当前用户可读写。

配置完成后可以在任意目录直接运行：

```bash
portal-dev
```

需要分别配置两个门户时：

```bash
portal-dev config --portal sjs
portal-dev config --portal chenghua
portal-dev config --portal custom
```

## 使用

列出所有已配置的石景山、成华和自定义网站账号，按下对应按键后直接登录，无需回车：

```bash
portal-dev login
```

`mode: "login"` 登录成功后会立即结束 CLI 并释放终端；如果当前浏览器会话已经登录，会直接视为成功，不再查找登录表单。

示例：

```text
请选择要登录的账号：
  1. 石景山 - 测试账号
  2. 成华 - 管理员
  3. 自定义网站 - 内部系统
请按对应按键（无需回车）：
```

前 9 项使用 `1-9`，第 10 项起使用 `A-Z`，最多支持 35 个账号单键选择。超过 35 个账号或当前终端不支持单键输入时，自动改为输入完整序号后回车。

### 本地调试

修改 `portal-dev` 源码后不需要发布或全局安装，在本包目录直接运行：

```bash
pnpm dev sjs
pnpm dev login
```

该命令直接执行当前源码，效果与发布后的 `portal-dev sjs` 一致。其他参数也可以原样传入，例如：

```bash
pnpm dev --portal sjs
pnpm dev config --portal sjs
pnpm dev --help
```

只登录石景山门户，不读取或启动任何前端项目：

```bash
portal-dev
```

只登录成华门户并进入智能体广场，不读取或启动任何前端项目：

```bash
portal-dev --portal chenghua
```

配置多个账号后，不写账号名称会直接使用数组中的第一个账号：

```bash
portal-dev --portal sjs
```

在命令末尾写账号名称，可以使用指定账号：

```bash
portal-dev --portal sjs 测试账号
```

配置并登录普通网站：

```bash
portal-dev config --portal custom
portal-dev --portal custom 我的账号
```

配置时依次输入登录页 URL、用户名和密码。登录时会自动查找常见的用户名、邮箱、密码输入框，以及“登录”、“Login”或“Sign in”按钮；该模式不会执行验证码识别、样板间搜索或 Token 跳转。

执行 `portal-dev config` 时，可以直接为账号设置快捷别名。石景山账号还可选择“只登录”或“本地联调”模式。例如将某个账号的别名配置为 `sjs-dev`：

```bash
portal-dev config --portal sjs
portal-dev sjs-dev
```

执行时会登录指定账号、在已配置 `project` 时启动本地项目、进入样板间搜索智能体，从匹配的 iframe 地址取得 Token，然后保留查询参数打开本地页面。

`project` 是可选项，只在需要 CLI 自动启动前端开发服务时配置。不配置时不会启动项目，联调流程仍使用默认本地地址 `http://localhost:5173`。

配置文件中，别名、模式和联调参数都直接属于对应账号，不再有独立的 `commands`：

```json
{
  "version": 5,
  "profiles": {
    "sjs": [
      {
        "name": "测试账号",
        "username": "user1",
        "password": "******",
        "alias": "sjs-dev",
        "mode": "dev",
        "project": "/Users/你的名字/projects/agent-web",
        "localOrigin": "http://localhost:5173",
        "localPath": "/exhibition-hall",
        "roomName": "3D智能展厅智能体",
        "iframeHost": "hia.sjsdoubao.com:31118",
        "iframePath": "/exhibition-hall"
      }
    ],
    "chenghua": [
      {
        "name": "成华账号",
        "username": "user2",
        "password": "******",
        "alias": "ch",
        "mode": "login"
      }
    ],
    "custom": [
      {
        "name": "内部系统",
        "loginUrl": "https://example.com/login",
        "username": "user3",
        "password": "******",
        "alias": "internal",
        "mode": "login"
      }
    ]
  }
}
```

首次读取旧版 `version: 4` 配置时，CLI 会自动将 `commands` 合并到对应 profile 并升级为 `version: 5`。

查看命令帮助：

```bash
portal-dev --help
portal-dev help
```

帮助中包含所有命令、参数、单键菜单规则、联调默认值、配置位置、环境变量和常用示例。`portal-dev login --help` 也只会显示帮助，不会打开账号选择菜单。

## 安装 Codex Skill

安装包后执行：

```bash
portal-dev skill install
```

Skill 默认安装到 `~/.codex/skills/portal-dev`。之后可以在 Codex 中直接说：

```text
使用 portal-dev 启动当前项目的石景山门户联调
```

或者：

```text
使用 portal-dev 登录成华门户
```

## 安全说明

- CLI 不会在终端打印用户名、密码或门户 Token。
- 门户 Token 只用于当前浏览器会话，不写入文件。
- 用户级配置文件不位于项目目录，不会随项目提交到 Git；仍不要把它复制进源码或 npm 包。
- `portal-dev config` 输入密码时不会回显明文，也不会在命令历史中留下密码。

## 本仓库开发

在 `sybz-components` 仓库根目录执行：

```bash
pnpm --dir packages/portal-dev check
pnpm portal:skill:install
pnpm portal:release
```

`portal:release` 会检查工作区和 npm 登录状态、升级 patch 版本并公开发布到 npm。只有确认新版本能从 npm registry 查询到之后，才会创建版本提交和 `portal-dev-v<版本号>` Git tag，并将当前分支及 tags 推送到 Git 远端。发布失败时会恢复本地版本号，避免留下无法安装的空版本。执行前请先提交当前改动，并确认当前分支和远端正确。
