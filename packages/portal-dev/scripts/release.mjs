import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJsonPath = resolve(packageDir, 'package.json')
const registry = 'https://registry.npmjs.org/'
const verifyTimeout = 5 * 60_000
const originalPackageJson = readFileSync(packageJsonPath, 'utf8')
const resume = process.argv.slice(2).includes('--resume')
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

function ensureResumableWorktree() {
  const status = run('git', ['status', '--porcelain'], { capture: true }).trim()
  if (status !== 'M packages/portal-dev/package.json') {
    throw new Error('恢复发布前，请先提交其他改动，只保留 packages/portal-dev/package.json 的版本号变更')
  }

  const previous = JSON.parse(run('git', ['show', 'HEAD:packages/portal-dev/package.json'], { capture: true }))
  const current = packageInfo()
  if (
    JSON.stringify({ ...current, version: previous.version }) !== JSON.stringify(previous) ||
    !/^\d+\.\d+\.\d+$/.test(previous.version) ||
    current.version !== previous.version.replace(/\d+$/, (patch) => String(Number(patch) + 1))
  ) {
    throw new Error('恢复发布仅支持当前 package.json 相对上次提交只增加一个 patch 版本')
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
  const deadline = Date.now() + verifyTimeout
  let attempt = 0

  while (Date.now() < deadline) {
    attempt += 1
    try {
      const actual = run(
        'npm',
        ['view', `${name}@${version}`, 'version', `--registry=${registry}`, '--prefer-online'],
        { capture: true },
      ).trim()

      if (actual === expected) return
      lastError = new Error(`npm 返回了意外版本：${actual || '(空)'}`)
    } catch (error) {
      lastError = error
    }

    if (attempt % 6 === 0) console.log(`npm 正在处理 ${name}@${version}，继续等待。`)
    await new Promise((resolvePromise) => setTimeout(resolvePromise, Math.min(5000, deadline - Date.now())))
  }

  throw new Error(`5 分钟内仍无法从 npm 查询 ${name}@${version}；稍后运行 pnpm portal:release:resume 恢复`, {
    cause: lastError,
  })
}

try {
  if (resume) ensureResumableWorktree()
  else ensureCleanWorktree()
  run('pnpm', ['check'])
  if (!resume) run('npm', ['version', 'patch', '--no-git-tag-version'])

  const { name, version } = packageInfo()
  if (!resume) {
    try {
      run('npm', ['publish', '--access=public', `--registry=${registry}`])
    } catch (error) {
      // 网络在 npm 已接收包之后断开时，publish 可能以失败状态退出；先查 registry，
      // 避免错误地恢复到一个事实上已经发布的版本。
      if (!publishedVersion(name, version)) throw error
    }
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
    console.error('\nnpm 已接受发布请求或正在恢复已有版本；请勿再次递增版本。')
  }

  throw error
}
