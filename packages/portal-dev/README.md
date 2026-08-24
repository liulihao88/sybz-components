# @sybz-components/portal-dev

成华、石景山门户自动登录 CLI，也可按需启动石景山门户本地联调。

## 环境要求

- Node.js 18+
- Google Chrome 或 Microsoft Edge

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
```

## 使用

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

默认快捷命令：

```bash
portal-dev ds # 登录石景山
portal-dev sc # 登录成华
```

别名保存在 JSON 中，可以通过向导新增登录或联调命令：

```bash
portal-dev config command
```

例如配置一个别名为 `sjs-dev` 的联调命令后，只需运行：

```bash
portal-dev sjs-dev
```

执行时会登录指定账号、启动本地项目、进入样板间搜索智能体，从匹配的 iframe 地址取得 Token，然后保留查询参数打开本地页面。

配置文件中的账号和快捷命令格式：

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
