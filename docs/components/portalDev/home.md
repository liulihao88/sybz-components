# Portal Dev：一个命令，完成门户登录与本地联调

<img src="./image.png" alt="Portal Dev 门户联调工具" style="width: 420px; max-width: 100%; height: auto" />

还在反复输入账号、密码和验证码，再手动进入样板间、复制 Token、打开本地页面？

`@sybz-components/portal-dev` 把这套重复流程收进了一个命令。配置一次后，无论你正在开发哪个项目，都可以从任意目录快速登录成华、石景山门户或自定义网站；进行石景山门户联调时，还能自动启动项目、进入智能体样板间，并携带门户 Token 跳转到本地页面。

**少做重复操作，把时间留给真正的开发和调试。**

它以独立 npm 包发布，不会增加 `sybz-components` 组件主包的浏览器端体积。

## 它能为你做什么

- **告别重复登录**：自动填写账号、密码，识别图形验证码并完成登录。
- **一键打通联调链路**：自动进入石景山智能体样板间，获取门户 Token 并打开本地页面。
- **多账号切换更轻松**：每个门户可保存多个账号，通过名称、序号或快捷别名直接选择。
- **一套工具覆盖多种场景**：支持石景山门户、成华门户以及常见的自定义登录网站。
- **在哪个项目都能用**：全局安装后可从任意目录执行，联调模式还能按配置启动目标前端项目。
- **浏览器会话可复用**：macOS 优先复用当前 Chrome，Windows 和 Linux 也提供浏览器自动化支持。
- **可以直接交给 Codex**：随包提供 `portal-dev` Skill，用自然语言即可发起登录或联调。

## 最直观的收益

| 以前                                     | 使用 Portal Dev 后                 |
| ---------------------------------------- | ---------------------------------- |
| 每次手动输入账号、密码和验证码           | 配置一次，后续自动完成登录         |
| 在多个测试账号之间反复查找和切换         | 用名称、序号或别名直接进入指定账号 |
| 手动进入样板间、获取 Token、拼接本地地址 | 一个命令完成 Token 获取与本地跳转  |
| 切换项目后重新整理启动和联调步骤         | 从任意目录启动目标项目的门户联调   |

## 30 秒开始使用

### 开始前确认

- Node.js 18+
- Google Chrome 或 Microsoft Edge

如果尚未安装 npm，请先安装 [Node.js](https://nodejs.org/zh-cn)。然后全局安装 Portal Dev：

```bash
npm install -g @sybz-components/portal-dev
```

安装完成后会自动创建默认配置文件；已有配置不会被覆盖。

打开配置文件，填写你的门户账号：

```bash
portal-dev open
```

macOS、Windows 和 Linux 都会使用系统默认应用打开对应的配置文件。

配置完成后，在任意目录选择账号登录：

```bash
portal-dev login
```

如果已经为账号设置快捷别名，还可以一步直达：

```bash
portal-dev sjs
```

#### 配置属性说明

```javascript
{
  "version": 11,
  "profiles": {
    "custom": [ // 自定义
      {
        "name": "石景山政府", // 名字
        "username": "testuser_gov", // 用户名
        "password": "xxx", // 密码
        "loginUrl": "https://helix-ai-op.comlan.com/portal/wechat-auto", // 登录页url
        "code": true, // 是否处理验证码, 默认不处理验证码.
        "alias": "sjs", // 别名
      },
    ]
  }
}
```

下面是一个完整配置示例：

```json
{
  "version": 11,
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
      },
      {
        "name": "石景山政府custom",
        "username": "xxx",
        "password": "xxx",
        "loginUrl": "http://115.190.54.111:1880/passport/login/userLogin",
        "code": true
      }
    ]
  }
}
```

## 更快地选择账号

不传选择参数时，执行：

```bash
portal-dev login
```

菜单中的账号无需按回车：前 9 项使用 `1-9`，第 10 项起使用 `A-Z`。账号超过 35 个时，会自动改为输入完整序号后回车。

也可以直接传入序号，例如 `portal-dev login 1` 会立即登录第 1 个账号，不再等待输入；`portal-dev login 10` 和 `portal-dev login A` 都会选择第 10 个账号。

`alias` 是 profile 的快捷命令。配置后，可以跳过账号选择：

```bash
portal-dev sjs
```

运行配置向导，可以新增或修改账号的别名、登录模式和联调参数：

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

在本机终端运行 `portal-dev open`，配置完成后直接重新执行联调命令。

### 找不到 Chrome 或 Edge

安装 Google Chrome 或 Microsoft Edge 后重新运行。

### 本地服务启动超时

确认业务项目存在 `dev` script，并使用默认的 `5173` 端口。

### 验证码识别失败

CLI 最多自动尝试五次。连续失败时可以重新运行命令，或检查门户验证码样式是否已经发生变化。

### 自定义网站包含二维码或滑块，无法自动识别怎么办？

先将 npm 包升级到最新版本。如果仍无法识别，需要针对网站的登录流程进行单独适配。

## 把常用命令缩短到两个字母

可以结合 Shell alias 进一步缩短操作。完整说明请查看 [alias 用法说明](/components/alias/home.md)。例如：

```bash
alias ch='portal-dev ch'
alias sjs='portal-dev sjs'
alias ll='portal-dev login'
alias op='open ~/.config/sybz-components/portal-dev.json'
```

之后输入 `ch`、`sjs` 或 `ll`，就能直接开始登录或联调。
