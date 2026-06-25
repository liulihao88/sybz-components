import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const rootDir = process.cwd()
const componentsDir = resolve(rootDir, 'packages/components')
const outputPath = resolve(rootDir, 'packages/components.d.ts')
const componentTypeDir = resolve(rootDir, 'packages/types/components')

const EXCLUDED_COMPONENT_DIRS = new Set(['common', 'company', 'customMessage', 'utils'])

const TYPED_COMPONENT_PROPS = new Map([
  ['SBuildTime', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SBuildTimeProps' }],
  [
    'SBasicLayout',
    { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SBasicLayoutProps' },
  ],
  [
    'SButton',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SButtonProps',
      exportedComponentTypeName: 'SButtonComponent',
      tagName: 's-button',
      description: 's-button 按钮组件，支持 Element Plus Button 属性和 sybz 扩展属性。',
      publicPropsTypeName: 'SButtonPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'button',
    },
  ],
  ['SChart', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SChartProps' }],
  [
    'SCheckbox',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SCheckboxProps',
      exportedComponentTypeName: 'SCheckboxComponent',
      publicPropsTypeName: 'SCheckboxPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'checkbox',
    },
  ],
  [
    'SChooseArea',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SChooseAreaProps',
      exportedComponentTypeName: 'SChooseAreaComponent',
      publicPropsTypeName: 'SChooseAreaPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'cascader',
    },
  ],
  [
    'SClickOutside',
    { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SClickOutsideProps' },
  ],
  ['SCompTitle', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SCompTitleProps' }],
  [
    'SDatePicker',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SDatePickerProps',
      exportedComponentTypeName: 'SDatePickerComponent',
      publicPropsTypeName: 'SDatePickerPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'datePicker',
    },
  ],
  [
    'SDescriptions',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SDescriptionsProps',
      exportedComponentTypeName: 'SDescriptionsComponent',
      publicPropsTypeName: 'SDescriptionsPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'descriptions',
    },
  ],
  [
    'SDialog',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SDialogProps',
      exportedComponentTypeName: 'SDialogComponent',
      tagName: 's-dialog',
      description: 's-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性和 sybz 扩展属性。',
      publicPropsTypeName: 'SDialogPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'dialog',
    },
  ],
  [
    'SDrawer',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SDrawerProps',
      exportedComponentTypeName: 'SDrawerComponent',
      publicPropsTypeName: 'SDrawerPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'drawer',
    },
  ],
  [
    'SEmpty',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SEmptyProps',
      exportedComponentTypeName: 'SEmptyComponent',
      publicPropsTypeName: 'SEmptyPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'empty',
    },
  ],
  ['SFlex', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SFlexProps' }],
  [
    'SForm',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SFormProps',
      exportedComponentTypeName: 'SFormComponent',
      publicPropsTypeName: 'SFormPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'form',
    },
  ],
  [
    'SFunctionSourceCode',
    { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SFunctionSourceCodeProps' },
  ],
  ['SIcon', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SIconProps' }],
  [
    'SInput',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SInputProps',
      exportedComponentTypeName: 'SInputComponent',
      publicPropsTypeName: 'SInputPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'input',
    },
  ],
  [
    'SInputLabel',
    { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SInputLabelProps' },
  ],
  [
    'SInputNumber',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SInputNumberProps',
      exportedComponentTypeName: 'SInputNumberComponent',
      publicPropsTypeName: 'SInputNumberPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'inputNumber',
    },
  ],
  ['SItem', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SItemProps' }],
  [
    'SItemWrapper',
    { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SItemWrapperProps' },
  ],
  [
    'SPopconfirm',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SPopconfirmProps',
      exportedComponentTypeName: 'SPopconfirmComponent',
      publicPropsTypeName: 'SPopconfirmPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'popover',
    },
  ],
  [
    'SProgress',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SProgressProps',
      exportedComponentTypeName: 'SProgressComponent',
      publicPropsTypeName: 'SProgressPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'progress',
    },
  ],
  [
    'SRadio',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SRadioProps',
      exportedComponentTypeName: 'SRadioComponent',
      publicPropsTypeName: 'SRadioPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'radio',
    },
  ],
  [
    'SRow',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SRowProps',
      exportedComponentTypeName: 'SRowComponent',
      publicPropsTypeName: 'SRowPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'row',
    },
  ],
  [
    'SSelect',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SSelectProps',
      exportedComponentTypeName: 'SSelectComponent',
      publicPropsTypeName: 'SSelectPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'select',
    },
  ],
  ['SSplitPane', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SSplitPaneProps' }],
  ['SSvg', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SSvgProps' }],
  [
    'SSwitch',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SSwitchProps',
      exportedComponentTypeName: 'SSwitchComponent',
      publicPropsTypeName: 'SSwitchPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'switch',
    },
  ],
  ['STable', { importPath: resolve(rootDir, 'packages/types/table.d.ts'), typeName: 'STableProps' }],
  [
    'STabs',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'STabsProps',
      exportedComponentTypeName: 'STabsComponent',
      publicPropsTypeName: 'STabsPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'tabs',
    },
  ],
  [
    'STag',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'STagProps',
      exportedComponentTypeName: 'STagComponent',
      publicPropsTypeName: 'STagPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'tag',
    },
  ],
  ['STest', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'STestProps' }],
  ['STitle', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'STitleProps' }],
  [
    'STooltip',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'STooltipProps',
      exportedComponentTypeName: 'STooltipComponent',
      publicPropsTypeName: 'STooltipPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'tooltip',
    },
  ],
  ['SWarning', { importPath: resolve(rootDir, 'packages/types/component-props.d.ts'), typeName: 'SWarningProps' }],
])

