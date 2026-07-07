import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const rootDir = resolve(__dirname, '../..')

const readJson = <T = Record<string, any>>(path: string): T => {
  return JSON.parse(readFileSync(resolve(rootDir, path), 'utf8')) as T
}

const readText = (path: string) => readFileSync(resolve(rootDir, path), 'utf8')

describe('project dependency guards', () => {
  it('keeps only host-owned packages in peerDependencies', () => {
    const pkg = readJson<{
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
      peerDependencies: Record<string, string>
    }>('package.json')

    expect(pkg.peerDependencies).toEqual({
      'element-plus': '>=2.3.0 <3',
      vue: '>=3.4.0 <4',
    })

    expect(pkg.dependencies).toMatchObject({
      '@element-plus/icons-vue': expect.any(String),
      '@sybz-components/utils': expect.any(String),
      '@vueuse/core': expect.any(String),
    })

    expect(pkg.devDependencies).not.toHaveProperty('@element-plus/icons-vue')
    expect(pkg.devDependencies).not.toHaveProperty('@vueuse/core')
  })

  it('keeps install docs aligned with runtime dependencies', () => {
    const readme = readText('README.md')
    const usageGuide = readText('docs/components/usageGuide/home.md')

    expect(readme).toContain('pnpm add sybz-components element-plus')
    expect(readme).toContain('npm install sybz-components element-plus')
    expect(readme).toContain('yarn add sybz-components element-plus')
    expect(readme).toContain('bun add sybz-components element-plus')
    expect(readme).toContain('`@element-plus/icons-vue`、`@vueuse/core` 由组件库依赖自动安装')

    expect(usageGuide).toContain('pnpm add sybz-components element-plus')
    expect(usageGuide).toContain('npm install sybz-components element-plus')
    expect(readme).not.toContain('sybz-components element-plus @element-plus/icons-vue @vueuse/core')
    expect(usageGuide).not.toContain('sybz-components element-plus @element-plus/icons-vue @vueuse/core')
  })
})

describe('project build and publish guards', () => {
  it('keeps package entry, exports and publish files pointed at dist output', () => {
    const pkg = readJson<{
      main: string
      module: string
      types: string
      style: string
      exports: Record<string, any>
      files: string[]
    }>('package.json')

    expect(pkg.main).toBe('dist/sybz-components-es.js')
    expect(pkg.module).toBe('dist/sybz-components-es.js')
    expect(pkg.types).toBe('dist/index.d.ts')
    expect(pkg.style).toBe('dist/style.css')
    expect(pkg.exports['.']).toEqual({
      types: './dist/index.d.ts',
      import: './dist/sybz-components-es.js',
      default: './dist/sybz-components-es.js',
    })
    expect(pkg.files).toContain('dist')
    expect(pkg.files).toContain('docs/components')
  })

  it('keeps release scripts ordered around build, version and publish steps', () => {
    const pkg = readJson<{ scripts: Record<string, string> }>('package.json')

    expect(pkg.scripts.build).toBe('pnpm types:generate && vite build')
    expect(pkg.scripts.release).toBe('pnpm build && npm version patch && npm publish')
    expect(pkg.scripts.buildAll).toBe('pnpm build && pnpm run -C packages/utils build')
    expect(pkg.scripts['utils:release']).toBe('pnpm run -C packages/utils release')
  })

  it('keeps externalized packages aligned with runtime and optional feature dependencies', () => {
    const viteConfig = readText('vite.config.js')

    for (const packageName of [
      'vue',
      'element-plus',
      '@element-plus/icons-vue',
      '@vueuse/core',
      '@sybz-components/utils',
      'echarts',
      'vue-echarts',
    ]) {
      expect(viteConfig).toContain(`'${packageName}'`)
    }

    expect(viteConfig).toContain("'@element-plus/icons-vue': 'ElementPlusIconsVue'")
    expect(viteConfig).toContain("'@vueuse/core': 'VueUse'")
    expect(viteConfig).toContain("'vue-echarts': 'VueECharts'")
  })

  it('keeps utils release dry-run non-mutating and explicit about publish steps', () => {
    const packageJsonPath = 'packages/utils/package.json'
    const before = readText(packageJsonPath)
    const output = execFileSync('node', ['packages/utils/scripts/release.mjs', '--dry-run'], {
      cwd: rootDir,
      encoding: 'utf8',
    })
    const after = readText(packageJsonPath)

    expect(after).toBe(before)
    expect(output).toContain('Current version:')
    expect(output).toContain('Next version:')
    expect(output).toContain('1. Run utils tests')
    expect(output).toContain('3. Build dist with unbuild')
    expect(output).toContain('6. npm publish')
  })
})

describe('component entry guards', () => {
  it('keeps global install options for directives and Element Plus icons', () => {
    const entry = readText('packages/index.ts')

    expect(entry).toContain("import * as ElementPlusIconsVue from '@element-plus/icons-vue'")
    expect(entry).toContain("const installOptionKeys = new Set(['registerDirectives', 'registerElementPlusIcons'])")
    expect(entry).toContain('shouldInstallOption(options.registerDirectives)')
    expect(entry).toContain('shouldInstallOption(options.registerElementPlusIcons)')
    expect(entry).toContain('app.component(`el-icon-${toLine(key)}`, component)')
  })
})
