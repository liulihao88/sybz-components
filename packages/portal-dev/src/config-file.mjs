import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, resolve } from 'node:path'

const defaultCommands = () => [
  { alias: 'ds', mode: 'login', portal: 'sjs' },
  { alias: 'sc', mode: 'login', portal: 'chenghua' },
]

export const getPortalConfigPath = () => {
  const configRoot =
    process.platform === 'win32' ? resolve(homedir(), 'AppData', 'Roaming') : resolve(homedir(), '.config')
  return resolve(configRoot, 'sybz-components', 'portal-dev.json')
}

export const readPortalConfig = () => {
  const configPath = getPortalConfigPath()
  if (!existsSync(configPath)) return { version: 4, profiles: {}, commands: defaultCommands() }
  try {
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('根节点必须是对象')
    return {
      ...config,
      profiles: config.profiles && typeof config.profiles === 'object' ? config.profiles : {},
      commands: Array.isArray(config.commands) ? config.commands : defaultCommands(),
    }
  } catch (error) {
    throw new Error(`门户配置文件格式错误：${configPath}\n${error.message}`)
  }
}

export const writePortalAccount = (portal, account) => {
  const configPath = getPortalConfigPath()
  const config = readPortalConfig()
  const normalizedProfiles = {
    ...config.profiles,
    sjs: Array.isArray(config.profiles.sjs) ? config.profiles.sjs : [],
    chenghua: Array.isArray(config.profiles.chenghua) ? config.profiles.chenghua : [],
    custom: Array.isArray(config.profiles.custom) ? config.profiles.custom : [],
  }
  const accounts = normalizedProfiles[portal]
  const accountIndex = accounts.findIndex((item) => item.name === account.name)
  const nextAccounts = [...accounts]
  if (accountIndex >= 0) nextAccounts[accountIndex] = account
  else nextAccounts.push(account)
  const nextConfig = {
    ...config,
    version: 4,
    profiles: { ...normalizedProfiles, [portal]: nextAccounts },
    commands: config.commands,
  }
  mkdirSync(dirname(configPath), { recursive: true, mode: 0o700 })
  writeFileSync(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, { mode: 0o600 })
  try {
    chmodSync(configPath, 0o600)
  } catch {
    // Windows 等不支持 POSIX 权限的环境由系统用户目录权限保护。
  }
  return { configPath, accountCount: nextAccounts.length }
}

export const writePortalCommand = (command) => {
  const configPath = getPortalConfigPath()
  const config = readPortalConfig()
  const commandIndex = config.commands.findIndex((item) => item.alias === command.alias)
  const nextCommands = [...config.commands]
  if (commandIndex >= 0) nextCommands[commandIndex] = command
  else nextCommands.push(command)
  const nextConfig = { ...config, version: 4, commands: nextCommands }
  mkdirSync(dirname(configPath), { recursive: true, mode: 0o700 })
  writeFileSync(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, { mode: 0o600 })
  try {
    chmodSync(configPath, 0o600)
  } catch {
    // Windows 等不支持 POSIX 权限的环境由系统用户目录权限保护。
  }
  return { configPath, commandCount: nextCommands.length }
}
