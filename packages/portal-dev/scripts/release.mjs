import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJsonPath = resolve(packageDir, 'package.json')
const registry = 'https://registry.npmjs.org/'
const originalPackageJson = readFileSync(packageJsonPath, 'utf8')
let published = false

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: packageDir,
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  })
}

function packageInfo() {
  return JSON.parse(readFileSync(packageJsonPath, 'utf8'))
}

function ensureCleanWorktree() {
  const status = run('git', ['status', '--porcelain'], { capture: true }).trim()
  if (status) {
    throw new Error('发布前请先提交当前改动，避免把无关文件带入版本提交')
  }
}

function publishedVersion(name, version) {
  try {
    return (
      run('npm', ['view', `${name}@${version}`, 'version', `--registry=${registry}`], {
        capture: true,
      }).trim() === version
    )
  } catch {
    return false
  }
}

async function verifyPublishedVersion(name, version) {
  const expected = version.trim()
  let lastError

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const actual = run('npm', ['view', `${name}@${version}`, 'version', `--registry=${registry}`], {
        capture: true,
      }).trim()

      if (actual === expected) return
      lastError = new Error(`npm 返回了意外版本：${actual || '(空)'}`)
    } catch (error) {
      lastError = error
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 2000))
  }

  throw new Error(`发布后仍无法从 npm 查询 ${name}@${version}`, { cause: lastError })
}

try {
  ensureCleanWorktree()
  run('pnpm', ['check'])
  run('npm', ['whoami', `--registry=${registry}`])
  run('npm', ['version', 'patch', '--no-git-tag-version'])

  const { name, version } = packageInfo()
  try {
    run('npm', ['publish', '--access=public', `--registry=${registry}`])
  } catch (error) {
    // 网络在 npm 已接收包之后断开时，publish 可能以失败状态退出；先查 registry，
    // 避免错误地恢复到一个事实上已经发布的版本。
    if (!publishedVersion(name, version)) throw error
  }
  published = true

  await verifyPublishedVersion(name, version)

  const tag = `portal-dev-v${version}`
  run('git', ['add', 'package.json'])
  run('git', ['commit', '-m', `release(portal-dev): ${version}`])
  run('git', ['tag', tag])
  run('git', ['push', '--follow-tags'])

  console.log(`\n${name}@${version} 已发布并验证，Git tag：${tag}`)
} catch (error) {
  if (!published && readFileSync(packageJsonPath, 'utf8') !== originalPackageJson) {
    writeFileSync(packageJsonPath, originalPackageJson)
  }

  if (published) {
    console.error('\n包已发布到 npm，但 Git 提交、tag 或推送未完成；请勿再次递增版本。')
  }

  throw error
}
