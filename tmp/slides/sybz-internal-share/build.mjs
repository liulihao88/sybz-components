import fs from 'node:fs/promises'
import path from 'node:path'
import { Presentation, PresentationFile } from '@oai/artifact-tool'

const W = 1280
const H = 720
const OUT = '/Users/liulihao/sybz/sybz-components/outputs/sybz-internal-share/sybz-components-internal-sharing.pptx'
const PREVIEW = '/Users/liulihao/sybz/sybz-components/tmp/slides/sybz-internal-share/preview'
const LOGO = '/Users/liulihao/sybz/sybz-components/docs/public/img/logo.svg'

const C = {
  navy: '#14213D',
  blue: '#165DFF',
  cyan: '#00B8D4',
  ink: '#182230',
  text: '#344054',
  muted: '#667085',
  line: '#DCE3EE',
  bg: '#F7F9FC',
  white: '#FFFFFF',
  pale: '#EEF5FF',
  amber: '#F59E0B',
  red: '#E5484D',
  green: '#12A36D',
}
const FONT = 'PingFang SC'
const records = []

async function blob(file) {
  const bytes = await fs.readFile(file)
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}

async function saveBlob(fileBlob, file) {
  await fs.writeFile(file, new Uint8Array(await fileBlob.arrayBuffer()))
}

function shape(slide, geometry, x, y, w, h, fill = '#00000000', line = '#00000000', width = 0) {
  return slide.shapes.add({
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: 'solid', fill: line, width },
  })
}

function text(slide, n, value, x, y, w, h, opts = {}) {
  const box = shape(slide, 'rect', x, y, w, h, opts.fill || '#00000000', opts.line || '#00000000', opts.lineWidth || 0)
  box.text = value
  box.text.fontSize = opts.size || 20
  box.text.typeface = opts.font || FONT
  box.text.color = opts.color || C.ink
  box.text.bold = Boolean(opts.bold)
  box.text.alignment = opts.align || 'left'
  box.text.verticalAlignment = opts.valign || 'top'
  box.text.insets = { left: opts.pad ?? 0, right: opts.pad ?? 0, top: opts.vpad ?? 0, bottom: opts.vpad ?? 0 }
  box.text.autoFit = 'shrinkText'
  records.push({ kind: 'textbox', slide: n, text: value, bbox: [x, y, w, h] })
  return box
}

