# Portal Dev 门户联调工具(可快速写入用户名密码验证码以节省登录时间的目的)

`@sybz-components/portal-dev` 是全局使用的成华、石景山门户或自定义网站自动登录 CLI，也可按需启动石景山门户本地联调。它作为独立 npm 包发布，不会增加组件主包的浏览器端体积。

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

## 安装(若没有npm, 请先下载node.js https://nodejs.org/zh-cn)

```bash
npm install -g @sybz-components/portal-dev
```

## 全局安装后的傻瓜式配置

- macOS / Linux：`open ~/.config/sybz-components/portal-dev.json`
- Windows：`%APPDATA%\sybz-components\portal-dev.json`

```bash
{
  "version": 10,
  "profiles": {
    "sjs": [
      {
        "name": "石景山政府",
        "username": "testuser_gov",
        "password": "xxx",
        "alias": "sjs"
      },
      {
        "name": "石景山政府本地调试",
        "username": "testuser_gov",
        "password": "xxx",
        "alias": "sjs2",
        "mode": "dev"
      },
      {
        "name": "石景山企业",
        "username": "testuser_company",
        "password": "xxx"
      }
    ],
    "chenghua": [
      {
        "name": "成华",
        "username": "agentuser001",
        "password": "xxx",
        "alias": "ch",
        "mode": "login"
      }
    ],
    "custom": [
      {
        "name": "wechat-auto-login",
        "username": "admin",
        "password": "xxx",
        "loginUrl": "https://helix-ai-op.comlan.com/portal/wechat-auto"
      },
      {
        "name": "禅道",
        "username": "llh",
        "password": "xxx",
        "loginUrl": "https://helix-ai-minio.comlan.com/zentao/"
      }
    ]
  }
}
```

之后可以在任意目录运行：

```bash
portal-dev login
```

选择菜单中的账号时不需要回车：前 9 项使用 `1-9`，第 10 项起使用 `A-Z`。账号超过 35 个时，会自动改为输入完整序号后回车。

也可以快速启动(alias就是快速启动的命令)

```bash
portal-dev sjs
```

运行配置向导可以新增或修改账号的别名、模式和联调参数：

```bash
portal-dev config
```

## 参数

| 参数           | 默认值     | 说明                                       |
| -------------- | ---------- | ------------------------------------------ |
| `--portal`     | `sjs`      | 门户类型，可选 `sjs`、`chenghua`、`custom` |
| `账号名称`     | 第一个账号 | 可选的位置参数，用于指定已配置账号         |
| `快捷命令别名` | -          | 运行 profile 中对应的登录或联调命令        |
| `config`       | -          | 交互新增账号或按账号名称更新               |
| `--help`       | -          | 查看命令帮助                               |

查看完整命令、参数、默认值、环境变量和使用示例：

```bash
portal-dev --help
portal-dev help
```

## 常见问题

### 提示缺少账号密码

在本机终端运行 `open ~/.config/sybz-components/portal-dev.json`，配置完成后直接重新执行联调命令。

### 找不到 Chrome 或 Edge

安装 Google Chrome 或 Microsoft Edge 后重新运行。

### 本地服务启动超时

确认业务项目存在 `dev` script，并使用默认的 `5173` 端口。

### 验证码识别失败

CLI 最多自动尝试五次。连续失败时可以重新运行命令，或检查门户验证码样式是否已经发生变化。

### 如果我有个网站, 通过custom的用户名和密码或者有二维码滑动条等无法识别怎么办?

升级npm包, 做适配和单独定制
