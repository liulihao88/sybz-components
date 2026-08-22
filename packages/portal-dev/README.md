# @sybz-components/portal-dev

成华、石景山门户自动登录与本地前端联调 CLI。支持自动启动项目开发服务、识别图形验证码、登录门户，以及携带门户 Token 打开本地页面。

## 环境要求

- Node.js 18+
- Google Chrome 或 Microsoft Edge
- 目标项目已安装依赖，并提供 `dev` script

## 安装

项目内安装：

```bash
pnpm add -D @sybz-components/portal-dev
```

也可以全局安装：

```bash
pnpm add -g @sybz-components/portal-dev
```

## 配置账号

在目标项目的 `.env.local` 中配置个人账号。不要把 `.env.local` 提交到 Git：

```dotenv
SJS_PORTAL_USERNAME=
SJS_PORTAL_PASSWORD=

CHENGHUA_PORTAL_USERNAME=
CHENGHUA_PORTAL_PASSWORD=
```

包内提供了 `.env.portal.example`。CLI 会依次读取目标项目的 `.env.local`、`.env` 和进程环境变量，进程环境变量优先级最高。

## 使用

石景山门户会启动本地开发服务、进入智能体样板间，并携带门户 Token 打开本地页面：

```bash
pnpm exec portal-dev --portal sjs --project .
```

成华门户完成自动登录后进入智能体广场：

```bash
pnpm exec portal-dev --portal chenghua --project .
```

全局安装后可以省略 `pnpm exec`：

```bash
portal-dev --portal sjs --project .
portal-dev --portal chenghua --project .
```

查看命令帮助：

```bash
portal-dev --help
```

## 项目 scripts

可以在业务项目的 `package.json` 中添加：

```json
{
  "scripts": {
    "dev:portal": "portal-dev --portal sjs --project .",
    "dev:portal:chenghua": "portal-dev --portal chenghua --project ."
  }
}
```

随后运行：

```bash
pnpm dev:portal
pnpm dev:portal:chenghua
```

## 安装 Codex Skill

安装包后执行：

```bash
pnpm exec portal-dev skill install
```

Skill 默认安装到 `~/.codex/skills/portal-dev`。之后可以在 Codex 中直接说：

```text
使用 portal-dev 启动当前项目的石景山门户联调
```

或者：

```text
使用 portal-dev 登录成华门户
```

## 环境变量

| 变量                              | 默认值                   | 说明                          |
| --------------------------------- | ------------------------ | ----------------------------- |
| `SJS_PORTAL_USERNAME`             | 无                       | 石景山用户名，必填            |
| `SJS_PORTAL_PASSWORD`             | 无                       | 石景山密码，必填              |
| `CHENGHUA_PORTAL_USERNAME`        | 无                       | 成华用户名，必填              |
| `CHENGHUA_PORTAL_PASSWORD`        | 无                       | 成华密码，必填                |
| `SJS_PORTAL_LOGIN_URL`            | 内置石景山登录页         | 覆盖石景山登录地址            |
| `CHENGHUA_PORTAL_LOGIN_URL`       | 内置成华登录页           | 覆盖成华登录地址              |
| `CHENGHUA_PORTAL_AFTER_LOGIN_URL` | 成华智能体广场           | 覆盖成华登录后的页面          |
| `PORTAL_LOCAL_ORIGIN`             | `http://localhost:5173`  | 本地开发服务地址              |
| `PORTAL_IFRAME_HOST`              | 石景山智能体 iframe 域名 | 目标 iframe 域名              |
| `PORTAL_IFRAME_PATH`              | `/exhibition-hall`       | 目标智能体路径                |
| `PORTAL_ROOM_NAME`                | `3D智能展厅智能体`       | 样板间内搜索的智能体名称      |
| `PORTAL_PROJECT_DIR`              | 当前目录                 | 不传 `--project` 时的项目目录 |
| `CHROME_PATH`                     | 自动查找                 | Chrome 或 Edge 可执行文件路径 |

为了兼容旧项目，石景山账号仍支持 `PORTAL_USERNAME`、`PORTAL_PASSWORD` 和 `PORTAL_LOGIN_URL`。

## 安全说明

- CLI 不会在终端打印用户名、密码或门户 Token。
- 门户 Token 只用于当前浏览器会话，不写入文件。
- 每位开发者应使用自己的账号配置，不要把账号密码写进源码或 npm 包。

## 本仓库开发

在 `sybz-components` 仓库根目录执行：

```bash
pnpm --dir packages/portal-dev check
pnpm portal:skill:install
pnpm portal:release
```

`portal:release` 会执行检查、升级 patch 版本并发布 npm 包，执行前请确认当前分支和版本状态。
