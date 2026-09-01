import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import prettier from 'prettier'
import ts from 'typescript'

const rootDir = process.cwd()
const componentsDir = resolve(rootDir, 'packages/components')
const outputPath = resolve(rootDir, 'packages/components.d.ts')
const componentTypeDir = resolve(rootDir, 'packages/types/components')
const chartComponentsOutputPath = resolve(componentTypeDir, 'company/chart/components.d.ts')
const componentPropsPath = resolve(rootDir, 'packages/types/component-props.d.ts')
const elementPlusIconNamesOutputPath = resolve(rootDir, 'packages/types/element-plus-icon-names.d.ts')
const elementPlusIconComponentsPath = resolve(
  rootDir,
  'node_modules/@element-plus/icons-vue/dist/types/components/index.d.ts',
)
const declarationPrettierOptions = (await prettier.resolveConfig(outputPath)) ?? {}
const checkOnly = process.argv.includes('--check')
const outdatedDeclarationFiles = []
const onlineDocsBaseUrl = 'https://liulihao88.github.io/sybz-components'

const formatDeclaration = (content) =>
  prettier.format(content.endsWith('\n') ? content : `${content}\n`, {
    ...declarationPrettierOptions,
    parser: 'typescript',
  })

const writeDeclarationFile = async (filePath, content) => {
  const formattedContent = await formatDeclaration(content)

  if (checkOnly) {
    if (!existsSync(filePath) || readFileSync(filePath, 'utf-8') !== formattedContent) {
      outdatedDeclarationFiles.push(relative(rootDir, filePath))
    }
    return
  }

  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, formattedContent)
}

const elementPlusIconNames = [
  ...readFileSync(elementPlusIconComponentsPath, 'utf-8').matchAll(/export \{ default as (\w+) \}/g),
].map((match) => match[1])
const elementPlusIconNameSuggestions = [
  ...new Set([
    ...elementPlusIconNames.map((name) =>
      name.replace(/([A-Z])/g, (letter, _matchedLetter, offset) => `${offset === 0 ? '' : '-'}${letter.toLowerCase()}`),
    ),
    ...elementPlusIconNames,
  ]),
]

await writeDeclarationFile(
  elementPlusIconNamesOutputPath,
  [
    '/** Element Plus 提供的图标名称，由 scripts/generate-component-types.mjs 自动生成。 */',
    `export type SElementPlusIconName = ${elementPlusIconNameSuggestions.map((name) => `'${name}'`).join(' | ')}`,
  ].join('\n'),
)

const EXCLUDED_COMPONENT_DIRS = new Set(['common', 'company', 'customMessage', 'utils'])
const CHART_COMPONENT_PATHS = new Set([
  'chart',
  'company/countBar',
  'company/countBarOld',
  'company/objectLine',
  'company/quotaPie',
])

const componentHoverProps = (interfaceName, importTypeNames = [interfaceName], extraImportLines = []) => ({
  sourcePath: componentPropsPath,
  interfaceName,
  importTypeNames,
  extraImportLines,
})

const toOnlineDocsUrl = (docsPath) => `${onlineDocsBaseUrl}${docsPath.replace(/\.md$/, '.html')}`

