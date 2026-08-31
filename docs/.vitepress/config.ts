import { defineConfig, type UserConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { mdPlugin } from './config/plugins.ts'
import { createAlgolia, Github } from './utils/settings.ts'
import { sybzVitePlugins } from '@sybz-components/utils/vite'

const isProd = process.env.NODE_ENV === 'production'
const siteBase = '/sybz-components/'
const hiddenDocsInProd = ['/components/test/home.md', '/components/chooseArea/home.md']
const sybzMark = (text: string) => `<span class="sybz-components-sidebar-star" aria-hidden="true">*</span>${text}`
const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const utilsSourceDir = fileURLToPath(new URL('../../packages/utils/src/', import.meta.url))
const utilsDocsDir = fileURLToPath(new URL('../components/utils/', import.meta.url))
type VitePressPlugin = Extract<NonNullable<NonNullable<UserConfig['vite']>['plugins']>[number], { name: string }>
type HookHandler<T> = T extends (...args: any[]) => any
  ? T
  : T extends { handler: infer Handler extends (...args: any[]) => any }
    ? Handler
    : never
type VitePressDevServer = Parameters<HookHandler<NonNullable<VitePressPlugin['configureServer']>>>[0]

const formatBuildTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const buildTime = formatBuildTime(new Date())

const reloadUtilsSourceDocs = (server: VitePressDevServer, file: string) => {
  if (!file.startsWith(utilsSourceDir) || !file.endsWith('.ts')) return

  server.moduleGraph.fileToModulesMap.forEach((modules, moduleFile) => {
    if (!moduleFile.startsWith(utilsDocsDir) || !moduleFile.endsWith('.md')) return

    modules.forEach((module) => server.moduleGraph.invalidateModule(module))
  })

  server.ws.send({ type: 'full-reload' })
}

const utilsSourceDocsHmrPlugin = (): VitePressPlugin => ({
  name: 'vitepress-utils-source-docs-hmr',
  apply: 'serve',
  configureServer(server) {
    server.watcher.add(utilsSourceDir)
    server.watcher.on('add', (file) => reloadUtilsSourceDocs(server, file))
    server.watcher.on('change', (file) => reloadUtilsSourceDocs(server, file))
    server.watcher.on('unlink', (file) => reloadUtilsSourceDocs(server, file))
  },
})

export default defineConfig({
  // 站点级选项
  base: siteBase,
  srcExclude: isProd ? ['components/test/**'] : [],
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: `${siteBase}img/logo.svg` }],
    ['meta', { name: 'algolia-site-verification', content: '8E57640BD511CC36' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ],
  ],
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: false,
  title: 'Sybz-Components',
  description: '思云博智',
  lang: 'zh-CN',
  themeConfig: {
    outline: 3,
    algolia: createAlgolia(),
    lastUpdatedText: '最近更新时间',
    docFooter: { prev: '上一篇', next: '下一篇' },
    editLink: {
      pattern: `${Github}/docs/:path`,
      text: '在 Github 上查看此页面',
    },
    footer: {
      message: `思云博智私有前端组件库`,
      copyright: ` 版权所有 © 2023-2030`,
    },
    nav: [
      {
        text: '安装指南',
        link: '/components/',
      },
      { text: '基础组件', link: '/components/dialog/home.md' },
      {
        text: 'Github项目地址',
        link: Github,
      },
    ],
    // 主题级选项
    sidebar: {
      '/components/': [
        {
          text: '说明文档',
          collapsed: false,
          items: [
            {
              text: '安装指南',
              link: '/components/',
            },
            {
              text: '组件库使用指南',
              link: '/components/usageGuide/home.md',
            },
            {
              text: 'Skills 使用说明',
              link: '/components/skills/home.md',
            },
            {
              text: 'Portal Dev 门户联调',
              link: '/components/portalDev/home.md',
            },
            {
              text: '前端代码统一规范',
              link: '/components/codeStandard/home.md',
            },
            {
              text: 'Overview组件总览',
              link: '/components/overview/home.md',
            },
            {
              text: '其他',
              collapsed: true,
              items: [
                {
                  text: 'Shell Alias 快捷命令',
                  link: '/components/alias/home.md',
                },
                {
                  text: 'vitepress常用语法',
                  link: '/components/utils/grammar/home.md',
                },
                {
                  text: '项目常见写法',
                  link: '/components/projectWriting/home.md',
                },
                {
                  text: '国际化',
                  link: '/components/utils/i18n/home.md',
                },
                {
                  text: 'ChangeLog',
                  link: '/components/utils/changelog/home.md',
                },
              ],
            },
          ],
        },
        {
          text: '函数方法',
          collapsed: false,
          items: [
            {
              text: 'utils 方法总览（A-Z）',
              link: '/components/utils/home.md',
            },
            {
              text: sybzMark('$toast 消息提示'),
              link: '/components/utils/$toast/home.md',
            },
            {
              text: sybzMark('clone 深克隆'),
              link: '/components/utils/clone/home.md',
            },
            {
              text: sybzMark('confirm 确认框'),
              link: '/components/utils/confirm/home.md',
            },
            {
              text: 'debounce 防抖函数',
              link: '/components/utils/debounce/home.md',
            },
            {
              text: sybzMark('delay 延迟函数'),
              link: '/components/utils/delay/home.md',
            },
            {
              text: 'formatBytes 字节格式化',
              link: '/components/utils/formatBytes/home.md',
            },
            {
              text: 'formatBytesConvert 字节转数字',
              link: '/components/utils/formatBytesConvert/home.md',
            },
            {
              text: 'formatDurationTime 持续时间',
              link: '/components/utils/formatDurationTime/home.md',
            },
            {
              text: 'formatTextToHtml 文本转 HTML',
              link: '/components/utils/formatTextToHtml/home.md',
            },
            {
              text: sybzMark('formatTime 时间格式化'),
              link: '/components/utils/formatTime/home.md',
            },
            {
              text: 'formatToFixed 小数格式化',
              link: '/components/utils/formatToFixed/home.md',
            },
            {
              text: sybzMark('getType 类型判断'),
              link: '/components/utils/getType/home.md',
            },
            {
              text: sybzMark('gitCommitLog Git 提交记录'),
              link: '/components/utils/gitCommitLog/home.md',
            },
            {
              text: sybzMark('isEmpty 空值判断'),
              link: '/components/utils/isEmpty/home.md',
            },
            {
              text: sybzMark('sybzVitePlugins Vite 插件预设'),
              link: '/components/utils/sybzVitePlugins/home.md',
            },

            {
              text: 'throttle 节流函数',
              link: '/components/utils/throttle/home.md',
            },
            {
              text: sybzMark('tryCatch Promise 封装'),
              link: '/components/utils/tryCatch/home.md',
            },
            {
              text: 'mockValue 随机字符串',
              link: '/components/utils/mockValue/home.md',
            },
            {
              text: sybzMark('validate 表单校验'),
              link: '/components/utils/validate/home.md',
            },
            {
              text: sybzMark('validateForm 表单校验封装'),
              link: '/components/utils/validateForm/home.md',
            },
          ],
        },
        {
          text: 'Basic基础组件',
          collapsed: false,
          items: [
            {
              text: '测试组件',
              link: '/components/test/home.md',
            },
            // {
            //   text: 'buildTime构建时间',
            //   link: '/components/buildTime/home.md',
            // },
            {
              text: sybzMark('button组件'),
              link: '/components/button/home.md',
            },
            {
              text: sybzMark('checkbox组件'),
              link: '/components/checkbox/home.md',
            },
            {
              text: 'clickOutside外部点击组件',
              link: '/components/clickOutside/home.md',
            },
            {
              text: sybzMark('compTitle标题前缀'),
              link: '/components/compTitle/home.md',
            },
            {
              text: sybzMark('datePicker组件'),
              link: '/components/datePicker/home.md',
            },
            {
              text: sybzMark('descriptions组件'),
              link: '/components/descriptions/home.md',
            },
            {
              text: sybzMark('markdown渲染组件'),
              link: '/components/markdown/home.md',
            },
            {
              text: sybzMark('dialog组件'),
              link: '/components/dialog/home.md',
            },
            {
              text: 'drawer组件',
              link: '/components/drawer/home.md',
            },
            {
              text: sybzMark('empty组件'),
              link: '/components/empty/home.md',
            },
            // {
            //   text: 'functionSourceCode源码展示',
            //   link: '/components/functionSourceCode/home.md',
            // },
            {
              text: sybzMark('popconfirm组件'),
              link: '/components/popconfirm/home.md',
            },
            {
              text: 'progress组件',
              link: '/components/progress/home.md',
            },
            {
              text: 'upload上传组件',
              link: '/components/upload/home.md',
            },
            {
              text: sybzMark('radio组件'),
              link: '/components/radio/home.md',
            },
            {
              text: sybzMark('row布局组件'),
              link: '/components/row/home.md',
            },
            {
              text: sybzMark('select组件'),
              link: '/components/select/home.md',
            },
            {
              text: sybzMark('switch组件'),
              link: '/components/switch/home.md',
            },
            {
              text: 'svg组件',
              link: '/components/svg/home.md',
            },
            {
              text: sybzMark('icon组件'),
              link: '/components/icon/home.md',
            },
            {
              text: 'image图片组件',
              link: '/components/image/home.md',
            },
            {
              text: sybzMark('input组件'),
              link: '/components/input/home.md',
            },
            {
              text: sybzMark('inputNumber组件'),
              link: '/components/inputNumber/home.md',
            },
            {
              text: 'inputLabel组件',
              link: '/components/inputLabel/home.md',
            },
            {
              text: sybzMark('menu菜单组件'),
              link: '/components/menu/home.md',
            },
            {
              text: sybzMark('tabs组件'),
              link: '/components/tabs/home.md',
            },
            {
              text: sybzMark('tag组件'),
              link: '/components/tag/home.md',
            },
            {
              text: sybzMark('title组件'),
              link: '/components/title/home.md',
            },
            {
              text: sybzMark('tooltip组件'),
              link: '/components/tooltip/home.md',
            },
            {
              text: sybzMark('warning组件'),
              link: '/components/warning/home.md',
            },
          ].filter((item) => !isProd || !hiddenDocsInProd.includes(item.link)),
        },
        {
          text: '原生js组件',
          collapsed: false,
          items: [
            {
              text: sybzMark('flex布局组件'),
              link: '/components/flex/home.md',
            },
            {
              text: 'splitPane切割面板',
              link: '/components/splitPane/home.md',
            },
            {
              text: sybzMark('card基础布局组件'),
              link: '/components/card/home.md',
            },
            {
              text: sybzMark('item列表组件'),
              link: '/components/item/home.md',
            },
            {
              text: 'wrapper包裹列表组件',
              link: '/components/wrapper/home.md',
            },
          ],
        },
        {
          text: 'Complex复杂组件',
          collapsed: false,
          items: [
            {
              text: sybzMark('form组件'),
              link: '/components/form/home.md',
            },
            {
              text: sybzMark('table组件'),
              link: '/components/table/home.md',
            },
            {
              text: sybzMark('STableSearch表格搜索组件'),
              link: '/components/tableSearch/home.md',
            },
          ],
        },
        {
          text: '业务组件',
          collapsed: false,
          items: [
            {
              text: 'baseHeader基础头部',
              link: '/components/company/baseHeader/home.md',
            },
            {
              text: 'capacityProgress容量组件',
              link: '/components/company/capacityProgress/home.md',
            },
            {
              text: 'scheduleCalendar业务日历',
              link: '/components/company/scheduleCalendar/home.md',
            },
          ],
        },
        {
          text: '业务图表组件（需额外安装插件）',
          collapsed: false,
          items: [
            {
              text: 'chart图表组件',
              link: '/components/chart/home.md',
            },
            {
              text: 'countBar数量统计柱状图组件',
              link: '/components/company/countBar/home.md',
            },
            {
              text: 'countBarOld数量统计柱状图组件',
              link: '/components/company/countBarOld/home.md',
            },
            {
              text: 'objectLine对象数量/大小历史',
              link: '/components/company/objectLine/home.md',
            },
            {
              text: 'quotaPie容量圆环组件',
              link: '/components/company/quotaPie/home.md',
            },
          ],
        },

        {
          text: '自定义指令',
          collapsed: false,
          items: [
            {
              text: sybzMark('copy复制'),
              link: '/components/directives/copy/home.md',
            },
            {
              text: sybzMark('focus自动聚焦'),
              link: '/components/directives/focus/home.md',
            },
            {
              text: sybzMark('throttle节流'),
              link: '/components/directives/throttle/home.md',
            },
            {
              text: sybzMark('debounce防抖'),
              link: '/components/directives/debounce/home.md',
            },
            {
              text: 'cus-loading和cus-empty',
              link: '/components/directives/cusLoadingEmpty/home.md',
            },
          ],
        },
        {
          text: 'Hooks',
          collapsed: false,
          items: [
            {
              text: 'Hooks 总览',
              link: '/components/hooks/home.md',
            },
            {
              text: 'useBoolean 布尔状态',
              link: '/components/hooks/useBoolean/home.md',
            },
            {
              text: 'useLoading 加载状态',
              link: '/components/hooks/useLoading/home.md',
            },
            {
              text: 'usePagination 分页状态',
              link: '/components/hooks/usePagination/home.md',
            },
            {
              text: sybzMark('useFlexFillSize 自动计算剩余高度'),
              link: '/components/hooks/useFlexFillSize/home.md',
            },
            {
              text: 'useEventListener 事件监听',
              link: '/components/hooks/useEventListener/home.md',
            },
            {
              text: 'useClickOutside 外部点击',
              link: '/components/hooks/useClickOutside/home.md',
            },
          ],
        },
      ],
    },
  },
  vite: {
    plugins: [
      sybzVitePlugins({
        codeInspector: true,
        gitCommitLog: { cwd: rootDir, autoPrint: true, expanded: false },
      }),
      utilsSourceDocsHmrPlugin(),
    ],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
      },
    },
    define: {
      __buildInfos__: JSON.stringify(buildTime),
      __SYBZ_COMPONENTS_BUILD_TIME__: JSON.stringify(buildTime),
      __SYBZ_UTILS_BUILD_TIME__: JSON.stringify(buildTime),
    },
    server: {
      fs: {
        allow: [rootDir],
      },
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
