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
pnpm add -g @sybz-components/portal-dev
```

## 全局安装后的傻瓜式配置

让同事打开终端，先执行一次配置命令：

```bash
portal-dev config
```

第一条命令会用中文询问门户、账号和密码。密码显示为 `*`，账号配置保存在当前电脑用户的专属配置文件中，所有项目都能复用，只需配置一次。

- macOS / Linux：`~/.config/sybz-components/portal-dev.json`
- Windows：`%APPDATA%\sybz-components\portal-dev.json`

之后进入目标前端项目文件夹并运行：

```bash
portal-dev
```

成华门户可以在选择门户时输入 `2`，也可以直接运行：

```bash
portal-dev config --portal chenghua
portal-dev --portal chenghua
```

运行联调时不在项目目录，可以指定项目文件夹：

```bash
portal-dev --portal sjs --project /你的项目目录
```

## 石景山门户联调

```bash
portal-dev
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
portal-dev --portal chenghua
```

成华模式只完成门户登录，并进入智能体广场，不启动本地项目、不执行石景山样板间跳转流程。

## 安装 Codex Skill

```bash
portal-dev skill install
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
| `config`       | -            | 交互创建或更新用户级配置文件     |
| `--login-only` | 成华默认启用 | 只登录门户，不启动本地联调       |
| `--help`       | -            | 查看命令帮助                     |

## 常见问题

### 提示缺少账号密码

在本机终端运行 `portal-dev config`，配置完成后直接重新执行联调命令。

### 找不到 Chrome 或 Edge

安装 Google Chrome 或 Microsoft Edge 后重新运行。

### 本地服务启动超时

确认业务项目存在 `dev` script，并使用默认的 `5173` 端口。

### 验证码识别失败

CLI 最多自动尝试三次。连续失败时可以重新运行命令，或检查门户验证码样式是否已经发生变化。
