# Changelog

- 2026-11-27 16:20:00 `inputLabel` 重命名为 `inputTag`（`SInputTag` / `s-input-tag`）：新增可配置分隔符正则 `splitRegExp`（默认按中英文逗号、顿号、分号、空白切分）、`allowDuplicate`、`maxCount`、`placeholder`、`singleLine`（默认 true 单行左右滚动，false 时自动换行、高度随标签数变化）、`disabled`、`clearable`、退格删除、粘贴即分割，新增 `change` / `add` / `remove` / `clear` 事件、`tag` 插槽和 `tagAttrs`（标签改用 `s-tag` 渲染，可透传 type / effect / size / round / theme 等），并重写样式（单行模式下标签超出时在控件内左右滚动，聚焦边框保持 1px；禁用时不再渲染输入框，重复项只提示、不清空输入；标签文字可选中复制，标签关闭按钮与整体清空按钮仅鼠标移入时显示，关闭按钮改为浮层定位在标签右上角、图标水平垂直居中且完全不参与布局，避免换行边缘 hover 时上下抖动，清空按钮垂直居中）
- 2026-11-27 14:20:00 `@sybz-components/utils` 修复 `validate`：`decimal`/`port` 正则补上边界、`between`/`same` 不再重复回调、非必填空值不再被格式校验拦截、`pureValid` 对所有内置类型都返回布尔值（`same` 纯校验用 `compare`），缺少 `reg` 的 `custom` 降级为必填校验
- 2026-11-24 18:48:28 `element-plus`的版本强制固定, 防止再有不同版本导致的样式和行为不统一, 以组件库的`element-plus`版本为准
- 2026-11-23 18:15:00 `sybzVitePlugins({ compat: true })` 新增应用级 Chrome 60+ 兼容：统一 build target、注入 `@vitejs/plugin-legacy` 生成 nomodule/SystemJS 产物、自动注入 PostCSS 兼容插件；已有 postcss.config 时提示手动合并 `createSybzCompatPostcssPlugins()`
- 2026-11-23 17:10:00 组件库按 Chrome 60+ 构建：Babel/esbuild 语法降级、core-js + ResizeObserver/AbortController polyfill、PostCSS 前缀与可降级 CSS 处理（含 `:focus-visible`/`:where`/`:has` 选择器列表拆分）、按需入口自动带 polyfill，并新增 `pnpm check:compat` 产物校验
- 2026-11-23 12:33:09 dangerouslyUseHTMLString全局都默认改为true, 可以直接适配编辑组件和<br>等html元素
- 2026-11-21 23:47:00 @sybz-components/utils 修复 `$toast` 字符串图标在 Element Plus 多实例下取不到 SIcon（Vue 挂载实例属性应为 `__vue_app__`，并兼容 `data-v-app` 挂载点）；`vue`、`element-plus` 改为 peerDependencies
- 2026-11-12 14:03:53 1. 'miw maw mih mah' 改为 'minw maxw minh maxh' 2. http的写法统一改为 http('url', config);
- 2026-10-23 14:06:04 s-icon 新增 highlight 属性, 鼠标移入时默认色图标线条变主题主色、语义色图标(含警告色/错误色)同色系加深, 默认 false
- 2026-10-23 10:35:00 s-dialog 回车确认排除输入法组词、textarea/contenteditable 换行、按钮和链接回车、展开的弹层
- 2026-10-23 10:21:01 s-form 默认阻止原生 submit 提交, 避免表单内输入框回车触发整页刷新; @submit 监听仍会触发
- 2026-10-11 11:55:24 s-radio和s-checkbox废弃showType, 改为variant
- 2026-08-31 17:54:07 s-icon和s-svg把name属性都改为icon属性, 跟s-button保持一致
- 2026-06-14 17:05:05 增加快速跳转 更改搜索文档的algoliabug
- 2026-06-10 10:51:34 公司使用组件加星号
- 2026-06-08 17:40:25 第一次提交代码
