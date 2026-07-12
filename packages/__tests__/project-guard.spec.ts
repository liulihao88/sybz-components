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
    const utilsPkg = readJson<{ scripts: Record<string, string> }>('packages/utils/package.json')

    expect(pkg.scripts.build).toBe(
      'pnpm types:generate && vite build && vite build --config packages/components/company/chart/vite.config.js',
    )
    expect(pkg.scripts['check:components']).toBe('pnpm typecheck && pnpm typecheck:sfc && pnpm test')
    expect(pkg.scripts['check:utils']).toBe('pnpm exec tsc --noEmit -p packages/utils/tsconfig.json && pnpm test:utils')
    expect(pkg.scripts['release:check']).toBe(
      'pnpm typecheck && pnpm typecheck:sfc && pnpm exec tsc --noEmit -p packages/utils/tsconfig.json && pnpm buildAll',
    )
    expect(pkg.scripts.prepublishOnly).toBe('pnpm release:check')
    expect(pkg.scripts.release).toBe('pnpm release:check && npm version patch && npm publish --ignore-scripts')
    expect(pkg.scripts['release-deploy']).toBe('pnpm release && npm run deploy -- --skip_build')
    expect(pkg.scripts['release:check']).not.toContain('pnpm test')
    expect(pkg.scripts['release:check']).not.toContain('test:utils')
    expect(pkg.scripts.buildAll).toBe('pnpm build && pnpm run -C packages/utils build')
    expect(pkg.scripts['utils:release']).toBe('pnpm run -C packages/utils release')
    expect(utilsPkg.scripts.typecheck).toBe('tsc --noEmit -p tsconfig.json')
    expect(utilsPkg.scripts.test).toBe('vitest run --root ../.. packages/utils/src')
    expect(utilsPkg.scripts.build).toBe('npx unbuild')
    expect(utilsPkg.scripts.release).toBe('node ./scripts/release.mjs')
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
    expect(output).toContain('Skip version bump: no')
    expect(output).toContain('Skip check: no')
    expect(output).toContain('1. Run typecheck and tests')
    expect(output).toContain('3. Run unbuild')
    expect(output).toContain('5. git commit -m "chore: release @sybz-components/utils')
    expect(output).toContain('if staged changes exist')
    expect(output).toContain('6. npm publish')
  })

  it('allows utils release to keep a manually edited version', () => {
    const packageJsonPath = 'packages/utils/package.json'
    const before = readText(packageJsonPath)
    const output = execFileSync('node', ['packages/utils/scripts/release.mjs', '--dry-run'], {
      cwd: rootDir,
      encoding: 'utf8',
      env: {
        ...process.env,
        SKIP_VERSION_BUMP: '1',
      },
    })
    const after = readText(packageJsonPath)
    const pkg = JSON.parse(before)

    expect(after).toBe(before)
    expect(output).toContain(`Current version: ${pkg.version}`)
    expect(output).toContain(`Next version: ${pkg.version}`)
    expect(output).toContain('Skip version bump: yes')
    expect(output).toContain('2. Keep package.json version')
    expect(output).toContain('if staged changes exist')
    expect(readText('packages/utils/scripts/release.mjs')).toContain('git commit skipped: no staged files found')
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

  it('keeps descriptions callback and slot context aligned on option', () => {
    const component = readText('packages/components/descriptions/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const docs = readText('docs/components/descriptions/home.md')
    const slotDemo = readText('docs/components/descriptions/slot.vue')

    expect(component).toContain('option: ItemOptions')
    expect(component).toContain(':option="option"')
    expect(component).not.toContain('row: renderOption')
    expect(component).not.toContain('item: renderOption')
    expect(component).not.toContain('column: renderOption')
    expect(componentProps).toContain('option: SDescriptionsItemOption')
    expect(componentProps).not.toContain('SDescriptionsRow')
    expect(docs).toContain('`option` 为当前描述项数据')
    expect(slotDemo).toContain('#nameLabel="{ option, value, index, label }"')
  })

  it('keeps checkbox and select customLabel contexts aligned on option', () => {
    const checkbox = readText('packages/components/checkbox/src/index.vue')
    const select = readText('packages/components/select/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const checkboxDocs = readText('docs/components/checkbox/home.md')
    const selectDocs = readText('docs/components/select/home.md')

    expect(checkbox).toContain('props.customLabel({ option, index, value: getOptionValue(option) })')
    expect(select).toContain('props.customLabel({ option, index, value: getOptionValue(option) })')
    expect(checkbox).not.toContain('props.customLabel(item, index)')
    expect(select).not.toContain('props.customLabel(item)')
    expect(componentProps).toContain('customLabel?: (context: SCheckboxOptionContext<Option>) => any')
    expect(componentProps).toContain('customLabel?: (context: SSelectOptionContext<Option>) => any')
    expect(checkboxDocs).toContain('`{ option, index, value }`')
    expect(selectDocs).toContain('`{ option, index, value }`')
  })

  it('keeps checkbox and select customDisabled contexts aligned on option', () => {
    const select = readText('packages/components/select/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/select.d.ts')
    const docs = readText('docs/components/select/home.md')

    expect(select).toContain('customDisabled?: (context: SSelectOptionContext) => boolean | null')
    expect(select).toContain('props.customDisabled({ option, index, value: getOptionValue(option) })')
    expect(select).not.toContain('itemDisabled')
    expect(componentProps).toContain('customDisabled?: (context: SSelectOptionContext<Option>) => boolean')
    expect(componentTypes).toContain('customDisabled?: (context: SSelectOptionContext) => boolean')
    expect(docs).toContain('`customDisabled`')
    expect(docs).not.toContain('`itemDisabled`')
  })

  it('keeps select changeSelect payload as an object with index', () => {
    const select = readText('packages/components/select/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/select.d.ts')
    const docs = readText('docs/components/select/home.md')
    const demo = readText('docs/components/select/multiple.vue')

    expect(select).toContain("emits('changeSelect', { value, label, option, index })")
    expect(select).not.toContain("emits('changeSelect', item, selectLabel, selectObj)")
    expect(componentProps).toContain('export interface SSelectChangeContext')
    expect(componentProps).toContain('index: number | number[] | undefined')
    expect(componentTypes).toContain("(event: 'changeSelect', context: SSelectChangeContext): void")
    expect(docs).toContain('{ value, label, option, index }')
    expect(demo).toContain('function changeSelect({ value, label, option, index }: SSelectChangeContext)')
    expect(demo).toContain("import type { SSelectChangeContext } from 'sybz-components'")
  })

  it('keeps form callback and slot context aligned on option', () => {
    const component = readText('packages/components/form/src/index.vue')
    const renderer = readText('packages/components/form/src/renderComp.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const docs = readText('docs/components/form/home.md')
    const titleDemo = readText('docs/components/form/title.vue')

    expect(component).toContain('option: item')
    expect(component).not.toContain('row: formModel.value')
    expect(component).not.toContain('column: item')
    expect(renderer).toContain('props.render(props.context)')
    expect(renderer).not.toContain('createRenderContext')
    expect(componentProps).toContain('option: SFormFieldItem | SFormTitleItem')
    expect(componentProps).not.toContain('export interface SFormContext extends SRenderContext')
    expect(docs).toContain('{ option, model, value, prop, index, formRef, getValue, setValue, setFieldValue }')
    expect(titleDemo).toContain('#slotTitle="{ option }"')
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

  it('keeps card transparent prop wired through component, types and docs', () => {
    const component = readText('packages/components/card/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/card.d.ts')
    const docs = readText('docs/components/card/home.md')

    expect(component).toContain('transparent?: boolean')
    expect(component).toContain('transparent: false')
    expect(component).toContain("'s-card--transparent': mergedProps.value.transparent")
    expect(componentProps).toContain('transparent?: boolean')
    expect(componentTypes).toContain('transparent?: boolean')
    expect(docs).toContain('<SCard transparent title="透明背景">')
  })

  it('keeps card size able to control padding with processWidth', () => {
    const component = readText('packages/components/card/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/card.d.ts')
    const docs = readText('docs/components/card/home.md')
    const demo = readText('docs/components/card/other.vue')

    expect(component).toContain("import { processWidth } from '@sybz-components/utils'")
    expect(component).toContain("if (size === 'large') return '24px'")
    expect(component).toContain("if (size === 'small') return '8px'")
    expect(component).not.toContain('if (size === 0)')
    expect(component).toContain("return processWidth(size, true) || '16px'")
    expect(componentProps).toContain('size?: SybzComponentSize | string | number')
    expect(componentTypes).toContain('size?: SybzComponentSize | string | number')
    expect(docs).toContain('`small` / `default` / `large` / string / number')
    expect(demo).toContain("const sizeOptions = ['large', 'default', 'small', 20, '2rem', 0]")
  })

  it('keeps card shadow and hover animation props wired through component, types, themes and docs', () => {
    const component = readText('packages/components/card/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentTypes = readText('packages/types/components/card.d.ts')
    const docs = readText('docs/components/card/home.md')
    const demo = readText('docs/components/card/shadow.vue')
    const chenghuaTheme = readText('packages/styles/themes/chenghua/card.scss')
    const shijingshanTheme = readText('packages/styles/themes/shijingshan/card.scss')

    expect(component).toContain('hoverAnimation?: boolean')
    expect(component).toContain("shadow?: 'always' | 'never' | 'hover'")
    expect(component).toContain('hoverAnimation: false')
    expect(component).toContain("shadow: 'never'")
    expect(component).toContain("'s-card--hover-animation': mergedProps.value.hoverAnimation")
    expect(component).toContain("'s-card--shadow-always': mergedProps.value.shadow === 'always'")
    expect(component).toContain("'s-card--shadow-hover': mergedProps.value.shadow === 'hover'")
    expect(componentProps).toContain("shadow?: 'always' | 'never' | 'hover'")
    expect(componentTypes).toContain("shadow?: 'always' | 'never' | 'hover'")
    expect(docs).toContain('card/shadow')
    expect(demo).toContain("const shadowOptions = ['always', 'never', 'hover']")
    expect(chenghuaTheme).not.toContain('box-shadow: var(--s-card-shadow);')
    expect(shijingshanTheme).not.toContain('box-shadow: var(--s-card-shadow);')
  })
})
