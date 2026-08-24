# Portal Dev 门户联调工具

`@sybz-components/portal-dev` 是全局使用的成华、石景山门户自动登录 CLI，也可按需启动石景山门户本地联调。它作为独立 npm 包发布，不会增加组件主包的浏览器端体积。

## 能力

- 自动填写门户账号和密码。
- 自动识别图形验证码并登录。
- 每个门户支持保存多个账号，并可按账号名称登录。
- 石景山门户可进入智能体样板间，获取门户 Token 后打开本地页面。
- 成华门户可在登录成功后进入智能体广场。
- 随包提供 Codex `portal-dev` Skill。

## 环境要求

- Node.js 18+
- Google Chrome 或 Microsoft Edge

## 安装

```bash
pnpm add -g @sybz-components/portal-dev
```

## 全局安装后的傻瓜式配置

让同事打开终端，先执行一次配置命令：

```bash
portal-dev config
```

第一条命令会用中文询问门户、账号名称、用户名和密码。密码显示为 `*`，配置保存在当前电脑用户的专属文件中。同一门户可以保存多个账号，账号名称相同时会更新原账号。

- macOS / Linux：`~/.config/sybz-components/portal-dev.json`
- Windows：`%APPDATA%\sybz-components\portal-dev.json`

之后可以在任意目录运行：

```bash
portal-dev
```

成华门户可以在选择门户时输入 `2`，也可以直接运行：

```bash
portal-dev config --portal chenghua
portal-dev --portal chenghua
```

配置多个账号后，不写账号名称默认使用数组中的第一个账号：

```bash
portal-dev --portal sjs
```

在命令末尾写账号名称，可以使用指定账号：

```bash
portal-dev --portal sjs 测试账号
```

## 石景山门户登录

```bash
portal-dev
```

该命令只打开石景山门户并自动登录，完全不检查前端项目。

## 成华门户登录

```bash
portal-dev --portal chenghua
```

该命令只完成门户登录并进入智能体广场，完全不检查前端项目。

## 石景山门户联调

默认提供两个登录快捷命令：

```bash
portal-dev ds # 登录石景山
portal-dev sc # 登录成华
```

运行向导可以新增或修改快捷命令，联调参数会写入用户级 JSON：

```bash
portal-dev config command
```

例如配置 `sjs-dev` 后，日常只运行：

```bash
portal-dev sjs-dev
```

该命令才会检查前端项目、启动 `dev` script、进入智能体样板间、获取 Token 并打开本地页面。

## 多账号和快捷命令配置格式

```json
{
  "version": 3,
  "profiles": {
    "sjs": [{ "name": "我的账号", "username": "user1", "password": "******" }],
    "chenghua": [{ "name": "测试账号", "username": "user2", "password": "******" }]
  },
  "commands": [
    { "alias": "ds", "mode": "login", "portal": "sjs" },
    { "alias": "sc", "mode": "login", "portal": "chenghua" },
    {
      "alias": "sjs-dev",
      "mode": "dev",
      "portal": "sjs",
      "account": "测试账号",
      "project": "/Users/你的名字/projects/agent-web",
      "localOrigin": "http://localhost:5173",
      "localPath": "/exhibition-hall",
      "roomName": "3D智能展厅智能体",
      "iframeHost": "hia.sjsdoubao.com:31118",
      "iframePath": "/exhibition-hall"
    }
  ]
}
```

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

| 参数             | 默认值      | 说明                               |
| ---------------- | ----------- | ---------------------------------- |
| `--portal`       | `sjs`       | 门户类型，可选 `sjs`、`chenghua`   |
| `账号名称`       | 第一个账号  | 可选的位置参数，用于指定已配置账号 |
| `快捷命令别名`   | `ds` / `sc` | 运行 JSON 中对应的登录或联调命令   |
| `config`         | -           | 交互新增账号或按账号名称更新       |
| `config command` | -           | 交互新增或修改快捷命令             |
| `--help`         | -           | 查看命令帮助                       |

## 常见问题

### 提示缺少账号密码

在本机终端运行 `portal-dev config`，配置完成后直接重新执行联调命令。

### 找不到 Chrome 或 Edge

安装 Google Chrome 或 Microsoft Edge 后重新运行。

### 本地服务启动超时

确认业务项目存在 `dev` script，并使用默认的 `5173` 端口。

### 验证码识别失败

CLI 最多自动尝试三次。连续失败时可以重新运行命令，或检查门户验证码样式是否已经发生变化。
