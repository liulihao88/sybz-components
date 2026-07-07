import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const rootDir = resolve(__dirname, '../..')

const readJson = <T = Record<string, any>>(path: string): T => {
  return JSON.parse(readFileSync(resolve(rootDir, path), 'utf8')) as T
}

const readText = (path: string) => readFileSync(resolve(rootDir, path), 'utf8')

const collectTextFiles = (dir: string): string[] => {
  const absoluteDir = resolve(rootDir, dir)

  return readdirSync(absoluteDir).flatMap((name) => {
    const filePath = resolve(absoluteDir, name)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      return collectTextFiles(`${dir}/${name}`)
    }

    return /\.(d\.ts|ts|vue|md)$/.test(name) ? [filePath] : []
  })
}

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

  it('keeps HTML string rendering API limited to dangerouslyUseHTMLString', () => {
    const legacyProp = ['dangerouslyUse', 'HtmlString'].join('')
    const legacyKebab = ['dangerously-use', 'html-string'].join('-')
    const legacyAcronymKebab = ['dangerously-use', 'h-t-m-l-string'].join('-')
    const files = [...collectTextFiles('packages'), ...collectTextFiles('docs/components')]

    for (const file of files) {
      const content = readFileSync(file, 'utf8')

      expect(content, file).not.toContain(legacyProp)
      expect(content, file).not.toContain(legacyKebab)
      expect(content, file).not.toContain(legacyAcronymKebab)
    }
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

  it('keeps shijingshan theme wired through global type, class, style and docs', () => {
    const button = readText('packages/components/button/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const styleEntry = readText('packages/styles/index.scss')
    const themeEntry = readText('packages/styles/themes/shijingshan.scss')
    const themeTokens = readText('packages/styles/themes/shijingshan/tokens.scss')
    const buttonThemeStyle = readText('packages/styles/themes/shijingshan/button.scss')
    const buttonDocs = readText('docs/components/button/home.md')

    expect(button).toContain("'s-button--shijingshan': mergedProps.value.theme === 'shijingshan'")
    expect(componentProps).toContain("export type SybzComponentTheme = 'default' | 'chenghua' | 'shijingshan'")
    expect(componentProps).not.toContain('SButtonTheme')
    expect(styleEntry).toContain("@import './themes/shijingshan.scss';")
    expect(themeEntry).toContain("@import './shijingshan/button.scss';")
    expect(themeTokens).toContain('--s-sjs-primary: #2a6df4')
    expect(buttonThemeStyle).toContain('.s-button--shijingshan.s-button--shijingshan')
    expect(buttonDocs).toContain('button/shijingshan/base')
  })

  it('keeps shijingshan theme component style coverage aligned with chenghua', () => {
    const chenghuaEntry = readText('packages/styles/themes/chenghua.scss')
    const shijingshanEntry = readText('packages/styles/themes/shijingshan.scss')
    const chenghuaImports = Array.from(chenghuaEntry.matchAll(/@import '\.\/chenghua\/([^']+)';/g)).map(
      (match) => match[1],
    )

    for (const styleFile of chenghuaImports) {
      expect(shijingshanEntry, styleFile).toContain(`@import './shijingshan/${styleFile}';`)
      const styleContent = readText(`packages/styles/themes/shijingshan/${styleFile}`)
      expect(styleContent.trim(), styleFile).not.toBe('')
      expect(styleContent, styleFile).toContain(styleFile === 'tokens.scss' ? '--s-sjs-' : 'shijingshan')
    }
  })

  it('keeps basic layout transparent prop wired through component, types and docs', () => {
    const component = readText('packages/components/basicLayout/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/basicLayout.d.ts')
    const docs = readText('docs/components/basicLayout/home.md')

    expect(component).toContain('transparent?: boolean')
    expect(component).toContain('transparent: false')
    expect(component).toContain("'s-basic-layout--transparent': mergedProps.value.transparent")
    expect(componentProps).toContain('transparent?: boolean')
    expect(componentTypes).toContain('transparent?: boolean')
    expect(docs).toContain('<SBasicLayout transparent title="透明背景">')
  })

  it('keeps basic layout size able to control padding with processWidth', () => {
    const component = readText('packages/components/basicLayout/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/basicLayout.d.ts')
    const docs = readText('docs/components/basicLayout/home.md')
    const demo = readText('docs/components/basicLayout/other.vue')

    expect(component).toContain("import { processWidth } from '@sybz-components/utils'")
    expect(component).toContain("if (size === 'large') return '24px'")
    expect(component).toContain("if (size === 'small') return '8px'")
    expect(component).toContain("if (size === 0) return '0px'")
    expect(component).toContain("return processWidth(size, true) || '16px'")
    expect(componentProps).toContain('size?: SybzComponentSize | string | number')
    expect(componentTypes).toContain('size?: SybzComponentSize | string | number')
    expect(docs).toContain('`small` / `default` / `large` / string / number')
    expect(demo).toContain("const sizeOptions = ['large', 'default', 'small', 20, '2rem', 0]")
  })
})
