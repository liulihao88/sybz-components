import { createInterface } from 'node:readline/promises'
import { writePortalAccount } from './config-file.mjs'

const args = process.argv.slice(2)
const readArg = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

const askPassword = (message) => {
  if (!process.stdin.isTTY) throw new Error('当前终端不支持安全密码输入，请在本机终端中运行 portal-dev config')

  return new Promise((resolvePassword, reject) => {
    let password = ''
    process.stdout.write(message)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    const cleanup = () => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdin.removeListener('data', onData)
    }
    const onData = (input) => {
      for (const character of input) {
        if (character === '\u0003') {
          cleanup()
          process.stdout.write('\n')
          reject(new Error('已取消配置'))
          return
        }
        if (character === '\r' || character === '\n') {
          cleanup()
          process.stdout.write('\n')
          resolvePassword(password)
          return
        }
        if (character === '\u007f' || character === '\b') {
          if (password) {
            password = password.slice(0, -1)
            process.stdout.write('\b \b')
          }
          continue
        }
        password += character
        process.stdout.write('*')
      }
    }

    process.stdin.on('data', onData)
  })
}

const rl = createInterface({ input: process.stdin, output: process.stdout })
const portalArg = readArg('--portal')
const portalAnswer = portalArg || (await rl.question('请选择门户（1=石景山，2=成华，3=自定义，直接回车默认石景山）：'))
const portal =
  portalAnswer === '3' || portalAnswer === 'custom'
    ? 'custom'
    : portalAnswer === '2' || portalAnswer === 'chenghua'
      ? 'chenghua'
      : 'sjs'
const portalName = portal === 'custom' ? '自定义网站' : portal === 'chenghua' ? '成华' : '石景山'
const name = (await rl.question('请输入账号名称（例如：我的账号、测试账号）：')).trim()
if (!name) {
  rl.close()
  throw new Error('账号名称不能为空')
}
const alias = (await rl.question('请输入快捷命令别名（可直接回车跳过）：')).trim()
if (alias && !/^[a-zA-Z][\w-]*$/.test(alias)) {
  rl.close()
  throw new Error('别名只能包含字母、数字、下划线和短横线，并且必须以字母开头')
}
const modeAnswer = portal === 'sjs' ? (await rl.question('请选择模式（1=只登录，2=本地联调，默认1）：')).trim() : '1'
const mode = modeAnswer === '2' ? 'dev' : 'login'
const profileOptions = { ...(alias ? { alias } : {}), mode }
if (mode === 'dev') {
  const project = (await rl.question('请输入需要自动启动的前端项目绝对路径（可直接回车跳过）：')).trim()
  if (project) profileOptions.project = project
  profileOptions.localOrigin =
    (await rl.question('请输入本地服务地址（默认 http://localhost:5173）：')).trim() || 'http://localhost:5173'
  profileOptions.localPath =
    (await rl.question('请输入本地接收 Token 的路由（默认 /exhibition-hall）：')).trim() || '/exhibition-hall'
  profileOptions.roomName =
    (await rl.question('请输入样板间智能体名称（默认 3D智能展厅智能体）：')).trim() || '3D智能展厅智能体'
  profileOptions.iframeHost =
    (await rl.question('请输入门户 iframe 域名（默认 hia.sjsdoubao.com:31118）：')).trim() || 'hia.sjsdoubao.com:31118'
  profileOptions.iframePath =
    (await rl.question('请输入门户 iframe 路径（默认 /exhibition-hall）：')).trim() || '/exhibition-hall'
}
let loginUrl
if (portal === 'custom') {
  loginUrl = (await rl.question('请输入登录页 URL（例如：https://example.com/login）：')).trim()
  try {
    if (!['http:', 'https:'].includes(new URL(loginUrl).protocol)) throw new Error()
  } catch {
    rl.close()
    throw new Error('登录页 URL 必须是有效的 http 或 https 地址')
  }
}
const username = (await rl.question(`请输入${portalName}账号：`)).trim()
rl.close()
if (!username) throw new Error('账号不能为空')
const password = await askPassword(`请输入${portalName}密码（输入内容会隐藏）：`)
if (!password) throw new Error('密码不能为空')

const { configPath, accountCount } = writePortalAccount(portal, {
  name,
  username,
  password,
  ...(loginUrl ? { loginUrl } : {}),
  ...profileOptions,
})

console.log(`配置完成：${portalName}现有 ${accountCount} 个账号`)
console.log(`配置文件：${configPath}`)
console.log(`现在可以在任意目录运行：portal-dev ${alias || `--portal ${portal} ${name}`}`)