const toPosixPath = (value) => value.replaceAll('\\', '/')

const toPascalCase = (value) =>
  value.replace(/(^|[-_/])([a-zA-Z0-9])/g, (_match, _prefix, char) => char.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '')

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_/]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()

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
      tagName: `s-${toKebabCase(dirName)}`,
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

lines.push("declare module 'vue' {")
lines.push('  export interface GlobalComponents {')
componentEntries.forEach(({ componentName, tagName, wrapperPath }) => {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const componentType = typedComponent?.exportedComponentTypeName
    ? `import('${wrapperPath}').${typedComponent.exportedComponentTypeName}`
    : `(typeof import('${wrapperPath}'))['default']`
  const globalComponentType = typedComponent?.useDefaultExportForGlobal
    ? `(typeof import('${wrapperPath}'))['default']`
    : componentType

  if (typedComponent?.description) {
    lines.push(`    /** ${typedComponent.description} */`)
  }
  lines.push(`    ${componentName}: ${globalComponentType}`)

  const templateTagName = typedComponent?.tagName || tagName
  if (templateTagName) {
    if (typedComponent?.description) {
      lines.push(`    /** ${typedComponent.description} */`)
    }
    lines.push(`    '${templateTagName}': ${globalComponentType}`)
  }
})
lines.push('  }')
lines.push('}')
lines.push('')

componentEntries.forEach(({ componentName, wrapperPath, instanceTypeName, publicPropsTypeName }) => {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const componentType = typedComponent?.exportedComponentTypeName
    ? `import('${wrapperPath}').${typedComponent.exportedComponentTypeName}`
    : `(typeof import('${wrapperPath}'))['default']`

  lines.push(`export type ${componentName}Component = ${componentType}`)
  lines.push(`export type ${instanceTypeName} = ComponentInstance<${componentName}Component>`)
  if (typedComponent?.publicPropsTypeName) {
    lines.push(`export type ${publicPropsTypeName} = import('${wrapperPath}').${typedComponent.publicPropsTypeName}`)
  } else {
    lines.push(`export type ${publicPropsTypeName} = ${instanceTypeName}['$props']`)
  }
  lines.push('')
})

