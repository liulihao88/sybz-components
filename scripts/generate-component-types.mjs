import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import prettier from 'prettier'
import ts from 'typescript'

const rootDir = process.cwd()
const componentsDir = resolve(rootDir, 'packages/components')
const outputPath = resolve(rootDir, 'packages/components.d.ts')
const componentTypeDir = resolve(rootDir, 'packages/types/components')
const componentPropsPath = resolve(rootDir, 'packages/types/component-props.d.ts')
const declarationPrettierOptions = (await prettier.resolveConfig(outputPath)) ?? {}

const formatDeclaration = (content) =>
  prettier.format(content.endsWith('\n') ? content : `${content}\n`, {
    ...declarationPrettierOptions,
    parser: 'typescript',
  })

const writeDeclarationFile = async (filePath, content) => {
  writeFileSync(filePath, await formatDeclaration(content))
}

const EXCLUDED_COMPONENT_DIRS = new Set(['common', 'company', 'customMessage', 'utils'])

const componentHoverProps = (interfaceName, importTypeNames = [interfaceName], extraImportLines = []) => ({
  sourcePath: componentPropsPath,
  interfaceName,
  importTypeNames,
  extraImportLines,
})

const TYPED_COMPONENT_PROPS = new Map([
  [
    'SBaseHeader',
    {
      typeName: 'Record<string, any>',
      slots: ['default', 'extra'],
    },
  ],
  ['SBuildTime', { importPath: componentPropsPath, typeName: 'SBuildTimeProps' }],
  [
    'SBasicLayout',
    {
      importPath: componentPropsPath,
      typeName: 'SBasicLayoutProps',
      slots: ['default', 'header', 'footer', 'icon'],
    },
  ],
  [
    'SButton',
    {
      importPath: componentPropsPath,
      typeName: 'SButtonProps',
      exportedComponentTypeName: 'SButtonComponent',
      tagName: 's-button',
      description: 's-button 按钮组件，支持 Element Plus Button 属性和 sybz 扩展属性。',
      publicPropsTypeName: 'SButtonPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'button',
      allowAnySlots: true,
      hoverProps: {
        sourcePath: resolve(rootDir, 'packages/components/button/src/type.ts'),
        interfaceName: 'SButtonSelfProps',
      },
    },
  ],
  [
    'SCapacityProgress',
    {
      typeName: 'Record<string, any>',
      slots: ['default'],
    },
  ],
  [
    'SChart',
    {
      importPath: componentPropsPath,
      typeName: 'SChartProps',
      slots: ['default', 'empty'],
      hoverProps: componentHoverProps('SChartProps', ['SChartProps', 'SybzRecord']),
    },
  ],
  [
    'SCheckbox',
    {
      importPath: componentPropsPath,
      typeName: 'SCheckboxProps',
      exportedComponentTypeName: 'SCheckboxComponent',
      publicPropsTypeName: 'SCheckboxPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'checkbox',
      allowAnySlots: true,
      hoverProps: componentHoverProps('SCheckboxSelfProps', ['SCheckboxSelfProps', 'SybzComponentTheme', 'SybzRecord']),
    },
  ],
  [
    'SClickOutside',
    {
      importPath: componentPropsPath,
      typeName: 'SClickOutsideProps',
      slots: ['default'],
      hoverProps: componentHoverProps('SClickOutsideProps', ['SClickOutsideProps', 'SybzRecord']),
    },
  ],
  [
    'SCompTitle',
    {
      importPath: componentPropsPath,
      typeName: 'SCompTitleProps',
      hoverProps: componentHoverProps('SCompTitleProps', ['SCompTitleProps', 'SybzComponentTheme', 'SybzRecord']),
    },
  ],
  [
    'SDatePicker',
    {
      importPath: componentPropsPath,
      typeName: 'SDatePickerProps',
      exportedComponentTypeName: 'SDatePickerComponent',
      publicPropsTypeName: 'SDatePickerPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'datePicker',
      allowAnySlots: true,
      hoverProps: componentHoverProps(
        'SDatePickerSelfProps',
        ['SDatePickerSelfProps', 'SybzComponentTheme', 'SybzRecord'],
        ["import type { DatePickerPropsPublic } from 'element-plus/es/components/date-picker/src/props'"],
      ),
    },
  ],
  [
    'SDescriptions',
    {
      importPath: componentPropsPath,
      typeName: 'SDescriptionsProps',
      exportedComponentTypeName: 'SDescriptionsComponent',
      publicPropsTypeName: 'SDescriptionsPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'descriptions',
      allowAnySlots: true,
      hoverProps: componentHoverProps('SDescriptionsOwnProps', [
        'SDescriptionsItemOption',
        'SDescriptionsOwnProps',
        'SDescriptionsRow',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SDialog',
    {
      importPath: componentPropsPath,
      typeName: 'SDialogProps',
      exportedComponentTypeName: 'SDialogComponent',
      tagName: 's-dialog',
      description: 's-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性和 sybz 扩展属性。',
      publicPropsTypeName: 'SDialogPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'dialog',
      slots: ['default', 'header', 'headerIcon', 'footer'],
      hoverProps: {
        sourcePath: componentPropsPath,
        interfaceName: 'SDialogSelfProps',
        importTypeNames: ['SDialogHandler', 'SDialogSelfProps', 'SDialogTheme', 'SDialogType', 'SybzRecord'],
      },
    },
  ],
  [
    'SDrawer',
    {
      importPath: componentPropsPath,
      typeName: 'SDrawerProps',
      exportedComponentTypeName: 'SDrawerComponent',
      publicPropsTypeName: 'SDrawerPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'drawer',
      slots: ['default', 'header', 'footer'],
      hoverProps: componentHoverProps('SDrawerSelfProps', ['SDrawerSelfProps', 'SybzRecord']),
    },
  ],
  [
    'SEmpty',
    {
      importPath: componentPropsPath,
      typeName: 'SEmptyProps',
      exportedComponentTypeName: 'SEmptyComponent',
      publicPropsTypeName: 'SEmptyPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'empty',
      slots: ['default', 'image', 'description'],
      hoverProps: componentHoverProps('SEmptySelfProps', ['SEmptySelfProps', 'SybzComponentTheme', 'SybzRecord']),
    },
  ],
  [
    'SFlex',
    {
      importPath: componentPropsPath,
      typeName: 'SFlexProps',
      slots: ['default'],
    },
  ],
  [
    'SForm',
    {
      importPath: componentPropsPath,
      typeName: 'SFormProps',
      exportedComponentTypeName: 'SFormComponent',
      publicPropsTypeName: 'SFormPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'form',
      allowAnySlots: true,
    },
  ],
  ['SFunctionSourceCode', { importPath: componentPropsPath, typeName: 'SFunctionSourceCodeProps' }],
  [
    'SIcon',
    {
      importPath: componentPropsPath,
      typeName: 'SIconProps',
      slots: ['default'],
      hoverProps: componentHoverProps('SIconProps', ['SIconProps', 'SybzRecord']),
    },
  ],
  [
    'SInput',
    {
      importPath: componentPropsPath,
      typeName: 'SInputProps',
      exportedComponentTypeName: 'SInputComponent',
      publicPropsTypeName: 'SInputPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'input',
      slots: ['default', 'prepend', 'prefix', 'suffix', 'append'],
      hoverProps: componentHoverProps('SInputSelfProps', [
        'SInputSelfProps',
        'SybzComponentSize',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SInputLabel',
    {
      importPath: componentPropsPath,
      typeName: 'SInputLabelProps',
      hoverProps: componentHoverProps('SInputLabelProps', ['SInputLabelProps', 'SybzRecord']),
    },
  ],
  [
    'SInputNumber',
    {
      importPath: componentPropsPath,
      typeName: 'SInputNumberProps',
      exportedComponentTypeName: 'SInputNumberComponent',
      publicPropsTypeName: 'SInputNumberPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'inputNumber',
      allowAnySlots: true,
      hoverProps: componentHoverProps('SInputNumberSelfProps', [
        'SInputNumberSelfProps',
        'SybzComponentSize',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SItem',
    {
      importPath: componentPropsPath,
      typeName: 'SItemProps',
      slots: ['img', 'label', 'value'],
    },
  ],
  [
    'SItemWrapper',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SItemWrapperProps',
      slots: ['default'],
    },
  ],
  [
    'SPopconfirm',
    {
      importPath: componentPropsPath,
      typeName: 'SPopconfirmProps',
      exportedComponentTypeName: 'SPopconfirmComponent',
      publicPropsTypeName: 'SPopconfirmPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'popover',
      slots: ['default', 'content', 'footer'],
      hoverProps: componentHoverProps('SPopoverConfirmSelfProps', ['SPopoverConfirmSelfProps', 'SybzComponentTheme']),
    },
  ],
  [
    'SProgress',
    {
      importPath: componentPropsPath,
      typeName: 'SProgressProps',
      exportedComponentTypeName: 'SProgressComponent',
      publicPropsTypeName: 'SProgressPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'progress',
      slots: ['default'],
      hoverProps: componentHoverProps('SProgressSelfProps'),
    },
  ],
  [
    'SRadio',
    {
      importPath: componentPropsPath,
      typeName: 'SRadioProps',
      exportedComponentTypeName: 'SRadioComponent',
      publicPropsTypeName: 'SRadioPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'radio',
      allowAnySlots: true,
      hoverProps: componentHoverProps('SRadioSelfProps', [
        'SRadioOption',
        'SRadioSelfProps',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SRow',
    {
      importPath: componentPropsPath,
      typeName: 'SRowProps',
      exportedComponentTypeName: 'SRowComponent',
      publicPropsTypeName: 'SRowPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'row',
      slots: ['default'],
      hoverProps: componentHoverProps(
        'SRowSelfProps',
        ['SRowSelfProps', 'SybzRecord'],
        ["import type { RowPropsPublic } from 'element-plus/es/components/row'"],
      ),
    },
  ],
  [
    'SSelect',
    {
      importPath: componentPropsPath,
      typeName: 'SSelectProps',
      exportedComponentTypeName: 'SSelectComponent',
      publicPropsTypeName: 'SSelectPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'select',
      allowAnySlots: true,
      hoverProps: componentHoverProps('SSelectSelfProps', [
        'SSelectSelfProps',
        'SybzComponentSize',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SSplitPane',
    {
      importPath: componentPropsPath,
      typeName: 'SSplitPaneProps',
      slots: ['paneL', 'left', 'paneR', 'extra'],
    },
  ],
  [
    'SSvg',
    {
      importPath: componentPropsPath,
      typeName: 'SSvgProps',
      hoverProps: componentHoverProps('SSvgProps', ['SSvgProps', 'SybzRecord']),
    },
  ],
  [
    'SSwitch',
    {
      importPath: componentPropsPath,
      typeName: 'SSwitchProps',
      exportedComponentTypeName: 'SSwitchComponent',
      publicPropsTypeName: 'SSwitchPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'switch',
      hoverProps: componentHoverProps('SSwitchSelfProps', ['SSwitchSelfProps', 'SybzComponentTheme']),
    },
  ],
  [
    'STable',
    {
      importPath: resolve(rootDir, 'packages/types/table.d.ts'),
      typeName: 'STableProps',
      allowAnySlots: true,
    },
  ],
  [
    'STabs',
    {
      importPath: componentPropsPath,
      typeName: 'STabsProps',
      exportedComponentTypeName: 'STabsComponent',
      publicPropsTypeName: 'STabsPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'tabs',
      allowAnySlots: true,
      hoverProps: componentHoverProps(
        'STabsSelfProps',
        ['STabsSelfProps', 'SybzRecord'],
        ["import type { TabsPropsPublic } from 'element-plus/es/components/tabs'"],
      ),
    },
  ],
  [
    'STag',
    {
      importPath: componentPropsPath,
      typeName: 'STagProps',
      exportedComponentTypeName: 'STagComponent',
      publicPropsTypeName: 'STagPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'tag',
      slots: ['default'],
      hoverProps: componentHoverProps(
        'STagSelfProps',
        ['STagSelfProps', 'SybzComponentSize', 'SybzComponentTheme', 'SybzRecord'],
        ["import type { TagPropsPublic } from 'element-plus/es/components/tag'"],
      ),
    },
  ],
  [
    'STest',
    {
      importPath: componentPropsPath,
      typeName: 'STestProps',
      hoverProps: componentHoverProps('STestProps'),
    },
  ],
  [
    'STitle',
    {
      importPath: componentPropsPath,
      typeName: 'STitleProps',
      slots: ['default', 'title', 'icon', 'extra', 'right'],
      hoverProps: componentHoverProps('STitleProps', ['STitleProps', 'SybzComponentTheme', 'SybzRecord']),
    },
  ],
  [
    'STooltip',
    {
      importPath: componentPropsPath,
      typeName: 'STooltipProps',
      exportedComponentTypeName: 'STooltipComponent',
      publicPropsTypeName: 'STooltipPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'tooltip',
      slots: ['default', 'content'],
      hoverProps: componentHoverProps('STooltipSelfProps'),
    },
  ],
  [
    'SWarning',
    {
      importPath: componentPropsPath,
      typeName: 'SWarningProps',
      slots: ['title', 'content'],
      hoverProps: componentHoverProps('SWarningProps', [
        'SWarningProps',
        'SWarningSize',
        'SWarningType',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
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

const formatSlotsType = (slots = []) => {
  if (slots === 'any') return 'Record<string, (...args: any[]) => any>'
  if (!slots.length) return ''

  return ['{', ...slots.map((slot) => `    ${slot}?: () => any`), '  }'].join('\n')
}

const getSlotsType = (typedComponent) => {
  if (typedComponent?.allowAnySlots) {
    return 'Record<string, (...args: any[]) => any>'
  }

  return formatSlotsType(typedComponent?.slots)
}

const getInstallableComponentTypeParams = (typedComponent) => {
  const params = [typedComponent.typeName]

  const slotsType = getSlotsType(typedComponent)
  if (typedComponent.emitsTypeName || slotsType) {
    params.push(typedComponent.emitsTypeName || '{}')
  }

  if (slotsType) {
    params.push(slotsType)
  }

  return params.join(',\n  ')
}

const getWrapperSlotsType = (baseSlotsType, typedComponent) => {
  const ownSlotsType = getSlotsType(typedComponent)
  return ownSlotsType ? `${baseSlotsType} & ${ownSlotsType}` : baseSlotsType
}

const findInterfaceDeclaration = (sourceFile, interfaceName) => {
  let match

  const visit = (node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === interfaceName) {
      match = node
      return
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return match
}

const getPropertyNameText = (nameNode, sourceFile) => {
  if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode) || ts.isNumericLiteral(nameNode)) {
    return nameNode.text
  }

  return nameNode.getText(sourceFile)
}

const getPropertyDeclarationNameText = (nameNode, sourceFile) => {
  if (ts.isIdentifier(nameNode)) return nameNode.text
  return nameNode.getText(sourceFile)
}

const getJsDocText = (node, sourceFile) => {
  const jsDocs = node.jsDoc ?? []
  return jsDocs.map((doc) => doc.getText(sourceFile))
}

const collectInterfaceProps = ({ sourcePath, interfaceName }, seen = new Set()) => {
  const cacheKey = `${sourcePath}:${interfaceName}`
  if (seen.has(cacheKey)) return []
  seen.add(cacheKey)

  const sourceText = readFileSync(sourcePath, 'utf-8')
  const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true)
  const declaration = findInterfaceDeclaration(sourceFile, interfaceName)

  if (!declaration) {
    throw new Error(`Cannot find interface ${interfaceName} in ${sourcePath}`)
  }

  const inheritedProps = (declaration.heritageClauses ?? [])
    .flatMap((clause) => clause.types)
    .map((typeNode) => typeNode.expression.getText(sourceFile))
    .flatMap((extendedInterfaceName) =>
      collectInterfaceProps({ sourcePath, interfaceName: extendedInterfaceName }, seen),
    )

  const ownProps = declaration.members.filter(ts.isPropertySignature).map((member) => ({
    name: getPropertyDeclarationNameText(member.name, sourceFile),
    omitKey: getPropertyNameText(member.name, sourceFile),
    optional: Boolean(member.questionToken),
    type: member.type?.getText(sourceFile) ?? 'any',
    jsDoc: getJsDocText(member, sourceFile),
  }))

  return [...inheritedProps, ...ownProps]
}

const getExpandedPropsLines = ({ hoverProps, inheritedProps }) => {
  const props = collectInterfaceProps(hoverProps)
  const lines = ['{']

  props.forEach((prop) => {
    prop.jsDoc.forEach((comment) => {
      lines.push(...comment.split('\n').map((line) => `  ${line}`))
    })
    lines.push(`  ${prop.name}${prop.optional ? '?' : ''}: ${prop.type}`)
  })

  if (!inheritedProps.length) {
    lines.push('}')
    return lines
  }

  inheritedProps.forEach(({ type, extraOmitKeys = [] }, index) => {
    lines.push(`${index === 0 ? '}' : ''} & Omit<`)
    lines.push(`  ${type},`)
    props.forEach((prop) => {
      lines.push(`  | '${prop.omitKey}'`)
    })
    extraOmitKeys.forEach((key) => {
      lines.push(`  | ${key}`)
    })
    lines.push('>')
  })

  return lines
}

const ELEMENT_WRAPPER_CONFIGS = {
  button: {
    valueImports: ['ElButton'],
    instances: [{ name: 'ElButtonInstance', component: 'ElButton' }],
    inheritedProps: [{ type: "ElButtonInstance['$props']" }],
    description: 'Element Plus Button',
  },
  checkbox: {
    valueImports: ['ElCheckboxGroup'],
    instances: [{ name: 'ElCheckboxGroupInstance', component: 'ElCheckboxGroup' }],
    inheritedProps: [{ type: "ElCheckboxGroupInstance['$props']" }],
    description: 'Element Plus CheckboxGroup',
  },
  datePicker: {
    valueImports: ['ElDatePicker'],
    instances: [{ name: 'ElDatePickerInstance', component: 'ElDatePicker' }],
    inheritedProps: [{ type: "ElDatePickerInstance['$props']" }],
    description: 'Element Plus DatePicker',
  },
  descriptions: {
    valueImports: ['ElDescriptions'],
    instances: [{ name: 'ElDescriptionsInstance', component: 'ElDescriptions' }],
    inheritedProps: [{ type: "ElDescriptionsInstance['$props']" }],
    description: 'Element Plus Descriptions',
  },
  dialog: {
    valueImports: ['ElDialog'],
    typeImports: ['ElDrawer'],
    instances: [
      { name: 'ElDialogInstance', component: 'ElDialog' },
      { name: 'ElDrawerInstance', component: 'ElDrawer' },
    ],
    inheritedProps: [
      { type: "ElDialogInstance['$props']" },
      {
        type: "ElDrawerInstance['$props']",
        extraOmitKeys: ["keyof ElDialogInstance['$props']"],
      },
    ],
    description: 'Element Plus Dialog/Drawer',
  },
  drawer: {
    valueImports: ['ElDrawer'],
    instances: [{ name: 'ElDrawerInstance', component: 'ElDrawer' }],
    inheritedProps: [{ type: "ElDrawerInstance['$props']" }],
    description: 'Element Plus Drawer',
  },
  empty: {
    valueImports: ['ElEmpty'],
    instances: [{ name: 'ElEmptyInstance', component: 'ElEmpty' }],
    inheritedProps: [{ type: "ElEmptyInstance['$props']" }],
    description: 'Element Plus Empty',
  },
  input: {
    valueImports: ['ElInput'],
    instances: [{ name: 'ElInputInstance', component: 'ElInput' }],
    inheritedProps: [{ type: "ElInputInstance['$props']" }],
    description: 'Element Plus Input',
  },
  inputNumber: {
    valueImports: ['ElInputNumber'],
    instances: [{ name: 'ElInputNumberInstance', component: 'ElInputNumber' }],
    inheritedProps: [{ type: "ElInputNumberInstance['$props']" }],
    description: 'Element Plus InputNumber',
  },
  popover: {
    valueImports: ['ElPopover'],
    instances: [{ name: 'ElPopoverInstance', component: 'ElPopover' }],
    inheritedProps: [{ type: "ElPopoverInstance['$props']" }],
    description: 'Element Plus Popover',
  },
  progress: {
    valueImports: ['ElProgress'],
    instances: [{ name: 'ElProgressInstance', component: 'ElProgress' }],
    inheritedProps: [{ type: "ElProgressInstance['$props']" }],
    description: 'Element Plus Progress',
  },
  radio: {
    valueImports: ['ElRadioGroup'],
    instances: [{ name: 'ElRadioGroupInstance', component: 'ElRadioGroup' }],
    inheritedProps: [{ type: "ElRadioGroupInstance['$props']" }],
    description: 'Element Plus RadioGroup',
  },
  row: {
    valueImports: ['ElRow'],
    instances: [{ name: 'ElRowInstance', component: 'ElRow' }],
    inheritedProps: [{ type: "ElRowInstance['$props']" }],
    description: 'Element Plus Row',
  },
  select: {
    valueImports: ['ElSelect'],
    instances: [{ name: 'ElSelectInstance', component: 'ElSelect' }],
    inheritedProps: [{ type: "ElSelectInstance['$props']" }],
    description: 'Element Plus Select',
  },
  switch: {
    valueImports: ['ElSwitch'],
    instances: [{ name: 'ElSwitchInstance', component: 'ElSwitch' }],
    inheritedProps: [{ type: "ElSwitchInstance['$props']" }],
    description: 'Element Plus Switch',
  },
  tabs: {
    valueImports: ['ElTabs'],
    instances: [{ name: 'ElTabsInstance', component: 'ElTabs' }],
    inheritedProps: [{ type: "ElTabsInstance['$props']" }],
    description: 'Element Plus Tabs',
  },
  tag: {
    valueImports: ['ElTag'],
    instances: [{ name: 'ElTagInstance', component: 'ElTag' }],
    inheritedProps: [{ type: "ElTagInstance['$props']" }],
    description: 'Element Plus Tag',
  },
  tooltip: {
    valueImports: ['ElTooltip'],
    instances: [{ name: 'ElTooltipInstance', component: 'ElTooltip' }],
    inheritedProps: [{ type: "ElTooltipInstance['$props']" }],
    description: 'Element Plus Tooltip',
  },
}

const getNormalizedImportPath = (fromDir, importPath) => {
  const relativeImportPath = toPosixPath(
    relative(fromDir, importPath)
      .replace(/\.d\.ts$/, '')
      .replace(/\.ts$/, ''),
  )
  return relativeImportPath.startsWith('.') ? relativeImportPath : `./${relativeImportPath}`
}

const getHoverPropsImportTypeNames = (typedComponent) =>
  typedComponent.hoverProps.importTypeNames ?? [typedComponent.hoverProps.interfaceName]

const pushPublicPropsTypeLines = (wrapperLines, typedComponent, inheritedProps) => {
  const selfPropsType = typedComponent.hoverProps.interfaceName
  wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = ${selfPropsType} &`)
  inheritedProps.forEach(({ type, extraOmitKeys = [] }, index) => {
    const omitKeys = [`keyof ${selfPropsType}`, ...extraOmitKeys].join(' | ')
    const suffix = index === inheritedProps.length - 1 ? '' : ' &'
    wrapperLines.push(`  Omit<${type}, ${omitKeys}>${suffix}`)
  })
}

const buildElementWrapperLines = ({ componentName, typedComponent, wrapperDir, wrapperConfig }) => {
  const normalizedPropsImportPath = getNormalizedImportPath(wrapperDir, typedComponent.importPath)
  const propsImportNames = getHoverPropsImportTypeNames(typedComponent).join(', ')
  const primaryInstance = wrapperConfig.instances[0]
  const wrapperLines = [
    `import { ${wrapperConfig.valueImports.join(', ')} } from 'element-plus'`,
    ...(wrapperConfig.typeImports?.length
      ? [`import type { ${wrapperConfig.typeImports.join(', ')} } from 'element-plus'`]
      : []),
    ...(typedComponent.hoverProps.extraImportLines ?? []),
    `import type { ${propsImportNames} } from '${normalizedPropsImportPath}'`,
    '',
    ...wrapperConfig.instances.map(({ name, component }) => `type ${name} = InstanceType<typeof ${component}>`),
    '',
  ]

  if (typedComponent.description) {
    wrapperLines.push('/**')
    wrapperLines.push(` * ${typedComponent.description}`)
    wrapperLines.push(' *')
    wrapperLines.push(` * 先提示 sybz 自身属性，再提示 ${wrapperConfig.description} 的公开属性。`)
    wrapperLines.push(' */')
  }

  pushPublicPropsTypeLines(wrapperLines, typedComponent, wrapperConfig.inheritedProps)
  wrapperLines.push('')
  wrapperLines.push(`export type ${typedComponent.exportedComponentTypeName} = {`)
  wrapperLines.push('  new (): {')
  const propsLines = getExpandedPropsLines({
    hoverProps: typedComponent.hoverProps,
    inheritedProps: wrapperConfig.inheritedProps,
  })
  wrapperLines.push(`    $props: ${propsLines[0]}`)
  wrapperLines.push(...propsLines.slice(1).map((line) => `    ${line}`))
  wrapperLines.push(`    $emit: ${primaryInstance.name}['$emit']`)
  wrapperLines.push(`    $slots: ${getWrapperSlotsType(`${primaryInstance.name}['$slots']`, typedComponent)}`)
  wrapperLines.push('  }')
  wrapperLines.push('}')
  wrapperLines.push('')
  wrapperLines.push(`declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`)
  wrapperLines.push(`export default ${componentName}`)
  wrapperLines.push('')

  return wrapperLines
}

const buildOwnWrapperLines = ({ componentName, typedComponent, wrapperDir }) => {
  const normalizedPropsImportPath = getNormalizedImportPath(wrapperDir, typedComponent.importPath)
  const propsImportNames = getHoverPropsImportTypeNames(typedComponent).join(', ')
  const componentTypeName = typedComponent.exportedComponentTypeName ?? `${componentName}Component`
  const wrapperLines = [
    ...(typedComponent.hoverProps.extraImportLines ?? []),
    `import type { ${propsImportNames} } from '${normalizedPropsImportPath}'`,
    '',
  ]

  if (typedComponent.description) {
    wrapperLines.push('/**')
    wrapperLines.push(` * ${typedComponent.description}`)
    wrapperLines.push(' *')
    wrapperLines.push(' * 先提示 sybz 自身属性。')
    wrapperLines.push(' */')
  }

  wrapperLines.push(`export type ${componentTypeName} = {`)
  wrapperLines.push('  new (): {')
  const propsLines = getExpandedPropsLines({
    hoverProps: typedComponent.hoverProps,
    inheritedProps: [],
  })
  wrapperLines.push(`    $props: ${propsLines[0]}`)
  wrapperLines.push(...propsLines.slice(1).map((line) => `    ${line}`))
  const ownSlotsType = getSlotsType(typedComponent)
  if (ownSlotsType) {
    wrapperLines.push(`    $slots: ${ownSlotsType}`)
  }
  wrapperLines.push('  }')
  wrapperLines.push('}')
  wrapperLines.push('')
  wrapperLines.push(`declare const ${componentName}: ${componentTypeName}`)
  wrapperLines.push(`export default ${componentName}`)
  wrapperLines.push('')

  return wrapperLines
}

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
  "import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'",
  '',
  'type ComponentInstance<T> = T extends new (...args: any[]) => infer R ? R : never',
  'type JSXComponentProps<Props> = Props & VNodeProps & AllowedComponentProps & ComponentCustomProps & { children?: any }',
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

lines.push('declare global {')
lines.push('  namespace JSX {')
lines.push('    export interface IntrinsicElements {')
componentEntries.forEach(({ componentName, tagName, publicPropsTypeName }) => {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const templateTagName = typedComponent?.tagName || tagName

  if (templateTagName) {
    lines.push(`      '${templateTagName}': JSXComponentProps<${publicPropsTypeName}>`)
  }
})
lines.push('    }')
lines.push('  }')
lines.push('}')
lines.push('')

lines.push('export {}')
lines.push('')

await writeDeclarationFile(outputPath, lines.join('\n'))

for (const { componentName, wrapperFilePath } of componentEntries) {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const wrapperDir = dirname(wrapperFilePath)
  const elementWrapperConfig = ELEMENT_WRAPPER_CONFIGS[typedComponent?.explicitComponentType]

  if (typedComponent?.hoverProps && elementWrapperConfig) {
    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(
      wrapperFilePath,
      buildElementWrapperLines({
        componentName,
        typedComponent,
        wrapperDir,
        wrapperConfig: elementWrapperConfig,
      }).join('\n'),
    )
    continue
  }

  if (typedComponent?.hoverProps) {
    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(
      wrapperFilePath,
      buildOwnWrapperLines({
        componentName,
        typedComponent,
        wrapperDir,
      }).join('\n'),
    )
    continue
  }

  if (typedComponent?.explicitComponentType === 'button') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElButton } from 'element-plus'",
      `import type { SButtonSelfProps } from '${normalizedPropsImportPath}'`,
      '',
      'type ElButtonInstance = InstanceType<typeof ElButton>',
      '',
    ]

    if (typedComponent.description) {
      wrapperLines.push('/**')
      wrapperLines.push(` * ${typedComponent.description}`)
      wrapperLines.push(' *')
      wrapperLines.push(' * 先提示 sybz 自身属性，再提示 Element Plus Button 的公开属性。')
      wrapperLines.push(' */')
    }

    wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = SButtonSelfProps &`)
    wrapperLines.push("  Omit<ElButtonInstance['$props'], keyof SButtonSelfProps>")
    wrapperLines.push('')
    wrapperLines.push(`export type ${typedComponent.exportedComponentTypeName} = {`)
    wrapperLines.push('  new (): {')
    const buttonPropsLines = getExpandedPropsLines({
      hoverProps: typedComponent.hoverProps,
      inheritedProps: [{ type: "ElButtonInstance['$props']" }],
    })
    wrapperLines.push(`    $props: ${buttonPropsLines[0]}`)
    wrapperLines.push(...buttonPropsLines.slice(1).map((line) => `    ${line}`))
    wrapperLines.push("    $emit: ElButtonInstance['$emit']")
    wrapperLines.push(`    $slots: ${getWrapperSlotsType("ElButtonInstance['$slots']", typedComponent)}`)
    wrapperLines.push('  }')
    wrapperLines.push('}')
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`)
    wrapperLines.push(`export default ${componentName}`)
    wrapperLines.push('')

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
  }

  if (typedComponent?.explicitComponentType === 'dialog') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const propsImportNames = typedComponent.hoverProps.importTypeNames.join(', ')
    const wrapperLines = [
      "import { ElDialog } from 'element-plus'",
      "import type { ElDrawer } from 'element-plus'",
      `import type { ${propsImportNames} } from '${normalizedPropsImportPath}'`,
      '',
      'type ElDialogInstance = InstanceType<typeof ElDialog>',
      'type ElDrawerInstance = InstanceType<typeof ElDrawer>',
      '',
    ]

    if (typedComponent.description) {
      wrapperLines.push('/**')
      wrapperLines.push(` * ${typedComponent.description}`)
      wrapperLines.push(' *')
      wrapperLines.push(' * 先提示 sybz 自身属性，再提示 Element Plus Dialog/Drawer 的公开属性。')
      wrapperLines.push(' */')
    }

    wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = SDialogSelfProps &`)
    wrapperLines.push("  Omit<ElDialogInstance['$props'], keyof SDialogSelfProps> &")
    wrapperLines.push("  Omit<ElDrawerInstance['$props'], keyof SDialogSelfProps | keyof ElDialogInstance['$props']>")
    wrapperLines.push('')
    wrapperLines.push(`export type ${typedComponent.exportedComponentTypeName} = {`)
    wrapperLines.push('  new (): {')
    const dialogPropsLines = getExpandedPropsLines({
      hoverProps: typedComponent.hoverProps,
      inheritedProps: [
        { type: "ElDialogInstance['$props']" },
        {
          type: "ElDrawerInstance['$props']",
          extraOmitKeys: ["keyof ElDialogInstance['$props']"],
        },
      ],
    })
    wrapperLines.push(`    $props: ${dialogPropsLines[0]}`)
    wrapperLines.push(...dialogPropsLines.slice(1).map((line) => `    ${line}`))
    wrapperLines.push("    $emit: ElDialogInstance['$emit']")
    wrapperLines.push(`    $slots: ${getWrapperSlotsType("ElDialogInstance['$slots']", typedComponent)}`)
    wrapperLines.push('  }')
    wrapperLines.push('}')
    wrapperLines.push('')
    wrapperLines.push(`declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`)
    wrapperLines.push(`export default ${componentName}`)
    wrapperLines.push('')

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
  }

  if (typedComponent?.explicitComponentType === 'input') {
    const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
    const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
    const wrapperLines = [
      "import { ElInput } from 'element-plus'",
      `import type { ${typedComponent.typeName} } from '${normalizedPropsImportPath}'`,
      '',
      'type ElInputInstance = InstanceType<typeof ElInput>',
      '',
      `export type ${typedComponent.publicPropsTypeName} = ${typedComponent.typeName} &`,
      `  Omit<ElInputInstance['$props'], keyof ${typedComponent.typeName}>`,
      '',
      `export type ${typedComponent.exportedComponentTypeName} = typeof ElInput & {`,
      '  new (): {',
      `    $props: ${typedComponent.typeName} & Omit<ElInputInstance['$props'], keyof ${typedComponent.typeName}>`,
      "    $emit: ElInputInstance['$emit']",
      `    $slots: ${getWrapperSlotsType("ElInputInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElSelectInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElTooltipInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `export type ${typedComponent.exportedComponentTypeName} = {`,
      '  new (): {',
      `    $props: ${typedComponent.publicPropsTypeName}`,
      "    $emit: ElCheckboxGroupInstance['$emit']",
      `    $slots: ${getWrapperSlotsType("ElCheckboxGroupInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `export type ${typedComponent.exportedComponentTypeName} = {`,
      '  new (): {',
      `    $props: ${typedComponent.publicPropsTypeName}`,
      "    $emit: ElRadioGroupInstance['$emit']",
      `    $slots: ${getWrapperSlotsType("ElRadioGroupInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElEmptyInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElTabsInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElTagInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElRowInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElSwitchInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElInputNumberInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElPopoverInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElDatePickerInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElDrawerInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElDescriptionsInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElProgressInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
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
      `    $slots: ${getWrapperSlotsType("ElFormInstance['$slots']", typedComponent)}`,
      '  }',
      '}',
      '',
      `declare const ${componentName}: ${typedComponent.exportedComponentTypeName}`,
      `export default ${componentName}`,
      '',
    ]

    mkdirSync(wrapperDir, { recursive: true })
    await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
    continue
  }

  const sharedImportPath = toPosixPath(
    relative(wrapperDir, resolve(componentTypeDir, '_shared.d.ts')).replace(/\.d\.ts$/, ''),
  )
  const wrapperLines = [
    `import type { InstallableComponent } from '${sharedImportPath.startsWith('.') ? sharedImportPath : `./${sharedImportPath}`}'`,
  ]

  if (typedComponent) {
    const importedTypeNames = [typedComponent.typeName, typedComponent.emitsTypeName].filter(Boolean).join(', ')
    if (typedComponent.publicPropsTypeName) {
      wrapperLines.unshift("import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'")
    }
    if (typedComponent.importPath) {
      const propsImportPath = toPosixPath(relative(wrapperDir, typedComponent.importPath).replace(/\.d\.ts$/, ''))
      const normalizedPropsImportPath = propsImportPath.startsWith('.') ? propsImportPath : `./${propsImportPath}`
      wrapperLines.push(`import type { ${importedTypeNames} } from '${normalizedPropsImportPath}'`)
    }
    wrapperLines.push('')
    const componentTypeParams = getInstallableComponentTypeParams(typedComponent)

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
      wrapperLines.push(' * 支持组件公开属性，并扩展 sybz 自身属性。')
      wrapperLines.push(' */')
    }

    if (typedComponent.exportedComponentTypeName) {
      wrapperLines.push(
        `export interface ${typedComponent.exportedComponentTypeName} extends InstallableComponent<${componentTypeParams}> {}`,
      )
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
  await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
}
