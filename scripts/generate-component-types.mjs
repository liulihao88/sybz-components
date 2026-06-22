import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const rootDir = process.cwd()
const componentsDir = resolve(rootDir, 'packages/components')
const outputPath = resolve(rootDir, 'packages/components.d.ts')
const componentTypeDir = resolve(rootDir, 'packages/types/components')

const EXCLUDED_COMPONENT_DIRS = new Set(['common', 'company', 'customMessage', 'utils'])

const TYPED_COMPONENT_PROPS = new Map([
  ['SBuildTime', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SBuildTimeProps' }],
  ['SButton', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SButtonProps' }],
  ['SDatePicker', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SDatePickerProps' }],
  ['SDescriptions', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SDescriptionsProps' }],
  ['SDialog', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SDialogProps' }],
  ['SEmpty', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SEmptyProps' }],
  ['SForm', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SFormProps' }],
  ['SRadio', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SRadioProps' }],
  ['SSelect', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SSelectProps' }],
  ['SSplitPane', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SSplitPaneProps' }],
  ['STable', { importPath: resolve(rootDir, 'packages/types/table.d.ts'), typeName: 'STableProps' }],
  ['STitle', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'STitleProps' }],
  ['STooltip', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'STooltipProps' }],
  ['SWarning', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SWarningProps' }],
])

const toPosixPath = (value) => value.replaceAll('\\', '/')

const toPascalCase = (value) =>
  value
    .replace(/(^|[-_/])([a-zA-Z0-9])/g, (_match, _prefix, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '')

const collectComponentEntries = () => {
  const groups = [
    { baseDir: componentsDir, segments: [] },
    { baseDir: resolve(componentsDir, 'company'), segments: ['company'] },
  ]

  return groups.flatMap(({ baseDir, segments }) => {
    if (!segments.length) {
      return readdirSync(baseDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !EXCLUDED_COMPONENT_DIRS.has(entry.name))
        .map((entry) => ({
          dirName: entry.name,
          wrapperPath: `./types/components/${entry.name}`,
          wrapperFilePath: resolve(componentTypeDir, `${entry.name}.d.ts`),
        }))
    }

    return readdirSync(baseDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({
        dirName: entry.name,
        wrapperPath: `./types/components/${segments.join('/')}/${entry.name}`,
        wrapperFilePath: resolve(componentTypeDir, segments.join('/'), `${entry.name}.d.ts`),
      }))
  })
}

const componentEntries = collectComponentEntries()
  .map(({ dirName, wrapperPath, wrapperFilePath }) => {
    const componentName = `S${toPascalCase(dirName)}`
    return {
      componentName,
      wrapperPath,
      wrapperFilePath,
      instanceTypeName: `${componentName}Instance`,
      publicPropsTypeName: `${componentName}PublicProps`,
    }
  })
  .sort((left, right) => left.componentName.localeCompare(right.componentName))

const existingTableImports = `import type {
  STableButton as STableButtonType,
  STableColumn as STableColumnType,
  STablePageAttrs as STablePageAttrsType,
  STableProps as STablePropsType,
  TableCellContext as TableCellContextType,
  TableCallbackContext as TableCallbackContextType,
  TableColumnList as TableColumnListType,
  TableFilterContext as TableFilterContextType,
  TableFilter as TableFilterType,
  TableModelValue as TableModelValueType,
  TablePageChangePayload as TablePageChangePayloadType,
  TableSelectionType as TableSelectionTypeType,
} from './types/table'`

const tableAliases = [
  'TableBtnItem = STableButtonType',
  'TableColumnItem = STableColumnType',
  'TableColumnList = TableColumnListType',
  'TableCellContext = TableCellContextType',
  'TableCallbackContext = TableCallbackContextType',
  'TableFilter = TableFilterType',
  'TableFilterContext = TableFilterContextType',
  'TableModelValue = TableModelValueType',
  'TablePageChangePayload = TablePageChangePayloadType',
  'STablePageAttrs = STablePageAttrsType',
  'TableSelectionType = TableSelectionTypeType',
  'STableProps = STablePropsType',
]

const lines = [
  existingTableImports,
  '',
  'type ComponentInstance<T> = T extends new (...args: any[]) => infer R ? R : never',
  '',
]

if (tableAliases.length) {
  lines.push('declare global {')
  tableAliases.forEach((line) => {
    lines.push(`  type ${line}`)
  })
  lines.push('}')
  lines.push('')
}

lines.push('declare module \'vue\' {')
lines.push('  export interface GlobalComponents {')
componentEntries.forEach(({ componentName, wrapperPath }) => {
  lines.push(`    ${componentName}: (typeof import('${wrapperPath}'))['default']`)
})
lines.push('  }')
lines.push('}')
lines.push('')

componentEntries.forEach(({ componentName, wrapperPath, instanceTypeName, publicPropsTypeName }) => {
  lines.push(`export type ${componentName}Component = (typeof import('${wrapperPath}'))['default']`)
  lines.push(`export type ${instanceTypeName} = ComponentInstance<${componentName}Component>`)
  lines.push(`export type ${publicPropsTypeName} = ${instanceTypeName}['$props']`)
  lines.push('')
})

lines.push('export {}')
lines.push('')

writeFileSync(outputPath, `${lines.join('\n')}`)

componentEntries.forEach(({ componentName, wrapperFilePath }) => {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const wrapperDir = dirname(wrapperFilePath)
  const sharedImportPath = toPosixPath(relative(wrapperDir, resolve(componentTypeDir, '_shared.d.ts')).replace(/\.d\.ts$/, ''))
  const wrapperLines = [`import type { InstallableComponent } from '${sharedImportPath.startsWith('.') ? sharedImportPath : `./${sharedImportPath}`}'`]

  if (typedComponent) {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    wrapperLines.push(`import type { ${typedComponent.typeName} } from '${normalizedPropsImportPath}'`)
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: InstallableComponent<${typedComponent.typeName}>`)
  } else {
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: InstallableComponent`)
  }

  wrapperLines.push(`export default ${componentName}`)
  wrapperLines.push('')

  mkdirSync(wrapperDir, { recursive: true })
  writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
})