lines.push('export {}')
lines.push('')

writeFileSync(outputPath, `${lines.join('\n')}`)

componentEntries.forEach(({ componentName, wrapperFilePath }) => {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const wrapperDir = dirname(wrapperFilePath)

  if (typedComponent?.explicitComponentType === 'button') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElButton } from 'element-plus'",
      `import type { ${typedComponent.typeName}, SybzComponentTheme, SybzRecord } from '${normalizedPropsImportPath}'`,
      '',
      'type ElButtonInstance = InstanceType<typeof ElButton>',
      '',
    ]

    if (typedComponent.description) {
      wrapperLines.push('/**')
      wrapperLines.push(` * ${typedComponent.description}`)
      wrapperLines.push(' *')
      wrapperLines.push(
        ' * 支持 Element Plus Button 的公开属性，并扩展 content、tooltipAttrs、theme、variant、width、height、hoverAnimation 等属性。',
      )
      wrapperLines.push(' */')
    }

    wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = ${typedComponent.typeName} &`)
    wrapperLines.push(`  Omit<ElButtonInstance['$props'], keyof ${typedComponent.typeName}>`)
    wrapperLines.push('')
    wrapperLines.push(`export type ${typedComponent.exportedComponentTypeName} = typeof ElButton & {`)
    wrapperLines.push('  new (): {')
    wrapperLines.push('    $props: {')
    wrapperLines.push('      /** 点击后进入 loading 状态的毫秒数，0 表示不启用点击节流 loading */')
    wrapperLines.push('      time?: number')
    wrapperLines.push('      /** 按钮提示内容，设置后会用 s-tooltip 包裹按钮 */')
    wrapperLines.push('      content?: string')
    wrapperLines.push('      /** 透传给 s-tooltip 的属性 */')
    wrapperLines.push('      tooltipAttrs?: SybzRecord')
    wrapperLines.push('      /** 是否允许 tooltip 内容作为 HTML 片段渲染 */')
    wrapperLines.push('      dangerouslyUseHTMLString?: boolean')
    wrapperLines.push('      /** 组件主题 */')
    wrapperLines.push('      theme?: SybzComponentTheme')
    wrapperLines.push('      /** chenghua 主题下的按钮变体 */')
    wrapperLines.push("      variant?: '' | 'outline' | 'gradient'")
    wrapperLines.push('      /** 按钮尺寸 */')
    wrapperLines.push("      size?: '' | 'small' | 'default' | 'large'")
    wrapperLines.push('      /** 按钮宽度，数字会按工具方法补单位 */')
    wrapperLines.push('      width?: string | number')
    wrapperLines.push('      /** 按钮高度，数字会按工具方法补单位 */')
    wrapperLines.push('      height?: string | number')
    wrapperLines.push('      /** 是否开启 hover 动效 */')
    wrapperLines.push('      hoverAnimation?: boolean')
    wrapperLines.push(
      "    } & Omit<ElButtonInstance['$props'], 'time' | 'content' | 'tooltipAttrs' | 'dangerouslyUseHTMLString' | 'theme' | 'variant' | 'size' | 'width' | 'height' | 'hoverAnimation'>",
    )
    wrapperLines.push("    $emit: ElButtonInstance['$emit']")
    wrapperLines.push("    $slots: ElButtonInstance['$slots']")
    wrapperLines.push('  }')
    wrapperLines.push('}')
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`)
    wrapperLines.push(`export default ${componentName}`)
    wrapperLines.push('')

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'dialog') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElDialog } from 'element-plus'",
      "import type { ElDrawer } from 'element-plus'",
      `import type { ${typedComponent.typeName}, SDialogTheme, SDialogType, SybzRecord } from '${normalizedPropsImportPath}'`,
      '',
      'type ElDialogInstance = InstanceType<typeof ElDialog>',
      'type ElDrawerInstance = InstanceType<typeof ElDrawer>',
      '',
    ]

    if (typedComponent.description) {
      wrapperLines.push('/**')
      wrapperLines.push(` * ${typedComponent.description}`)
      wrapperLines.push(' *')
      wrapperLines.push(
        ' * 支持 Element Plus Dialog 的公开属性，并补充 Drawer 相关属性与 title、theme、confirmAttrs、cancelAttrs、fillSlot 等扩展属性。',
      )
      wrapperLines.push(' */')
    }

    wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = ${typedComponent.typeName} &`)
    wrapperLines.push(`  Omit<ElDialogInstance['$props'], keyof ${typedComponent.typeName}> &`)
    wrapperLines.push(
      `  Omit<ElDrawerInstance['$props'], keyof ${typedComponent.typeName} | keyof ElDialogInstance['$props']>`,
    )
    wrapperLines.push('')
    wrapperLines.push(`export type ${typedComponent.exportedComponentTypeName} = typeof ElDialog & {`)
    wrapperLines.push('  new (): {')
    wrapperLines.push('    $props: {')
    wrapperLines.push('      type?: SDialogType')
    wrapperLines.push('      title?: string')
    wrapperLines.push('      width?: string | number')
    wrapperLines.push('      theme?: SDialogTheme')
    wrapperLines.push('      cancel?: string | ((...args: any[]) => any)')
    wrapperLines.push('      cancelText?: string')
    wrapperLines.push('      confirmText?: string')
    wrapperLines.push('      showFooter?: boolean')
    wrapperLines.push('      showCancel?: boolean')
    wrapperLines.push('      showConfirm?: boolean')
    wrapperLines.push('      confirmAttrs?: SybzRecord')
    wrapperLines.push('      cancelAttrs?: SybzRecord')
    wrapperLines.push('      enableConfirm?: boolean')
    wrapperLines.push('      confirm?: (...args: any[]) => any')
    wrapperLines.push('      fillSlot?: boolean')
    wrapperLines.push('      hideHeaderIcon?: boolean')
    wrapperLines.push(
      "    } & Omit<ElDialogInstance['$props'], 'type' | 'title' | 'width'> & Omit<ElDrawerInstance['$props'], 'type' | 'title' | 'width' | keyof ElDialogInstance['$props']>",
    )
    wrapperLines.push("    $emit: ElDialogInstance['$emit']")
    wrapperLines.push("    $slots: ElDialogInstance['$slots']")
    wrapperLines.push('  }')
    wrapperLines.push('}')
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`)
    wrapperLines.push(`export default ${componentName}`)
    wrapperLines.push('')

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'input') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElInput } from 'element-plus'",
      "import type { SInputProps, SybzComponentTheme, SybzComponentSize, SybzRecord } from '" +
        normalizedPropsImportPath +
        "'",
      '',
      'type ElInputInstance = InstanceType<typeof ElInput>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SInputProps &`,
      `  Omit<ElInputInstance['$props'], keyof SInputProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElInput & {`,
      '  new (): {',
      '    $props: {',
      '      modelValue: any',
      '      boxStyle?: SybzRecord',
      '      width?: string | number',
      '      height?: string | number',
      '      maxlength?: string | number',
      '      hideMaxLengthError?: boolean',
      '      maxLengthErrorText?: string',
      '      size?: SybzComponentSize',
      '      theme?: SybzComponentTheme',
      '      showWordLimit?: boolean | string',
      '      block?: boolean',
      '      disPlaceholder?: string',
      '      subAttrs?: SybzRecord',
      '      tooltipAttrs?: SybzRecord',
      '      iconAttrs?: SybzRecord',
      '      hideTooltip?: boolean',
      '      options?: any[]',
      '      content?: string',
      '      dangerouslyUseHTMLString?: boolean',
      "    } & Omit<ElInputInstance['$props'], keyof SInputProps>",
      "    $emit: ElInputInstance['$emit']",
      "    $slots: ElInputInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'select') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElSelect } from 'element-plus'",
      "import type { SSelectProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElSelectInstance = InstanceType<typeof ElSelect>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SSelectProps &`,
      `  Omit<ElSelectInstance['$props'], keyof SSelectProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElSelect & {`,
      '  new (): {',
      `    $props: ${typedComponent.typeName} & Omit<ElSelectInstance['$props'], keyof ${typedComponent.typeName}>`,
      "    $emit: ElSelectInstance['$emit']",
      "    $slots: ElSelectInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'tooltip') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElTooltip } from 'element-plus'",
      "import type { STooltipProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElTooltipInstance = InstanceType<typeof ElTooltip>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = STooltipProps &`,
      `  Omit<ElTooltipInstance['$props'], keyof STooltipProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElTooltip & {`,
      '  new (): {',
      `    $props: STooltipProps & Omit<ElTooltipInstance['$props'], keyof STooltipProps>`,
      "    $emit: ElTooltipInstance['$emit']",
      "    $slots: ElTooltipInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'checkbox') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElCheckboxGroup } from 'element-plus'",
      "import type { SCheckboxProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElCheckboxGroupInstance = InstanceType<typeof ElCheckboxGroup>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SCheckboxProps &`,
      `  Omit<ElCheckboxGroupInstance['$props'], keyof SCheckboxProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElCheckboxGroup & {`,
      '  new (): {',
      `    $props: SCheckboxProps & Omit<ElCheckboxGroupInstance['$props'], keyof SCheckboxProps>`,
      "    $emit: ElCheckboxGroupInstance['$emit']",
      "    $slots: ElCheckboxGroupInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'radio') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElRadioGroup } from 'element-plus'",
      "import type { SRadioProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElRadioGroupInstance = InstanceType<typeof ElRadioGroup>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SRadioProps &`,
      `  Omit<ElRadioGroupInstance['$props'], keyof SRadioProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElRadioGroup & {`,
      '  new (): {',
      `    $props: SRadioProps & Omit<ElRadioGroupInstance['$props'], keyof SRadioProps>`,
      "    $emit: ElRadioGroupInstance['$emit']",
      "    $slots: ElRadioGroupInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'empty') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElEmpty } from 'element-plus'",
      "import type { SEmptyProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElEmptyInstance = InstanceType<typeof ElEmpty>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SEmptyProps &`,
      `  Omit<ElEmptyInstance['$props'], keyof SEmptyProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElEmpty & {`,
      '  new (): {',
      `    $props: SEmptyProps & Omit<ElEmptyInstance['$props'], keyof SEmptyProps>`,
      "    $emit: ElEmptyInstance['$emit']",
      "    $slots: ElEmptyInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'tabs') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElTabs } from 'element-plus'",
      "import type { STabsProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElTabsInstance = InstanceType<typeof ElTabs>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = STabsProps &`,
      `  Omit<ElTabsInstance['$props'], keyof STabsProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElTabs & {`,
      '  new (): {',
      `    $props: STabsProps & Omit<ElTabsInstance['$props'], keyof STabsProps>`,
      "    $emit: ElTabsInstance['$emit']",
      "    $slots: ElTabsInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'tag') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElTag } from 'element-plus'",
      "import type { STagProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElTagInstance = InstanceType<typeof ElTag>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = STagProps &`,
      `  Omit<ElTagInstance['$props'], keyof STagProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElTag & {`,
      '  new (): {',
      `    $props: STagProps & Omit<ElTagInstance['$props'], keyof STagProps>`,
      "    $emit: ElTagInstance['$emit']",
      "    $slots: ElTagInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'row') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElRow } from 'element-plus'",
      "import type { SRowProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElRowInstance = InstanceType<typeof ElRow>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SRowProps &`,
      `  Omit<ElRowInstance['$props'], keyof SRowProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElRow & {`,
      '  new (): {',
      `    $props: SRowProps & Omit<ElRowInstance['$props'], keyof SRowProps>`,
      "    $emit: ElRowInstance['$emit']",
      "    $slots: ElRowInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'switch') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElSwitch } from 'element-plus'",
      "import type { SSwitchProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElSwitchInstance = InstanceType<typeof ElSwitch>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SSwitchProps &`,
      `  Omit<ElSwitchInstance['$props'], keyof SSwitchProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElSwitch & {`,
      '  new (): {',
      `    $props: SSwitchProps & Omit<ElSwitchInstance['$props'], keyof SSwitchProps>`,
      "    $emit: ElSwitchInstance['$emit']",
      "    $slots: ElSwitchInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'inputNumber') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElInputNumber } from 'element-plus'",
      "import type { SInputNumberProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElInputNumberInstance = InstanceType<typeof ElInputNumber>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SInputNumberProps &`,
      `  Omit<ElInputNumberInstance['$props'], keyof SInputNumberProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElInputNumber & {`,
      '  new (): {',
      `    $props: SInputNumberProps & Omit<ElInputNumberInstance['$props'], keyof SInputNumberProps>`,
      "    $emit: ElInputNumberInstance['$emit']",
      "    $slots: ElInputNumberInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'popover') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElPopover } from 'element-plus'",
      "import type { SPopconfirmProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElPopoverInstance = InstanceType<typeof ElPopover>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SPopconfirmProps &`,
      `  Omit<ElPopoverInstance['$props'], keyof SPopconfirmProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElPopover & {`,
      '  new (): {',
      `    $props: SPopconfirmProps & Omit<ElPopoverInstance['$props'], keyof SPopconfirmProps>`,
      "    $emit: ElPopoverInstance['$emit']",
      "    $slots: ElPopoverInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'datePicker') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElDatePicker } from 'element-plus'",
      "import type { SDatePickerProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElDatePickerInstance = InstanceType<typeof ElDatePicker>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SDatePickerProps &`,
      `  Omit<ElDatePickerInstance['$props'], keyof SDatePickerProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElDatePicker & {`,
      '  new (): {',
      `    $props: SDatePickerProps & Omit<ElDatePickerInstance['$props'], keyof SDatePickerProps>`,
      "    $emit: ElDatePickerInstance['$emit']",
      "    $slots: ElDatePickerInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'cascader') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElCascader } from 'element-plus'",
      "import type { SChooseAreaProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElCascaderInstance = InstanceType<typeof ElCascader>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SChooseAreaProps &`,
      `  Omit<ElCascaderInstance['$props'], keyof SChooseAreaProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElCascader & {`,
      '  new (): {',
      `    $props: SChooseAreaProps & Omit<ElCascaderInstance['$props'], keyof SChooseAreaProps>`,
      "    $emit: ElCascaderInstance['$emit']",
      "    $slots: ElCascaderInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'drawer') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElDrawer } from 'element-plus'",
      "import type { SDrawerProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElDrawerInstance = InstanceType<typeof ElDrawer>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SDrawerProps &`,
      `  Omit<ElDrawerInstance['$props'], keyof SDrawerProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElDrawer & {`,
      '  new (): {',
      `    $props: SDrawerProps & Omit<ElDrawerInstance['$props'], keyof SDrawerProps>`,
      "    $emit: ElDrawerInstance['$emit']",
      "    $slots: ElDrawerInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'descriptions') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElDescriptions } from 'element-plus'",
      "import type { SDescriptionsProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElDescriptionsInstance = InstanceType<typeof ElDescriptions>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SDescriptionsProps &`,
      `  Omit<ElDescriptionsInstance['$props'], keyof SDescriptionsProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElDescriptions & {`,
      '  new (): {',
      `    $props: SDescriptionsProps & Omit<ElDescriptionsInstance['$props'], keyof SDescriptionsProps>`,
      "    $emit: ElDescriptionsInstance['$emit']",
      "    $slots: ElDescriptionsInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'progress') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElProgress } from 'element-plus'",
      "import type { SProgressProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElProgressInstance = InstanceType<typeof ElProgress>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SProgressProps &`,
      `  Omit<ElProgressInstance['$props'], keyof SProgressProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElProgress & {`,
      '  new (): {',
      `    $props: SProgressProps & Omit<ElProgressInstance['$props'], keyof SProgressProps>`,
      "    $emit: ElProgressInstance['$emit']",
      "    $slots: ElProgressInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  if (typedComponent?.explicitComponentType === 'form') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElForm } from 'element-plus'",
      "import type { SFormProps } from '" + normalizedPropsImportPath + "'",
      '',
      'type ElFormInstance = InstanceType<typeof ElForm>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = SFormProps &`,
      `  Omit<ElFormInstance['$props'], keyof SFormProps>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElForm & {`,
      '  new (): {',
      `    $props: SFormProps & Omit<ElFormInstance['$props'], keyof SFormProps>`,
      "    $emit: ElFormInstance['$emit']",
      "    $slots: ElFormInstance['$slots']",
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
    return
  }

  const sharedImportPath = toPosixPath(
    relative(wrapperDir, resolve(componentTypeDir, '_shared.d.ts')).replace(/\.d\.ts$/, ''),
  )
  const wrapperLines = [
    `import type { InstallableComponent } from '${sharedImportPath.startsWith('.') ? sharedImportPath : `./${sharedImportPath}`}'`,
  ]

  if (typedComponent) {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const importedTypeNames = [
      typedComponent.typeName,
      typedComponent.emitsTypeName,
      typedComponent.explicitComponentType === 'button' ? 'SybzComponentTheme' : undefined,
      typedComponent.explicitComponentType === 'button' ? 'SybzRecord' : undefined,
    ]
      .filter(Boolean)
      .join(', ')
    if (typedComponent.publicPropsTypeName) {
      wrapperLines.unshift("import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'")
    }
    if (typedComponent.explicitComponentType === 'button') {
      wrapperLines[0] =
        "import type { AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, DefineComponent, Plugin, PropType, VNodeProps } from 'vue'"
      wrapperLines.unshift("import type { buttonProps } from 'element-plus/es/components/button'")
    }
    wrapperLines.push(`import type { ${importedTypeNames} } from '${normalizedPropsImportPath}'`)
    wrapperLines.push('')
    const componentTypeParams = [typedComponent.typeName, typedComponent.emitsTypeName].filter(Boolean).join(', ')

    if (typedComponent.publicPropsTypeName) {
      wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = ${typedComponent.typeName} &`)
      wrapperLines.push('  VNodeProps &')
      wrapperLines.push('  AllowedComponentProps &')
      wrapperLines.push('  ComponentCustomProps & {')
      if (typedComponent.publicClickEvent) {
        wrapperLines.push('    onClick?: (evt: MouseEvent) => any')
      }
      wrapperLines.push('  }')
      wrapperLines.push('')
    }

    if (typedComponent.description) {
      wrapperLines.push('/**')
      wrapperLines.push(` * ${typedComponent.description}`)
      wrapperLines.push(' *')
      wrapperLines.push(
        ' * 支持 Element Plus Button 的公开属性，并扩展 content、tooltipAttrs、theme、variant、width、height、hoverAnimation 等属性。',
      )
      wrapperLines.push(' */')
    }

    if (typedComponent.exportedComponentTypeName) {
      if (typedComponent.explicitComponentType === 'button') {
        wrapperLines.push(`export type ${typedComponent.exportedComponentTypeName} = DefineComponent<`)
        wrapperLines.push('  {')
        wrapperLines.push('    /** 点击后进入 loading 状态的毫秒数，0 表示不启用点击节流 loading */')
        wrapperLines.push('    readonly time: {')
        wrapperLines.push('      readonly type: PropType<number>')
        wrapperLines.push('      readonly default: 0')
        wrapperLines.push('    }')
        wrapperLines.push('    /** 按钮提示内容，设置后会用 s-tooltip 包裹按钮 */')
        wrapperLines.push('    readonly content: {')
        wrapperLines.push('      readonly type: PropType<string>')
        wrapperLines.push("      readonly default: ''")
        wrapperLines.push('    }')
        wrapperLines.push('    /** 透传给 s-tooltip 的属性 */')
        wrapperLines.push('    readonly tooltipAttrs: {')
        wrapperLines.push('      readonly type: PropType<SybzRecord>')
        wrapperLines.push('      readonly default: () => SybzRecord')
        wrapperLines.push('    }')
        wrapperLines.push('    /** 是否允许 tooltip 内容作为 HTML 片段渲染 */')
        wrapperLines.push('    readonly dangerouslyUseHTMLString: {')
        wrapperLines.push('      readonly type: PropType<boolean>')
        wrapperLines.push('      readonly default: false')
        wrapperLines.push('    }')
        wrapperLines.push('    /** 组件主题 */')
        wrapperLines.push('    readonly theme: {')
        wrapperLines.push('      readonly type: PropType<SybzComponentTheme>')
        wrapperLines.push("      readonly default: ''")
        wrapperLines.push('    }')
        wrapperLines.push('    /** chenghua 主题下的按钮变体 */')
        wrapperLines.push('    readonly variant: {')
        wrapperLines.push("      readonly type: PropType<'' | 'outline' | 'gradient'>")
        wrapperLines.push("      readonly default: ''")
        wrapperLines.push('    }')
        wrapperLines.push('    /** 按钮宽度，数字会按工具方法补单位 */')
        wrapperLines.push('    readonly width: {')
        wrapperLines.push('      readonly type: PropType<string | number>')
        wrapperLines.push("      readonly default: ''")
        wrapperLines.push('    }')
        wrapperLines.push('    /** 按钮高度，数字会按工具方法补单位 */')
        wrapperLines.push('    readonly height: {')
        wrapperLines.push('      readonly type: PropType<string | number>')
        wrapperLines.push("      readonly default: ''")
        wrapperLines.push('    }')
        wrapperLines.push('    /** 是否开启 hover 动效 */')
        wrapperLines.push('    readonly hoverAnimation: {')
        wrapperLines.push('      readonly type: PropType<boolean>')
        wrapperLines.push('      readonly default: false')
        wrapperLines.push('    }')
        wrapperLines.push('  } & typeof buttonProps,')
        wrapperLines.push('  {},')
        wrapperLines.push('  any,')
        wrapperLines.push('  {},')
        wrapperLines.push('  {},')
        wrapperLines.push('  ComponentOptionsMixin,')
        wrapperLines.push('  ComponentOptionsMixin,')
        wrapperLines.push(`  ${typedComponent.emitsTypeName || '{}'}`)
        wrapperLines.push('> &')
        wrapperLines.push('  Plugin')
      } else {
        wrapperLines.push(
          `export interface ${typedComponent.exportedComponentTypeName} extends InstallableComponent<${componentTypeParams}> {}`,
        )
      }
      wrapperLines.push('')
      wrapperLines.push(`declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`)
    } else {
      wrapperLines.push(`declare const ${componentName}: InstallableComponent<${componentTypeParams}>`)
    }
  } else {
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: InstallableComponent`)
  }

  wrapperLines.push(`export default ${componentName}`)
  wrapperLines.push('')

  mkdirSync(wrapperDir, { recursive: true })
  writeFileSync(wrapperFilePath, wrapperLines.join('\n'))
})
