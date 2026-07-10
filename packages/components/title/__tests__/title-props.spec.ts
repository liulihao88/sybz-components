import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const rootDir = resolve(__dirname, '../../../..')
const readText = (path: string) => readFileSync(resolve(rootDir, path), 'utf8')

describe('title component props', () => {
  it('keeps size, spacing and type props aligned across component, types and docs', () => {
    const component = readText('packages/components/title/src/index.vue')
    const componentProps = readText('packages/types/component-props.d.ts')
    const componentDeclaration = readText('packages/types/components/title.d.ts')
    const docs = readText('docs/components/title/home.md')

    expect(component).toContain('const titleSizeMap')
    expect(component).toContain('margin?: string | number')
    expect(component).toContain('gap?: string | number')
    expect(component).toContain("type TitleType = '' | 'simple' | 'icon' | 'form'")

    expect(componentProps).toContain('size?: SybzComponentSize')
    expect(componentProps).toContain('margin?: string | number')
    expect(componentProps).toContain('gap?: string | number')
    expect(componentProps).toContain("type?: '' | 'simple' | 'icon' | 'form'")

    expect(componentDeclaration).toContain("size?: '' | 'small' | 'default' | 'large'")
    expect(componentDeclaration).toContain('margin?: string | number')
    expect(componentDeclaration).toContain('gap?: string | number')
    expect(componentDeclaration).toContain("type?: '' | 'simple' | 'icon' | 'form'")

    expect(docs).toContain('`size`')
    expect(docs).toContain('`margin`')
    expect(docs).toContain('`gap`')
    expect(docs).toContain("`''` / `icon` / `simple` / `form`")
  })

  it('does not render a default bottom divider line', () => {
    const component = readText('packages/components/title/src/index.vue')
    const chenghuaTheme = readText('packages/styles/themes/chenghua/title.scss')
    const shijingshanTheme = readText('packages/styles/themes/shijingshan/title.scss')

    expect(component).not.toContain('border-bottom: 1px dashed')
    expect(chenghuaTheme).not.toContain('rgba(var(--s-ch-primary-rgb), 0.28)')
    expect(shijingshanTheme).not.toContain('background: var(--s-sjs-divider)')
  })
})
