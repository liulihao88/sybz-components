---
name: portal-dev
description: 启动前端项目的石景山门户本地联调，或自动登录成华门户。用户提到 dev:portal、门户联调、成华登录、石景山登录或从任意项目启动门户调试时使用。
---

# 门户本地调试

调用已安装的 `portal-dev` CLI，不要复制或改写登录自动化逻辑。

## 执行

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

只有用户明确要求门户本地联调时才执行：

```bash
portal-dev dev --portal sjs --project <project-directory>
```

保持进程运行并告诉用户当前状态；只有用户明确要求停止时才终止。不得输出用户名、密码或门户 Token。

## 配置

账号密码只从当前用户的专属配置文件读取，每个门户可保存多个账号。`portal-dev config` 会新增账号或按账号名称更新已有账号；登录命令不写账号名称时使用数组第一个账号，在命令末尾追加账号名称时使用指定账号。缺少凭据时，引导用户在本机终端运行 `portal-dev config`，不索要或展示具体密码。
