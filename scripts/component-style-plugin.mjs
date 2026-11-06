import { existsSync } from 'node:fs'
import { dirname, posix, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile, compileString } from 'sass'

const themes = ['chenghua', 'shijingshan', 'sybz']
const stylesRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../packages/styles')
const componentName = (entry) =>
  entry
    .split('/')
    .at(-1)
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

const relativeImport = (from, to) => {
  const path = posix.relative(posix.dirname(from), to)
  return path.startsWith('.') ? path : `./${path}`
}

export const componentStylePlugin = (entryNames) => ({
  name: 'sybz-component-styles',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const base = compile(resolve(stylesRoot, 'on-demand-base.scss'), { style: 'compressed' })
    this.emitFile({ type: 'asset', fileName: 'components/base.css', source: base.css })

    const entrySet = new Set(entryNames)
    const emittedThemes = new Set()
    for (const output of Object.values(bundle)) {
      if (output.type !== 'chunk') continue

      // Vite extracts SFC styles into CSS assets in library mode. Restore the
      // imports so a consumer importing only the JS entry receives those styles.
      const styles = new Set(output.viteMetadata?.importedCss ?? [])
      const entry = output.name
      const components = new Set(
        Object.keys(output.modules ?? {})
          .map((id) => id.replaceAll('\\', '/').match(/\/packages\/components\/((?:company\/)?[^/]+)\//)?.[1])
          .filter((name) => name && entrySet.has(`components/${name}`))
          .map((name) => `components/${name}`),
      )
      if (output.isEntry && entrySet.has(entry)) {
        styles.add('components/base.css')
        components.add(entry)
      }

      for (const component of components) {
        const name = componentName(component)
        const imports = themes
          .filter((theme) => existsSync(resolve(stylesRoot, 'themes', theme, `${name}.scss`)))
          .map((theme) => `@import 'themes/${theme}/${name}.scss';`)

        if (imports.length) {
          const styleFile = `${component}.css`
          if (!emittedThemes.has(styleFile)) {
            const result = compileString(imports.join('\n'), { loadPaths: [stylesRoot], style: 'compressed' })
            this.emitFile({ type: 'asset', fileName: styleFile, source: result.css })
            emittedThemes.add(styleFile)
          }
          styles.add(styleFile)
        }
      }

      if (styles.size) {
        output.code =
          [...styles].map((style) => `import ${JSON.stringify(relativeImport(output.fileName, style))};`).join('\n') +
          '\n' +
          output.code
      }
    }
  },
})