const TYPED_COMPONENT_PROPS = new Map([
  [
    'SPagination',
    {
      importPath: componentPropsPath,
      typeName: 'SPaginationProps',
      exportedComponentTypeName: 'SPaginationComponent',
      tagName: 's-pagination',
      description:
        's-pagination 分页组件，支持主题、页码切换、每页条数选择、单页隐藏、回车跳页、总数展示以及内容超宽时横向滚动。',
      publicPropsTypeName: 'SPaginationPublicProps',
      useDefaultExportForGlobal: true,
      instanceMembers: [
        '$emit: <Event extends keyof SPaginationEmits>(event: Event, ...args: SPaginationEmits[Event]) => void',
      ],
      hoverProps: componentHoverProps('SPaginationSelfProps', [
        'SPaginationEmits',
        'SPaginationProps',
        'SPaginationSelfProps',
        'SybzComponentSize',
        'SybzComponentTheme',
      ]),
    },
  ],
  [
    'STableSearch',
    {
      importPath: resolve(rootDir, 'packages/components/tableSearch/src/types.ts'),
      typeName: 'STableSearchProps',
      emitsTypeName: 'STableSearchEmits',
      tagName: 's-table-search',
      allowAnySlots: true,
      instanceMembers: [
        '$emit: <Event extends keyof STableSearchEmits>(event: Event, ...args: STableSearchEmits[Event]) => void',
      ],
      hoverProps: {
        sourcePath: resolve(rootDir, 'packages/components/tableSearch/src/types.ts'),
        interfaceName: 'STableSearchProps',
        importTypeNames: [
          'STableSearchEmits',
          'STableSearchEvent',
          'STableSearchField',
          'STableSearchModel',
          'STableSearchProps',
          'STableSearchTheme',
        ],
        extraImportLines: ["import type { Component } from 'vue'"],
      },
    },
  ],
  [
    'SBaseHeader',
    {
      typeName: 'Record<string, any>',
      slots: ['default', 'extra'],
    },
  ],
  ['SBuildTime', { importPath: componentPropsPath, typeName: 'SBuildTimeProps' }],
  [
    'SCard',
    {
      importPath: componentPropsPath,
      typeName: 'SCardProps',
      description: 's-card 卡片组件，支持区块合并、展开收起、阴影、透明背景和主题样式。',
      slots: ['default', 'header', 'footer', 'icon'],
      hoverProps: componentHoverProps('SCardProps', [
        'SCardProps',
        'SybzComponentSize',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SButton',
    {
      importPath: componentPropsPath,
      typeName: 'SButtonProps',
      exportedComponentTypeName: 'SButtonComponent',
      tagName: 's-button',
      description:
        's-button 按钮组件，icon 支持 Element Plus 图标组件、图标名称和 Iconify 名称，并支持链接、主题、图标位置与 ghost 幽灵按钮。',
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
    'SScheduleCalendar',
    {
      importPath: resolve(rootDir, 'packages/components/company/scheduleCalendar/src/types.ts'),
      typeName: 'ScheduleCalendarProps',
      emitsTypeName: 'ScheduleCalendarEmits',
      tagName: 's-schedule-calendar',
      slots: ['filters', 'day', 'task', 'scheduleAction', 'empty'],
      instanceMembers: [
        '$emit: <Event extends keyof ScheduleCalendarEmits>(event: Event, ...args: ScheduleCalendarEmits[Event]) => void',
      ],
      hoverProps: {
        sourcePath: resolve(rootDir, 'packages/components/company/scheduleCalendar/src/types.ts'),
        interfaceName: 'ScheduleCalendarProps',
        importTypeNames: [
          'ScheduleCalendarDay',
          'ScheduleCalendarEmits',
          'ScheduleCalendarProps',
          'ScheduleCalendarTask',
          'ScheduleCalendarView',
        ],
      },
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
      hoverProps: componentHoverProps('SCheckboxSelfProps', [
        'SCheckboxOptionContext',
        'SCheckboxSelfProps',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
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
      description:
        's-date-picker 日期选择组件，支持标题、宽高、主题、内置快捷项，以及通过 futureOnly 限制只能选择当前日期或周期之后的值。',
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
      hoverProps: componentHoverProps(
        'SDescriptionsOwnProps',
        [
          'SDescriptionsItemOption',
          'SDescriptionsOwnProps',
          'SDescriptionsFilterContext',
          'SDescriptionsRenderContext',
          'SybzComponentTheme',
        ],
        ["import type { VNodeChild } from 'vue'"],
      ),
    },
  ],
  [
    'SDialog',
    {
      importPath: componentPropsPath,
      typeName: 'SDialogProps',
      exportedComponentTypeName: 'SDialogComponent',
      tagName: 's-dialog',
      description: 's-dialog 弹框组件，支持 Element Plus Dialog/Drawer 属性，以及 maximizeHeight 等 sybz 扩展属性。',
      publicPropsTypeName: 'SDialogPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'dialog',
      slots: ['default', 'header', 'headerIcon', 'footer', 'target'],
      hoverProps: {
        sourcePath: componentPropsPath,
        interfaceName: 'SDialogSelfProps',
        importTypeNames: [
          'SDialogHandler',
          'SDialogMode',
          'SDialogSelfProps',
          'SDialogTheme',
          'SDialogVariant',
          'SybzRecord',
        ],
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
      slots: ['default', 'image', 'title', { name: "'sub-title'" }],
      hoverProps: componentHoverProps('SEmptySelfProps', ['SEmptySelfProps', 'SybzComponentTheme', 'SybzRecord']),
    },
  ],
  [
    'SFlex',
    {
      importPath: componentPropsPath,
      typeName: 'SFlexProps',
      description: 's-flex 弹性布局组件，支持方向、对齐、间距、伸缩规则以及容器 width 和 height。',
      slots: ['default'],
      hoverProps: componentHoverProps(
        'SFlexProps',
        ['SFlexAlign', 'SFlexDirection', 'SFlexJustify', 'SFlexProps', 'SFlexWrap', 'SybzComponentSize'],
        ["import type { Component } from 'vue'"],
      ),
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
      description:
        's-form 表单组件，支持 schema 字段编排、动态配置、字段标签 tooltip 提示及 dangerouslyUseHTMLString。',
      allowAnySlots: true,
      hoverProps: componentHoverProps('SFormProps', [
        'SFormContext',
        'SFormDynamic',
        'SFormFieldItem',
        'SFormFieldList',
        'SFormProps',
        'SFormRender',
        'SFormTitleItem',
        'SybzRecord',
      ]),
    },
  ],
  ['SFunctionSourceCode', { importPath: componentPropsPath, typeName: 'SFunctionSourceCodeProps' }],
  [
    'SMarkdown',
    {
      importPath: componentPropsPath,
      typeName: 'SMarkdownProps',
      exportedComponentTypeName: 'SMarkdownComponent',
      tagName: 's-markdown',
      description: 's-markdown Markdown 渲染组件，支持图片全屏预览、缩放、旋转、多图切换和下载。',
      publicPropsTypeName: 'SMarkdownPublicProps',
      useDefaultExportForGlobal: true,
      hoverProps: {
        sourcePath: resolve(rootDir, 'packages/components/markdown/src/types.ts'),
        interfaceName: 'MarkdownProps',
        importTypeNames: ['SMarkdownProps'],
        extraImportLines: ["import type { MarkdownEmits, MarkdownExposed } from '../../components/markdown/src/types'"],
      },
      instanceMembers: [
        '$emit: <Event extends keyof MarkdownEmits>(event: Event, ...args: MarkdownEmits[Event]) => void',
        "render: MarkdownExposed['render']",
        "renderedHtml: MarkdownExposed['renderedHtml']",
        "headings: MarkdownExposed['headings']",
        "state: MarkdownExposed['state']",
      ],
    },
  ],
  [
    'SIcon',
    {
      importPath: componentPropsPath,
      typeName: 'SIconProps',
      description:
        's-icon 图标组件，支持多种图标来源、语义类型、背景样式、尺寸、颜色、圆角、阴影、Hover 动画、鼠标指针、旋转角度和 tooltip。',
      slots: ['default'],
      hoverProps: componentHoverProps('SIconProps', [
        'SIconValue',
        'SIconProps',
        'SIconCursor',
        'SIconSource',
        'SIconType',
        'SIconVariant',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SImage',
    {
      importPath: componentPropsPath,
      typeName: 'SImageProps',
      exportedComponentTypeName: 'SImageComponent',
      publicPropsTypeName: 'SImagePublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'image',
      description: 's-image 图片组件，完整兼容 Element Plus Image，并支持宽高、公共基础路径和源码资源解析。',
      allowAnySlots: true,
      instanceMembers: ['showPreview: () => void'],
      hoverProps: componentHoverProps('SImageSelfProps', ['SImageProps', 'SImageSelfProps', 'SImageSrcResolver']),
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
      slots: ['prefix', 'img', 'title', 'subTitle', 'extra', 'actions', 'default'],
      hoverProps: componentHoverProps('SItemProps', [
        'SCommonProps',
        'SItemAlign',
        'SItemExtraPlacement',
        'SItemProps',
        'SItemStyleKey',
        'SItemStyles',
        'SybzComponentSize',
        'SybzComponentTheme',
        'SybzRecord',
      ]),
    },
  ],
  [
    'SWrapper',
    {
      importPath: resolve(rootDir, 'packages/types/component-props.d.ts'),
      typeName: 'SWrapperProps',
      slots: ['default'],
      hoverProps: componentHoverProps('SWrapperProps'),
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
    'SUpload',
    {
      importPath: componentPropsPath,
      typeName: 'SUploadProps',
      exportedComponentTypeName: 'SUploadComponent',
      publicPropsTypeName: 'SUploadPublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'upload',
      allowAnySlots: true,
      hoverProps: componentHoverProps(
        'SUploadSelfProps',
        ['SUploadRequestContext', 'SUploadRequest', 'SUploadCancel', 'SUploadValidationReason', 'SUploadSelfProps'],
        [
          "import type { UploadRawFile, UploadRequestOptions, UploadUserFile } from 'element-plus/es/components/upload'",
        ],
      ),
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
        'SRadioItem',
        'SRadioOption',
        'SRadioOptionContext',
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
      description:
        's-select 下拉选择组件，支持 options 配置和默认插槽直接传入 el-option，两种模式均支持快速切换；options 模式额外支持全选、反选和完整选项上下文。',
      hoverProps: componentHoverProps('SSelectSelfProps', [
        'SSelectChangeContext',
        'SSelectOptionContext',
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
      hoverProps: componentHoverProps('SSplitPaneProps', ['SplitPaneDirection', 'SplitPaneSetting', 'SSplitPaneProps']),
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
      exportedComponentTypeName: 'STableComponent',
      publicPropsTypeName: 'STablePublicProps',
      useDefaultExportForGlobal: true,
      explicitComponentType: 'table',
      allowAnySlots: true,
      hoverProps: {
        sourcePath: resolve(rootDir, 'packages/types/table.d.ts'),
        interfaceName: 'STableProps',
        importTypeNames: [
          'STablePageAttrs',
          'STableProps',
          'TableColumnList',
          'TableModelValue',
          'TableRow',
          'TableSelectionType',
        ],
      },
    },
  ],
  [
    'SMenu',
    {
      importPath: resolve(rootDir, 'packages/components/menu/src/types.ts'),
      typeName: 'SMenuProps',
      description:
        's-menu 递归菜单组件，支持路由、图标、分组、默认展开、内置头尾区域以及 default / chenghua / shijingshan 主题。',
      slots: ['header', 'footer'],
      instanceMembers: ["$emit: (event: 'update:modelValue' | 'select' | 'actionClick', ...args: any[]) => void"],
      hoverProps: {
        sourcePath: resolve(rootDir, 'packages/components/menu/src/types.ts'),
        interfaceName: 'SMenuSelfProps',
        importTypeNames: [
          'SMenuFieldNames',
          'SMenuActionConfig',
          'SMenuFooterConfig',
          'SMenuHeaderConfig',
          'SMenuIcon',
          'SMenuItem',
          'SMenuItemDetail',
          'SMenuProps',
          'SMenuSelfProps',
        ],
      },
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
      description:
        's-tabs 标签页组件，modelValue 支持 string / number / boolean / null / undefined，并支持 capsule 类型、主题、尺寸、宽高以及通过 headerMargin 自定义头部外边距。',
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
      description: 's-tag 标签组件，支持状态映射、主题、尺寸，并在文本溢出时自动省略和显示完整提示。',
      hoverProps: componentHoverProps(
        'STagSelfProps',
        ['SCommonProps', 'STagSelfProps', 'SybzComponentSize', 'SybzComponentTheme', 'SybzRecord'],
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
      description:
        's-title 标题组件，支持通过 icon 属性或插槽设置图标，标题溢出时自动显示 tooltip，并支持通过 extra 属性或插槽设置右侧内容。',
      slots: ['default', 'title', 'icon', 'extra'],
      hoverProps: componentHoverProps(
        'STitleProps',
        ['SybzComponentTheme', 'SybzComponentSize', 'SybzRecord'],
        ["import type { Component } from 'vue'"],
      ),
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
      slots: ['default', 'trigger', 'content'],
      hoverProps: componentHoverProps('STooltipSelfProps'),
    },
  ],
  [
    'SWarning',
    {
      importPath: componentPropsPath,
      typeName: 'SWarningProps',
      description: 's-warning 警告组件，支持设置 width 和 height；设置 height 后内容会垂直居中。',
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

const getDocsPathFromWrapperPath = (wrapperPath) => `/${wrapperPath.replace('./types/', '')}/home.md`

const getDocsUrlFromWrapperPath = (wrapperPath) => {
  const docsPath = getDocsPathFromWrapperPath(wrapperPath)
  const docsFilePath = resolve(rootDir, 'docs', docsPath.slice(1))

  return existsSync(docsFilePath) ? toOnlineDocsUrl(docsPath) : ''
}

const getComponentDocCommentLines = ({ docsUrl, description }) => {
  if (!docsUrl && !description) return []

  const lines = ['/**']
  if (docsUrl) {
    lines.push(` * 在线文档：${docsUrl}`)
  }
  if (description) {
    if (docsUrl) lines.push(' *')
    lines.push(` * ${description}`)
  }
  lines.push(' */')

  return lines
}

const formatSlotsType = (slots = []) => {
  if (slots === 'any') return 'Record<string, (...args: any[]) => any>'
  if (!slots.length) return ''

  const slotLines = slots.flatMap((slot) => {
    if (typeof slot === 'string') return `    ${slot}?: () => any`

    return [...(slot.jsDoc ? [`    ${slot.jsDoc}`] : []), `    ${slot.name}?: () => any`]
  })

  return ['{', ...slotLines, '  }'].join('\n')
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

const getTypeParameterDefaults = (declaration, sourceFile) =>
  new Map(
    (declaration.typeParameters ?? [])
      .filter((typeParameter) => typeParameter.default)
      .map((typeParameter) => [typeParameter.name.text, typeParameter.default.getText(sourceFile)]),
  )

const applyTypeParameterDefaults = (typeText, typeParameterDefaults) => {
  let nextTypeText = typeText

  typeParameterDefaults.forEach((defaultType, typeParameterName) => {
    nextTypeText = nextTypeText.replace(new RegExp(`\\b${typeParameterName}\\b`, 'g'), defaultType)
  })

  return nextTypeText
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

  const typeParameterDefaults = getTypeParameterDefaults(declaration, sourceFile)
  const ownProps = declaration.members.filter(ts.isPropertySignature).map((member) => ({
    name: getPropertyDeclarationNameText(member.name, sourceFile),
    omitKey: getPropertyNameText(member.name, sourceFile),
    optional: Boolean(member.questionToken),
    type: applyTypeParameterDefaults(member.type?.getText(sourceFile) ?? 'any', typeParameterDefaults),
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
    description: 'Element Plus Descriptions, supports custom width',
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
    inheritedProps: [{ type: "ElEmptyInstance['$props']", extraOmitKeys: ["'description'"] }],
    description: 'Element Plus Empty',
  },
  form: {
    valueImports: ['ElForm'],
    instances: [{ name: 'ElFormInstance', component: 'ElForm' }],
    inheritedProps: [{ type: "ElFormInstance['$props']" }],
    description: 'Element Plus Form',
  },
  input: {
    valueImports: ['ElInput'],
    instances: [{ name: 'ElInputInstance', component: 'ElInput' }],
    inheritedProps: [{ type: "ElInputInstance['$props']" }],
    description: 'Element Plus Input',
  },
  image: {
    valueImports: ['ElImage'],
    instances: [{ name: 'ElImageInstance', component: 'ElImage' }],
    inheritedProps: [{ type: "ElImageInstance['$props']" }],
    description: 'Element Plus Image',
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
  upload: {
    valueImports: ['ElUpload'],
    instances: [{ name: 'ElUploadInstance', component: 'ElUpload' }],
    inheritedProps: [
      {
        type: "ElUploadInstance['$props']",
        extraOmitKeys: ["'fileList' | 'httpRequest' | 'beforeUpload'"],
      },
    ],
    description: 'Element Plus Upload',
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
  table: {
    valueImports: ['ElTable'],
    instances: [{ name: 'ElTableInstance', component: 'ElTable' }],
    inheritedProps: [{ type: "ElTableInstance['$props']" }],
    description: 'Element Plus Table',
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
  for (const member of typedComponent.instanceMembers ?? []) {
    wrapperLines.push(`    ${member}`)
  }
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

  if (typedComponent.publicPropsTypeName) {
    wrapperLines.push(`export type ${typedComponent.publicPropsTypeName} = ${typedComponent.typeName}`)
    wrapperLines.push('')
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
  for (const member of typedComponent.instanceMembers ?? []) {
    wrapperLines.push(`    ${member}`)
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
          componentPath: entry.name,
          wrapperPath: `./types/components/${entry.name}`,
          wrapperFilePath: resolve(componentTypeDir, `${entry.name}.d.ts`),
        }))
    }

    return readdirSync(baseDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== 'chart')
      .map((entry) => ({
        dirName: entry.name,
        componentPath: `${segments.join('/')}/${entry.name}`,
        wrapperPath: `./types/components/${segments.join('/')}/${entry.name}`,
        wrapperFilePath: resolve(componentTypeDir, segments.join('/'), `${entry.name}.d.ts`),
      }))
  })
}

const allComponentEntries = collectComponentEntries()
  .map(({ dirName, componentPath, wrapperPath, wrapperFilePath }) => {
    const componentName = `S${toPascalCase(dirName)}`
    return {
      componentName,
      componentPath,
      tagName: `s-${toKebabCase(dirName)}`,
      wrapperPath,
      wrapperFilePath,
      docsUrl: getDocsUrlFromWrapperPath(wrapperPath),
      instanceTypeName: `${componentName}Instance`,
      publicPropsTypeName: `${componentName}PublicProps`,
    }
  })
  .sort((left, right) => left.componentName.localeCompare(right.componentName))

const mainComponentEntries = allComponentEntries.filter(
  ({ componentPath }) => !CHART_COMPONENT_PATHS.has(componentPath),
)
const chartComponentEntries = allComponentEntries.filter(({ componentPath }) =>
  CHART_COMPONENT_PATHS.has(componentPath),
)

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

const buildComponentDeclarationLines = (componentEntries, { declarationDir, includeTableAliases = false } = {}) => {
  const lines = [
    ...(includeTableAliases ? [existingTableImports] : []),
    "import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'",
    '',
    'type ComponentInstance<T> = T extends new (...args: any[]) => infer R ? R : never',
    'type JSXComponentProps<Props> = Props & VNodeProps & AllowedComponentProps & ComponentCustomProps & { children?: any }',
    '',
  ]

  if (includeTableAliases && tableAliases.length) {
    lines.push('declare global {')
    tableAliases.forEach((line) => {
      lines.push(`  type ${line}`)
    })
    lines.push('}')
    lines.push('')
  }

  lines.push("declare module 'vue' {")
  lines.push('  export interface GlobalComponents {')
  componentEntries.forEach(({ componentName, tagName, wrapperFilePath, docsUrl }) => {
    const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
    const wrapperImportPath = getNormalizedImportPath(declarationDir, wrapperFilePath)
    const componentType = typedComponent?.exportedComponentTypeName
      ? `import('${wrapperImportPath}').${typedComponent.exportedComponentTypeName}`
      : `(typeof import('${wrapperImportPath}'))['default']`
    const globalComponentType = typedComponent?.useDefaultExportForGlobal
      ? `(typeof import('${wrapperImportPath}'))['default']`
      : componentType

    getComponentDocCommentLines({ docsUrl, description: typedComponent?.description }).forEach((line) => {
      lines.push(`    ${line}`)
    })
    lines.push(`    ${componentName}: ${globalComponentType}`)

    const templateTagName = typedComponent?.tagName || tagName
    if (templateTagName) {
      getComponentDocCommentLines({ docsUrl, description: typedComponent?.description }).forEach((line) => {
        lines.push(`    ${line}`)
      })
      lines.push(`    '${templateTagName}': ${globalComponentType}`)
    }
  })
  lines.push('  }')
  lines.push('}')
  lines.push('')

  componentEntries.forEach(({ componentName, wrapperFilePath, instanceTypeName, publicPropsTypeName }) => {
    const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
    const wrapperImportPath = getNormalizedImportPath(declarationDir, wrapperFilePath)
    const componentType = typedComponent?.exportedComponentTypeName
      ? `import('${wrapperImportPath}').${typedComponent.exportedComponentTypeName}`
      : `(typeof import('${wrapperImportPath}'))['default']`

    lines.push(`export type ${componentName}Component = ${componentType}`)
    lines.push(`export type ${instanceTypeName} = ComponentInstance<${componentName}Component>`)
    if (typedComponent?.publicPropsTypeName) {
      lines.push(
        `export type ${publicPropsTypeName} = import('${wrapperImportPath}').${typedComponent.publicPropsTypeName}`,
      )
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

  return lines
}

await writeDeclarationFile(
  outputPath,
  buildComponentDeclarationLines(mainComponentEntries, {
    declarationDir: dirname(outputPath),
    includeTableAliases: true,
  }).join('\n'),
)
await writeDeclarationFile(
  chartComponentsOutputPath,
  buildComponentDeclarationLines(chartComponentEntries, { declarationDir: dirname(chartComponentsOutputPath) }).join(
    '\n',
  ),
)

for (const { componentName, wrapperFilePath } of allComponentEntries) {
  const typedComponent = TYPED_COMPONENT_PROPS.get(componentName)
  const wrapperDir = dirname(wrapperFilePath)
  const elementWrapperConfig = ELEMENT_WRAPPER_CONFIGS[typedComponent?.explicitComponentType]

  if (typedComponent?.hoverProps && elementWrapperConfig) {
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

  await writeDeclarationFile(wrapperFilePath, wrapperLines.join('\n'))
}

if (checkOnly && outdatedDeclarationFiles.length) {
  console.error('以下组件类型声明不是最新生成结果：')
  outdatedDeclarationFiles.forEach((filePath) => console.error(`- ${filePath}`))
  console.error('请先执行 pnpm types:generate，并提交生成后的类型声明。')
  process.exitCode = 1
}
