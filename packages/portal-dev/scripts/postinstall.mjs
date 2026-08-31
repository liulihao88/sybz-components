import { ensurePortalConfig } from '../src/config-file.mjs'

const { configPath, created } = ensurePortalConfig()

if (created) console.log(`portal-dev 默认配置文件已创建：${configPath}`)
