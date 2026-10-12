import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJsonPath = resolve(packageDir, 'package.json')
const registry = 'https://registry.npmjs.org/'
const originalPackageJson = readFileSync(packageJsonPath, 'utf8')

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: packageDir,
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  })
}

function ensureCleanWorktree() {
  const status = run('git', ['status', '--porcelain'], { capture: true }).trim()
  if (status) throw new Error('发布前请先提交当前改动，避免把无关文件带入版本')
}

function parseVersion(version) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`不支持的版本号：${version}`)
  return version.split('.').map(Number)
}

function nextVersion(name, localVersion) {
  const remoteVersion = run('npm', ['view', name, 'version', `--registry=${registry}`, '--prefer-online'], {
    capture: true,
  }).trim()
  const local = parseVersion(localVersion)
  const remote = parseVersion(remoteVersion)
  let latest = local
  for (let index = 0; index < 3; index += 1) {
    if (remote[index] > local[index]) {
      latest = remote
      break
    }
    if (remote[index] < local[index]) break
  }
  return `${latest[0]}.${latest[1]}.${latest[2] + 1}`
}

try {
  ensureCleanWorktree()
  run('pnpm', ['check'])
  const info = JSON.parse(originalPackageJson)
  const releaseVersion = nextVersion(info.name, info.version)
  writeFileSync(packageJsonPath, `${JSON.stringify({ ...info, version: releaseVersion }, null, 2)}\n`)
  run('npm', ['publish', '--access=public', `--registry=${registry}`])
  console.log(`\n${info.name}@${releaseVersion} 已提交给 npm。`)
} finally {
  if (readFileSync(packageJsonPath, 'utf8') !== originalPackageJson) writeFileSync(packageJsonPath, originalPackageJson)
}
