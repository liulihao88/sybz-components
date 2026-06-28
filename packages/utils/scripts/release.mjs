import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(scriptDir, '..')
const rootDir = resolve(packageDir, '../..')
const packageJsonPath = resolve(packageDir, 'package.json')
const dryRun = process.argv.includes('--dry-run')

function readPackageJson() {
  return JSON.parse(readFileSync(packageJsonPath, 'utf8'))
}

function writePackageJson(pkg) {
  writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
}

function bumpPatchVersion(version) {
  const versionParts = version.split('.').map((item) => Number(item))

  if (versionParts.length !== 3 || versionParts.some((item) => Number.isNaN(item))) {
    throw new Error(`Unsupported version format: ${version}`)
  }

  versionParts[2] += 1
  return versionParts.join('.')
}

function run(command, args, options = {}) {
  const commandText = [command, ...args].join(' ')
  const cwd = options.cwd ?? packageDir
  console.log(`\n> ${commandText}`)
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  })
}

function main() {
  const pkg = readPackageJson()
  const nextVersion = bumpPatchVersion(pkg.version)
  const commitMessage = `chore: release @sybz-components/utils v${nextVersion}`

  if (dryRun) {
    console.log(`Current version: ${pkg.version}`)
    console.log(`Next version: ${nextVersion}`)
    console.log('Planned steps:')
    console.log('1. Run utils tests')
    console.log('2. Update package.json version')
    console.log('3. Build dist with unbuild')
    console.log('4. git add -A .')
    console.log(`5. git commit -m "${commitMessage}"`)
    console.log('6. npm publish')
    return
  }

  run('pnpm', ['test:utils'], { cwd: rootDir })

  pkg.version = nextVersion
  writePackageJson(pkg)

  console.log(`Version bumped: ${pkg.version}`)

  run('npx', ['unbuild'])
  run('git', ['add', '-A', '.'])
  run('git', ['commit', '-m', commitMessage])
  run('npm', ['publish'])
}

main()
