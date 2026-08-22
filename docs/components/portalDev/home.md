# Portal Dev 门户联调工具

`@sybz-components/portal-dev` 是成华、石景山门户自动登录与本地前端联调 CLI。它属于 `sybz-components` 工具生态，但作为独立 npm 包发布，不会增加组件主包的浏览器端体积。

## 能力

- 自动启动目标项目的开发服务。
- 自动填写门户账号和密码。
- 自动识别图形验证码并登录。
- 石景山门户可进入智能体样板间，获取门户 Token 后打开本地页面。
- 成华门户可在登录成功后进入智能体广场。
- 随包提供 Codex `portal-dev` Skill。

## 环境要求

- Node.js 18+
- Google Chrome 或 Microsoft Edge
- 目标项目已安装依赖，并提供 `dev` script

## 安装

```bash
pnpm add -D @sybz-components/portal-dev
```

需要在任意目录直接使用时，也可以全局安装：

```bash
pnpm add -g @sybz-components/portal-dev
```

## 配置

在业务项目的 `.env.local` 中配置个人账号：

```dotenv
SJS_PORTAL_USERNAME=
SJS_PORTAL_PASSWORD=

CHENGHUA_PORTAL_USERNAME=
CHENGHUA_PORTAL_PASSWORD=
```

`.env.local` 不应提交到 Git。CLI 会读取目标项目的 `.env.local`、`.env` 和进程环境变量。

## 石景山门户联调

```bash
pnpm exec portal-dev --portal sjs --project .
```

默认流程：

1. 检查 `http://localhost:5173` 是否已经启动。
2. 未启动时执行目标项目的 `dev` script。
3. 打开石景山门户并自动登录。
4. 进入智能体样板间并搜索 `3D智能展厅智能体`。
5. 获取门户页面中的 Token，并打开对应的本地页面。

Token 不会输出到终端，也不会写入文件。

## 成华门户登录

```bash
pnpm exec portal-dev --portal chenghua --project .
```

成华模式只完成门户登录，并进入智能体广场，不启动本地项目、不执行石景山样板间跳转流程。

## 添加项目命令

在业务项目的 `package.json` 中添加：

```json
{
  "scripts": {
    "dev:portal": "portal-dev --portal sjs --project .",
    "dev:portal:chenghua": "portal-dev --portal chenghua --project ."
  }
}
```

使用：

```bash
pnpm dev:portal
pnpm dev:portal:chenghua
```

## 安装 Codex Skill

```bash
pnpm exec portal-dev skill install
```

Skill 默认安装到 `~/.codex/skills/portal-dev`。安装后可以让 Codex 直接执行：

```text
使用 portal-dev 启动当前项目的石景山门户联调
```

```text
使用 portal-dev 登录成华门户
```

## 参数

| 参数           | 默认值       | 说明                             |
| -------------- | ------------ | -------------------------------- |
| `--portal`     | `sjs`        | 门户类型，可选 `sjs`、`chenghua` |
| `--project`    | 当前目录     | 目标前端项目路径                 |
| `--login-only` | 成华默认启用 | 只登录门户，不启动本地联调       |
| `--help`       | -            | 查看命令帮助                     |

## 环境变量

| 变量                              | 默认值                  | 说明                |
| --------------------------------- | ----------------------- | ------------------- |
| `SJS_PORTAL_USERNAME`             | 无                      | 石景山用户名，必填  |
| `SJS_PORTAL_PASSWORD`             | 无                      | 石景山密码，必填    |
| `CHENGHUA_PORTAL_USERNAME`        | 无                      | 成华用户名，必填    |
| `CHENGHUA_PORTAL_PASSWORD`        | 无                      | 成华密码，必填      |
| `SJS_PORTAL_LOGIN_URL`            | 内置登录页              | 石景山门户登录地址  |
| `CHENGHUA_PORTAL_LOGIN_URL`       | 内置登录页              | 成华门户登录地址    |
| `CHENGHUA_PORTAL_AFTER_LOGIN_URL` | 成华智能体广场          | 成华登录后的页面    |
| `PORTAL_LOCAL_ORIGIN`             | `http://localhost:5173` | 本地开发服务地址    |
| `PORTAL_IFRAME_HOST`              | 内置石景山域名          | 目标 iframe 域名    |
| `PORTAL_IFRAME_PATH`              | `/exhibition-hall`      | 目标智能体路径      |
| `PORTAL_ROOM_NAME`                | `3D智能展厅智能体`      | 样板间智能体名称    |
| `PORTAL_PROJECT_DIR`              | 当前目录                | 目标项目路径        |
| `CHROME_PATH`                     | 自动查找                | Chrome 或 Edge 路径 |

旧项目中的 `PORTAL_USERNAME`、`PORTAL_PASSWORD`、`PORTAL_LOGIN_URL` 仍可用于石景山门户。

## 常见问题

### 提示缺少账号密码

确认变量写在目标业务项目的 `.env.local` 中，而不是组件库项目中，并确认命令的 `--project` 指向正确目录。

### 找不到 Chrome 或 Edge

安装 Chrome/Edge，或者配置：

```dotenv
CHROME_PATH=/path/to/browser
```

### 本地服务启动超时

确认业务项目存在 `dev` script。默认使用 `5173` 端口；使用其他地址时配置：

```dotenv
PORTAL_LOCAL_ORIGIN=http://localhost:你的端口
```

### 验证码识别失败

CLI 最多自动尝试三次。连续失败时可以重新运行命令，或检查门户验证码样式是否已经发生变化。
