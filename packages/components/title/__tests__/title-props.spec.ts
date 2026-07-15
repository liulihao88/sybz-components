import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const rootDir = resolve(__dirname, '../../../..')
const readText = (path: string) => readFileSync(resolve(rootDir, path), 'utf8')

describe('title component props', () => {
  it('keeps props aligned across component, declarations and docs', () => {
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

    expect(component).toContain("size: 'default'")
    expect(component).toContain("tag: 'div'")
    expect(component).toContain('level: 3')

    expect(componentDeclaration).toContain('size?: SybzComponentSize')
    expect(componentDeclaration).toContain('margin?: string | number')
    expect(componentDeclaration).toContain('gap?: string | number')
    expect(componentDeclaration).toContain("type?: '' | 'simple' | 'icon' | 'form'")
    expect(componentDeclaration).toContain("tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'")
    expect(componentDeclaration).toContain('level?: 1 | 2 | 3 | 4 | 5 | 6')

    expect(docs).toContain('`size`')
    expect(docs).toContain('`margin`')
    expect(docs).toContain('`gap`')
    expect(docs).toContain("`''` / `icon` / `simple` / `form`")
    expect(docs).toContain('| `default` |')
    expect(docs).toContain('`tag`')
    expect(docs).toContain('`level`')
  })

  it('renders prop, default slot and title slot through the same title wrapper', () => {
    const component = readText('packages/components/title/src/index.vue')
    const componentDeclaration = readText('packages/types/components/title.d.ts')
    const docs = readText('docs/components/title/home.md')

    expect(component).toContain('<component :is="mergedProps.tag" class="s-title__text" v-bind="titleA11yAttrs">')
    expect(component).toContain('<slot name="title">')
    expect(component).toContain('<slot>{{ mergedProps.title }}</slot>')
    expect(component).toContain("role: 'heading'")
    expect(component).toContain("'aria-level': mergedProps.value.level")
    expect(component).toContain('v-if="$slots.append" class="s-title__append"')
    expect(component).not.toContain('name="icon" class="icon_slot"')

    expect(componentDeclaration).toContain('append?: () => any')
    expect(componentDeclaration).toContain('@deprecated 使用 extra 插槽代替。')
    expect(docs).toContain('标题内容按 `title` 命名插槽、默认插槽、`title` 属性的顺序取值')
    expect(docs).toContain('| `append`')
    expect(docs).toContain('|  `right`  | 已废弃')
  })

  it('keeps title overflow behavior aligned across all themes', () => {
    const component = readText('packages/components/title/src/index.vue')
    const chenghuaTheme = readText('packages/styles/themes/chenghua/title.scss')
    const shijingshanTheme = readText('packages/styles/themes/shijingshan/title.scss')

    expect(component).toContain('.s-title__text {')
    expect(component).toContain('min-width: 0;')
    expect(component).toContain('text-overflow: ellipsis;')
    expect(chenghuaTheme).toContain('.s-title__text {')
    expect(shijingshanTheme).toContain('.s-title__text {')
    expect(chenghuaTheme).not.toContain('.title-text')
    expect(shijingshanTheme).not.toContain('.title-text')
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
