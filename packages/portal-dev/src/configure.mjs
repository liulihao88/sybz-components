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
