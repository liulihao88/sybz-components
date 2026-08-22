---
name: portal-dev
description: 启动前端项目的石景山门户本地联调，或自动登录成华门户。用户提到 dev:portal、门户联调、成华登录、石景山登录或从任意项目启动门户调试时使用。
---

# 门户本地调试

调用已安装的 `portal-dev` CLI，不要复制或改写登录自动化逻辑。

## 执行

石景山门户联调：

```bash
portal-dev --portal sjs --project <project-directory>
```

成华门户登录：

```bash
portal-dev --portal chenghua --project <project-directory>
```

保持进程运行并告诉用户当前状态；只有用户明确要求停止时才终止。不得输出用户名、密码或门户 Token。

## 配置

从目标项目 `.env.local`、`.env` 或进程环境变量读取：

- 石景山：`SJS_PORTAL_USERNAME`、`SJS_PORTAL_PASSWORD`。
- 成华：`CHENGHUA_PORTAL_USERNAME`、`CHENGHUA_PORTAL_PASSWORD`。
- 可选：`SJS_PORTAL_LOGIN_URL`、`CHENGHUA_PORTAL_LOGIN_URL`、`PORTAL_LOCAL_ORIGIN`、`PORTAL_IFRAME_HOST`、`PORTAL_IFRAME_PATH`、`PORTAL_ROOM_NAME`、`CHROME_PATH`。

缺少凭据时，指出需要配置的变量名，不索要或展示具体密码。
