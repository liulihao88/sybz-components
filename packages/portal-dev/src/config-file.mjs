import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, resolve } from 'node:path'

export const getPortalConfigPath = () => {
  const configRoot =
    process.platform === 'win32' ? resolve(homedir(), 'AppData', 'Roaming') : resolve(homedir(), '.config')
  return resolve(configRoot, 'sybz-components', 'portal-dev.json')
}

export const readPortalConfig = () => {
  const configPath = getPortalConfigPath()
  if (!existsSync(configPath)) return { version: 1, profiles: {} }
  try {
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('根节点必须是对象')
    return { ...config, profiles: config.profiles && typeof config.profiles === 'object' ? config.profiles : {} }
  } catch (error) {
    throw new Error(`门户配置文件格式错误：${configPath}\n${error.message}`)
  }
}

export const writePortalProfile = (portal, profile) => {
  const configPath = getPortalConfigPath()
  const config = readPortalConfig()
  const nextConfig = {
    ...config,
    version: 1,
    profiles: { ...config.profiles, [portal]: profile },
  }
  mkdirSync(dirname(configPath), { recursive: true, mode: 0o700 })
  writeFileSync(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, { mode: 0o600 })
  try {
    chmodSync(configPath, 0o600)
  } catch {
    // Windows 等不支持 POSIX 权限的环境由系统用户目录权限保护。
  }
  return configPath
}
