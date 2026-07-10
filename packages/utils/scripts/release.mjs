import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(scriptDir, '..')
const rootDir = resolve(packageDir, '../..')
const packageJsonPath = resolve(packageDir, 'package.json')
const dryRun = process.argv.includes('--dry-run')
const skipCheck = process.argv.includes('--skip-check') || ['1', 'true', 'yes'].includes(process.env.SKIP_CHECK ?? '')
const skipVersionBump =
  process.argv.includes('--skip-version-bump') || ['1', 'true', 'yes'].includes(process.env.SKIP_VERSION_BUMP ?? '')

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

function hasStagedChanges() {
  try {
    execFileSync('git', ['diff', '--cached', '--quiet'], {
      cwd: packageDir,
      stdio: 'ignore',
    })
    return false
  } catch (error) {
    if (error?.status === 1) {
      return true
    }

    throw error
  }
}

function main() {
  const pkg = readPackageJson()
  const nextVersion = skipVersionBump ? pkg.version : bumpPatchVersion(pkg.version)
  const commitMessage = `chore: release @sybz-components/utils v${nextVersion}`

  if (dryRun) {
    console.log(`Current version: ${pkg.version}`)
    console.log(`Next version: ${nextVersion}`)
    console.log(`Skip check: ${skipCheck ? 'yes' : 'no'}`)
    console.log(`Skip version bump: ${skipVersionBump ? 'yes' : 'no'}`)
    console.log('Planned steps:')
    console.log(skipCheck ? '1. Skip typecheck and tests' : '1. Run typecheck and tests')
    console.log(skipVersionBump ? '2. Keep package.json version' : '2. Update package.json version')
    console.log('3. Run unbuild')
    console.log('4. git add -A .')
    console.log(`5. git commit -m "${commitMessage}" if staged changes exist`)
    console.log('6. npm publish')
    return
  }

  if (skipCheck) {
    console.log('Release checks skipped')
  } else {
    run('pnpm', ['typecheck'])
    run('pnpm', ['test'])
  }

  if (skipVersionBump) {
    console.log(`Version kept: ${pkg.version}`)
  } else {
    pkg.version = nextVersion
    writePackageJson(pkg)
    console.log(`Version bumped: ${pkg.version}`)
  }

  run('npx', ['unbuild'])
  run('git', ['add', '-A', '.'])

  if (hasStagedChanges()) {
    run('git', ['commit', '-m', commitMessage])
  } else {
    console.log('\n> git commit skipped: no staged files found')
  }

  run('npm', ['publish'])
}

main()
