import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, resolve } from 'node:path'

const createEmptyConfig = () => ({
  version: 5,
  profiles: {
    sjs: [],
    chenghua: [],
    custom: [],
  },
})

export const getPortalConfigPath = () => {
  const configRoot =
    process.platform === 'win32'
      ? process.env.APPDATA || resolve(homedir(), 'AppData', 'Roaming')
      : resolve(homedir(), '.config')
  return resolve(configRoot, 'sybz-components', 'portal-dev.json')
}

export const readPortalConfig = () => {
  const configPath = getPortalConfigPath()
  if (!existsSync(configPath)) return { version: 5, profiles: {} }
  try {
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('根节点必须是对象')
    const profiles = config.profiles && typeof config.profiles === 'object' ? structuredClone(config.profiles) : {}

    for (const command of Array.isArray(config.commands) ? config.commands : []) {
      if (!command?.alias || !['sjs', 'chenghua', 'custom'].includes(command.portal)) continue
      const accounts = Array.isArray(profiles[command.portal]) ? profiles[command.portal] : []
      const accountIndex = command.account
        ? accounts.findIndex((account) => account?.name === command.account)
        : accounts.length
          ? 0
          : -1
      if (accountIndex < 0) continue
      const { portal: _portal, account: _account, ...profileOptions } = command
      accounts[accountIndex] = { ...accounts[accountIndex], ...profileOptions }
      profiles[command.portal] = accounts
    }

    const normalizedConfig = { version: 5, profiles }
    if (config.version !== 5 || Object.hasOwn(config, 'commands')) writeConfig(configPath, normalizedConfig)
    return normalizedConfig
  } catch (error) {
    throw new Error(`门户配置文件格式错误：${configPath}\n${error.message}`)
  }
}

const writeConfig = (configPath, config) => {
  mkdirSync(dirname(configPath), { recursive: true, mode: 0o700 })
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 })
  try {
    chmodSync(configPath, 0o600)
  } catch {
    // Windows 等不支持 POSIX 权限的环境由系统用户目录权限保护。
  }
}

export const ensurePortalConfig = () => {
  const configPath = getPortalConfigPath()
  if (existsSync(configPath)) return { configPath, created: false }
  writeConfig(configPath, createEmptyConfig())
  return { configPath, created: true }
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
    version: 5,
    profiles: { ...normalizedProfiles, [portal]: nextAccounts },
  }
  writeConfig(configPath, nextConfig)
  return { configPath, accountCount: nextAccounts.length }
}
