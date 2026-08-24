# @sybz-components/portal-dev

成华、石景山门户自动登录与本地前端联调 CLI。支持自动启动项目开发服务、识别图形验证码、登录门户，以及携带门户 Token 打开本地页面。

## 环境要求

- Node.js 18+
- Google Chrome 或 Microsoft Edge
- 目标项目已安装依赖，并提供 `dev` script

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

根据中文提示选择门户、输入账号和密码即可。密码输入时会显示为 `*`。账号配置属于当前电脑用户，与具体项目无关，只需配置一次。

默认配置文件位置：

- macOS / Linux：`~/.config/sybz-components/portal-dev.json`
- Windows：`%APPDATA%\sybz-components\portal-dev.json`

程序会自动创建目录，并尽可能将配置文件权限设为仅当前用户可读写。

配置完成后直接运行：

```bash
portal-dev
```

需要分别配置两个门户时：

```bash
portal-dev config --portal sjs
portal-dev config --portal chenghua
```

## 使用

石景山门户会启动本地开发服务、进入智能体样板间，并携带门户 Token 打开本地页面：

```bash
portal-dev
```

成华门户完成自动登录后进入智能体广场：

```bash
portal-dev --portal chenghua
```

不在项目目录时可以指定项目路径：

```bash
portal-dev --portal sjs --project .
portal-dev --portal chenghua --project .
```

查看命令帮助：

```bash
portal-dev --help
```

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

`portal:release` 会执行检查、升级 patch 版本并发布 npm 包，执行前请确认当前分支和版本状态。
