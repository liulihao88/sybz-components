---
name: portal-dev
description: 启动前端项目的石景山门户本地联调，自动登录成华门户，或使用已配置的 URL 和账号密码登录普通网站。用户提到 dev:portal、门户联调、成华登录、石景山登录、自定义登录或从任意项目启动门户调试时使用。
---

# 门户本地调试

调用已安装的 `portal-dev` CLI，不要复制或改写登录自动化逻辑。

macOS 会复用用户当前打开的 Google Chrome，并在现有窗口的标签页中完成登录；不要另外启动 Chrome。Windows / Linux 使用 CLI 内置的浏览器兼容方案。

## 执行

需要让用户从所有已配置账号中选择时执行：

```bash
portal-dev login
```

该命令会显示石景山、成华和自定义网站的可登录账号，输入序号后直接登录。

缺少账号配置时先执行：

```bash
portal-dev config --portal sjs
```

只登录石景山门户（不依赖前端项目）：

```bash
portal-dev --portal sjs
```

只登录成华门户（不依赖前端项目）：

```bash
portal-dev --portal chenghua
```

登录已配置的普通网站（不走验证码和 Token 等特殊流程）：

```bash
portal-dev --portal custom <账号名称>
```

每个 profile 可以直接配置 `alias` 和 `mode`。只有用户明确要求门户本地联调时才执行 `mode: "dev"` 的快捷别名，例如 `portal-dev sjs-dev`。`project` 仅用于需要 CLI 自动启动前端项目的情况，未配置时直接使用默认本地地址 `http://localhost:5173`。本地地址、路由、智能体名称和 iframe 识别参数均从该 profile 读取。脚本从门户 iframe URL 取得 Token 后，必须保留查询参数打开本地地址，且不得输出 Token。

`mode: "login"` 登录成功后立即结束 CLI，不阻塞终端。只有 `mode: "dev"` 本地联调需要保持进程运行，直到用户明确停止。不得输出用户名、密码或门户 Token。

## 配置

账号密码只从当前用户的专属配置文件读取，每个门户可保存多个账号。`portal-dev config` 会新增账号或按账号名称更新已有账号，并在 profile 中直接配置别名和模式；登录命令不写账号名称时使用数组第一个账号，在命令末尾追加账号名称时使用指定账号。普通网站使用 `portal-dev config --portal custom` 配置登录 URL、账号名称、用户名和密码。缺少凭据时，引导用户在本机终端运行 `portal-dev config`，不索要或展示具体密码。
