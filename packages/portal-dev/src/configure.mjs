import { createInterface } from 'node:readline/promises'
import { writePortalAccount, writePortalCommand } from './config-file.mjs'

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

if (args[0] === 'command') {
  const commandRl = createInterface({ input: process.stdin, output: process.stdout })
  const alias = (await commandRl.question('请输入快捷命令别名（例如：ds、sc、sjs-dev）：')).trim()
  if (!alias || !/^[a-zA-Z][\w-]*$/.test(alias)) {
    commandRl.close()
    throw new Error('别名只能包含字母、数字、下划线和短横线，并且必须以字母开头')
  }
  const modeAnswer = (await commandRl.question('请选择命令类型（1=只登录，2=石景山联调，默认1）：')).trim()
  const mode = modeAnswer === '2' ? 'dev' : 'login'
  const portalAnswer =
    mode === 'dev' ? 'sjs' : (await commandRl.question('请选择门户（1=石景山，2=成华，默认石景山）：')).trim()
  const portal = portalAnswer === '2' || portalAnswer === 'chenghua' ? 'chenghua' : 'sjs'
  const account = (await commandRl.question('请输入账号名称（直接回车使用该门户第一个账号）：')).trim()
  const command = { alias, mode, portal, ...(account ? { account } : {}) }

  if (mode === 'dev') {
    const project = (await commandRl.question('请输入前端项目绝对路径：')).trim()
    if (!project) {
      commandRl.close()
      throw new Error('联调命令必须配置前端项目路径')
    }
    command.project = project
    command.localOrigin =
      (await commandRl.question('请输入本地服务地址（默认 http://localhost:5173）：')).trim() || 'http://localhost:5173'
    command.localPath =
      (await commandRl.question('请输入本地接收 Token 的路由（默认 /exhibition-hall）：')).trim() || '/exhibition-hall'
    command.roomName =
      (await commandRl.question('请输入样板间智能体名称（默认 3D智能展厅智能体）：')).trim() || '3D智能展厅智能体'
    command.iframeHost =
      (await commandRl.question('请输入门户 iframe 域名（默认 hia.sjsdoubao.com:31118）：')).trim() ||
      'hia.sjsdoubao.com:31118'
    command.iframePath =
      (await commandRl.question('请输入门户 iframe 路径（默认 /exhibition-hall）：')).trim() || '/exhibition-hall'
  }
  commandRl.close()
  const { configPath, commandCount } = writePortalCommand(command)
  console.log(`快捷命令配置完成：portal-dev ${alias}`)
  console.log(`当前共 ${commandCount} 个快捷命令，配置文件：${configPath}`)
  process.exit(0)
}

const rl = createInterface({ input: process.stdin, output: process.stdout })
const portalArg = readArg('--portal')
const portalAnswer = portalArg || (await rl.question('请选择门户（1=石景山，2=成华，直接回车默认石景山）：'))
const portal = portalAnswer === '2' || portalAnswer === 'chenghua' ? 'chenghua' : 'sjs'
const portalName = portal === 'chenghua' ? '成华' : '石景山'
const name = (await rl.question('请输入账号名称（例如：我的账号、测试账号）：')).trim()
if (!name) {
  rl.close()
  throw new Error('账号名称不能为空')
}
const username = (await rl.question(`请输入${portalName}门户账号：`)).trim()
rl.close()
if (!username) throw new Error('账号不能为空')
const password = await askPassword(`请输入${portalName}门户密码（输入内容会隐藏）：`)
if (!password) throw new Error('密码不能为空')

const { configPath, accountCount } = writePortalAccount(portal, { name, username, password })

console.log(`配置完成：${portalName}门户现有 ${accountCount} 个账号`)
console.log(`配置文件：${configPath}`)
console.log(`现在可以在任意目录运行：portal-dev --portal ${portal}`)