function header(slide, n, label, total = 9) {
  text(slide, n, label.toUpperCase(), 64, 31, 420, 24, { size: 13, color: C.blue, bold: true })
  text(slide, n, `${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, 1095, 31, 120, 24, {
    size: 13,
    color: C.muted,
    bold: true,
    align: 'right',
  })
  shape(slide, 'rect', 64, 63, 1152, 2, C.line)
  shape(slide, 'ellipse', 56, 55, 18, 18, C.blue)
}

function title(slide, n, headline, sub) {
  text(slide, n, headline, 64, 91, 1050, 60, { size: 34, color: C.navy, bold: true })
  if (sub) text(slide, n, sub, 66, 158, 960, 50, { size: 18, color: C.text })
}

function footer(slide, n) {
  text(slide, n, 'sybz-components · Vue 3 + Element Plus 业务组件层', 64, 681, 780, 18, { size: 10, color: C.muted })
}

function card(slide, n, x, y, w, h, heading, body, accent = C.blue) {
  shape(slide, 'roundRect', x, y, w, h, C.white, C.line, 1)
  shape(slide, 'rect', x, y, 6, h, accent)
  text(slide, n, heading, x + 24, y + 22, w - 42, 30, { size: 19, color: C.navy, bold: true })
  text(slide, n, body, x + 24, y + 66, w - 44, h - 82, { size: 15, color: C.text })
}

function pill(slide, n, value, x, y, w, color = C.pale, ink = C.blue) {
  text(slide, n, value, x, y, w, 32, {
    size: 13,
    color: ink,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: color,
    pad: 8,
  })
}

function dot(slide, x, y, color) {
  shape(slide, 'ellipse', x, y, 12, 12, color)
}

async function addLogo(slide, x, y, w, h) {
  const image = slide.images.add({ blob: await blob(LOGO), fit: 'contain', alt: 'Sybz Components logo' })
  image.position = { left: x, top: y, width: w, height: h }
}

async function cover(p) {
  const n = 1
  const slide = p.slides.add()
  slide.background.fill = C.navy
  shape(slide, 'rect', 64, 105, 6, 410, C.cyan)
  await addLogo(slide, 84, 58, 72, 72)
  text(slide, n, '公司内部技术分享', 84, 154, 420, 28, { size: 15, color: '#8BB6FF', bold: true })
  text(slide, n, '从重复造轮子\n到统一交付能力', 84, 198, 610, 160, { size: 47, color: C.white, bold: true })
  text(slide, n, 'sybz-components 如何让业务页面开发更快、体验更统一、维护成本更低', 86, 385, 560, 64, {
    size: 21,
    color: '#D7E5FF',
  })
  pill(slide, n, 'Vue 3', 86, 500, 92, '#FFFFFF22', C.white)
  pill(slide, n, 'Element Plus', 188, 500, 128, '#FFFFFF22', C.white)
  pill(slide, n, '业务沉淀', 326, 500, 112, '#FFFFFF22', C.white)
  text(slide, n, '一次沉淀，多项目复用', 86, 624, 420, 28, { size: 18, color: C.cyan, bold: true })
  shape(slide, 'roundRect', 746, 72, 470, 576, C.white, '#5E77A8', 1)
  shape(slide, 'rect', 746, 72, 470, 58, C.pale)
  dot(slide, 770, 95, C.red)
  dot(slide, 792, 95, C.amber)
  dot(slide, 814, 95, C.green)
  text(slide, n, '业务页面组件组合', 850, 91, 300, 24, { size: 16, color: C.navy, bold: true })
  text(slide, n, '<s-form />', 786, 166, 178, 68, {
    size: 21,
    color: C.blue,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: C.pale,
  })
  text(slide, n, '<s-table />', 988, 166, 178, 68, {
    size: 21,
    color: C.blue,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: C.pale,
  })
  text(slide, n, '<s-dialog />', 786, 258, 178, 68, {
    size: 21,
    color: C.green,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: '#E8F8F1',
  })
  text(slide, n, '<s-tooltip />', 988, 258, 178, 68, {
    size: 21,
    color: C.green,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: '#E8F8F1',
  })
  text(slide, n, 'theme="chenghua"', 786, 368, 380, 58, {
    size: 18,
    color: C.amber,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: '#FFF4DF',
  })
  text(slide, n, '@sybz-components/utils', 786, 448, 380, 58, {
    size: 18,
    color: C.cyan,
    bold: true,
    align: 'center',
    valign: 'middle',
    fill: '#E5F9FC',
  })
  text(slide, n, '统一默认值 · 类型提示 · 文档示例', 786, 555, 380, 26, { size: 15, color: C.text, align: 'center' })
  slide.speakerNotes.setText('先从大家熟悉的重复开发体验切入，再介绍组件库如何成为项目基础设施。')
}

function painOverview(p) {
  const n = 2
  const slide = p.slides.add()
  slide.background.fill = C.bg
  header(slide, n, '先看痛点')
  title(slide, n, '不用统一组件库，问题不是“写得慢”这么简单', '它会把一次需求拆成多次实现、多轮沟通和长期维护。')
  card(slide, n, 64, 264, 260, 250, '重复封装', '每个项目都要重新处理表格、表单、弹窗、分页与空状态。', C.red)
  card(slide, n, 344, 264, 260, 250, '体验分裂', '相似功能却有不同默认值、按钮间距、校验提示和加载反馈。', C.amber)
  card(slide, n, 624, 264, 260, 250, '维护扩散', '一个通用问题，需要在多个项目分别定位、修复和回归。', C.blue)
  card(slide, n, 904, 264, 260, 250, '交接困难', '新成员需要先学习每个项目的私有封装和隐性规范。', C.green)
  text(slide, n, '结果：研发成本随着项目数量线性累积，且难以形成组织资产。', 64, 568, 1050, 36, {
    size: 22,
    color: C.navy,
    bold: true,
  })
  footer(slide, n)
}

function painFlow(p) {
  const n = 3
  const slide = p.slides.add()
  slide.background.fill = C.white
  header(slide, n, '成本如何放大')
  title(slide, n, '同一个需求，在每个项目都要重新走一遍', '没有共享组件层时，重复实现会逐步演变为重复缺陷。')
  const steps = [
    ['需求出现', '例如：带筛选、分页、空状态的列表'],
    ['项目 A 封装', '形成局部写法与样式'],
    ['项目 B 再实现', '重复处理交互与边界'],
    ['问题分别修复', '维护与回归成本持续叠加'],
  ]
  steps.forEach((item, i) => {
    const x = 66 + i * 290
    shape(slide, 'roundRect', x, 305, 224, 162, i === 3 ? '#FFF3F2' : C.pale, i === 3 ? '#F7C2BF' : '#C7DAFF', 1)
    shape(slide, 'ellipse', x + 20, 330, 42, 42, i === 3 ? C.red : C.blue)
    text(slide, n, String(i + 1), x + 20, 339, 42, 22, { size: 16, color: C.white, bold: true, align: 'center' })
    text(slide, n, item[0], x + 78, 326, 128, 30, { size: 18, color: C.navy, bold: true })
    text(slide, n, item[1], x + 20, 393, 184, 52, { size: 14, color: C.text })
    if (i < steps.length - 1) {
      shape(slide, 'rightArrow', x + 235, 366, 40, 28, i === 2 ? C.red : C.blue)
    }
  })
  text(slide, n, '项目越多，重复建设越多；“局部最优”最终会变成团队的整体负担。', 66, 540, 1050, 34, {
    size: 22,
    color: C.navy,
    bold: true,
  })
  footer(slide, n)
}

function positioning(p) {
  const n = 4
  const slide = p.slides.add()
  slide.background.fill = C.bg
  header(slide, n, '组件库定位')
  title(
    slide,
    n,
    'sybz-components：把高频业务能力变成共享基础设施',
    '它建立在 Vue 3 + Element Plus 之上，保留原生兼容性，同时补齐业务场景。',
  )
  const layers = [
    ['业务页面', '页面只关注业务数据、流程和权限', '#EAF2FF', C.blue],
    ['sybz-components', '表单、表格、弹窗、布局、提示、图表、主题、指令', '#DDF8F5', C.green],
    ['Element Plus', '稳定的通用交互能力与成熟生态', '#FFF3DC', C.amber],
    ['Vue 3', '响应式框架与工程基础', '#EEF1F6', C.muted],
  ]
  layers.forEach((layer, i) => {
    const y = 252 + i * 87
    shape(slide, 'roundRect', 138 + i * 34, y, 820 - i * 68, 65, layer[2], '#D5DCE8', 1)
    text(slide, n, layer[0], 174 + i * 34, y + 14, 220, 26, { size: 19, color: layer[3], bold: true })
    text(slide, n, layer[1], 420, y + 17, 460, 24, { size: 15, color: C.text })
  })
  card(
    slide,
    n,
    960,
    255,
    235,
    255,
    '核心原则',
    '业务页优先复用组件与工具函数；通用问题优先在组件库解决；页面不再散落重复样式与交互逻辑。',
    C.cyan,
  )
  footer(slide, n)
}

function efficiency(p) {
  const n = 5
  const slide = p.slides.add()
  slide.background.fill = C.white
  header(slide, n, '直接开发收益')
  title(slide, n, '把时间从“搭基础能力”还给业务交付', '组件提供合理默认值、配置化用法与常见边界处理。')
  const left =
    '每个页面分别处理\n\n• 表单控件与校验\n• 表格、分页与空状态\n• 弹窗和确认操作\n• 文本溢出与提示\n• 主题色与间距细节'
  const right =
    '页面优先组合现有能力\n\n• SForm / STable / SDescriptions\n• SDialog / SPopconfirm / SWarning\n• STooltip / SEmpty / SFlex\n• 统一默认值与属性透传\n• 主题 token 与组件 theme'
  card(slide, n, 90, 257, 420, 286, '不使用组件库', left, C.red)
  shape(slide, 'rightArrow', 556, 353, 150, 62, C.blue)
  text(slide, n, '复用', 578, 371, 104, 22, { size: 18, color: C.white, bold: true, align: 'center' })
  card(slide, n, 752, 257, 420, 286, '使用 sybz-components', right, C.green)
  text(slide, n, '收益不是少写几个标签，而是少维护一套重复的设计与交互决策。', 90, 590, 1050, 32, {
    size: 21,
    color: C.navy,
    bold: true,
  })
  footer(slide, n)
}

function consistency(p) {
  const n = 6
  const slide = p.slides.add()
  slide.background.fill = C.bg
  header(slide, n, '体验与品牌一致性')
  title(
    slide,
    n,
    '同一套组件，让用户在不同项目中看到一致的行为',
    '默认值、状态反馈、操作间距、主题颜色和交互细节由组件层统一。',
  )
  const axes = [
    ['交互', '加载、防抖、确认、错误提示'],
    ['视觉', '尺寸、圆角、间距、空状态'],
    ['主题', 'default / chenghua / shijingshan'],
    ['配置', '项目级与组件级默认属性'],
  ]
  axes.forEach((row, i) => {
    const y = 267 + i * 70
    shape(slide, 'roundRect', 112, y, 1010, 50, C.white, C.line, 1)
    dot(slide, 136, y + 19, [C.blue, C.cyan, C.amber, C.green][i])
    text(slide, n, row[0], 164, y + 14, 160, 24, { size: 18, color: C.navy, bold: true })
    text(slide, n, row[1], 386, y + 14, 650, 24, { size: 16, color: C.text })
  })
  pill(slide, n, 'theme="chenghua"', 112, 575, 180, '#EAF2FF', C.blue)
  pill(slide, n, 'theme="shijingshan"', 306, 575, 200, '#EAF2FF', C.blue)
  text(slide, n, '主题切换不依赖业务页面散落的硬编码颜色。', 532, 580, 520, 22, { size: 16, color: C.text })
  footer(slide, n)
}

function engineering(p) {
  const n = 7
  const slide = p.slides.add()
  slide.background.fill = C.white
  header(slide, n, '工程质量')
  title(
    slide,
    n,
    '兼容原生能力，同时把规范前置到开发阶段',
    '开发人员无需在“复用组件”和“保留 Element Plus 能力”之间二选一。',
  )
  card(
    slide,
    n,
    64,
    258,
    340,
    250,
    'TypeScript 提示',
    '组件类型同时覆盖 sybz 扩展属性和 Element Plus 原生属性；属性、事件与插槽更易发现。',
    C.blue,
  )
  card(
    slide,
    n,
    470,
    258,
    340,
    250,
    '全局默认配置',
    '入口统一设置 theme、size 及组件默认属性，减少页面重复传参。',
    C.cyan,
  )
  card(
    slide,
    n,
    876,
    258,
    340,
    250,
    '文档驱动使用',
    '基础用法、属性默认值、主题示例和常见场景可直接查看与复制。',
    C.green,
  )
  text(slide, n, '工程结果：更少“口头约定”，更多可发现、可复用、可维护的标准。', 64, 568, 1050, 34, {
    size: 22,
    color: C.navy,
    bold: true,
  })
  footer(slide, n)
}

function collaboration(p) {
  const n = 8
  const slide = p.slides.add()
  slide.background.fill = C.bg
  header(slide, n, '团队协作')
  title(slide, n, '组件、工具函数、文档与 AI 指引，共用一套工作语言', '让新成员和跨项目协作不再从“先找私有封装”开始。')
  const items = [
    ['开发者', '优先使用 S 组件与 @sybz-components/utils'],
    ['项目负责人', '用全局默认配置控制项目级规范'],
    ['组件维护者', '通用问题在组件库修复并回流所有项目'],
    ['AI 辅助开发', 'Codex Skill 引导优先复用组件、工具函数与主题规范'],
  ]
  items.forEach((item, i) => {
    const x = 74 + (i % 2) * 570
    const y = 265 + Math.floor(i / 2) * 145
    shape(slide, 'roundRect', x, y, 530, 110, C.white, C.line, 1)
    shape(slide, 'ellipse', x + 22, y + 28, 52, 52, [C.blue, C.cyan, C.amber, C.green][i])
    text(slide, n, String(i + 1), x + 22, y + 43, 52, 20, { size: 15, color: C.white, bold: true, align: 'center' })
    text(slide, n, item[0], x + 96, y + 24, 360, 26, { size: 19, color: C.navy, bold: true })
    text(slide, n, item[1], x + 96, y + 59, 395, 28, { size: 15, color: C.text })
  })
  footer(slide, n)
}

function adoption(p) {
  const n = 9
  const slide = p.slides.add()
  slide.background.fill = C.white
  header(slide, n, '建议的推广方式')
  title(
    slide,
    n,
    '从新页面开始，让组件库成为默认方案',
    '不要求一次性重构所有历史页面，而是在增量交付中持续扩大复用面。',
  )
  const steps = [
    ['01', '新页面优先使用', '表单、表格、弹窗、布局和提示优先从组件库选择。'],
    ['02', '高频重复场景回流', '跨项目重复出现的能力，抽象后沉淀到组件库。'],
    ['03', '项目级默认配置', '统一主题、尺寸与通用默认属性，降低页面差异。'],
    ['04', '版本升级复用修复', '通用问题集中修复，项目升级后共享收益。'],
  ]
  steps.forEach((item, i) => {
    const x = 64 + i * 290
    shape(slide, 'roundRect', x, 283, 248, 246, C.bg, C.line, 1)
    text(slide, n, item[0], x + 22, 305, 90, 38, { size: 25, color: C.blue, bold: true })
    text(slide, n, item[1], x + 22, 362, 190, 52, { size: 19, color: C.navy, bold: true })
    text(slide, n, item[2], x + 22, 430, 198, 62, { size: 14, color: C.text })
    if (i < 3) shape(slide, 'rightArrow', x + 254, 382, 26, 24, C.cyan)
  })
  text(slide, n, '从“可选工具”逐步变成“团队默认的组件层”。', 64, 585, 1050, 32, { size: 22, color: C.navy, bold: true })
  footer(slide, n)
}

async function build() {
  await fs.mkdir(path.dirname(OUT), { recursive: true })
  await fs.mkdir(PREVIEW, { recursive: true })
  const p = Presentation.create({ slideSize: { width: W, height: H } })
  p.theme.colorScheme = { name: 'Sybz', themeColors: { accent1: C.blue, accent2: C.cyan, bg1: C.white, tx1: C.ink } }
  await cover(p)
  painOverview(p)
  painFlow(p)
  positioning(p)
  efficiency(p)
  consistency(p)
  engineering(p)
  collaboration(p)
  adoption(p)
  for (let i = 0; i < p.slides.count; i += 1) {
    const rendered = await p.export({ slide: p.slides.getItem(i), format: 'png', scale: 1 })
    await saveBlob(rendered, path.join(PREVIEW, `slide-${String(i + 1).padStart(2, '0')}.png`))
  }
  await fs.writeFile(path.join(path.dirname(PREVIEW), 'inspect.json'), JSON.stringify(records, null, 2))
  const pptx = await PresentationFile.exportPptx(p)
  await pptx.save(OUT)
}

await build()
