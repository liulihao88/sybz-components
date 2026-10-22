# 主题路由

只读取目标主题：成华读 [chenghua-ui.md](chenghua-ui.md)，石景山读 [shijingshan-ui.md](shijingshan-ui.md)。

先检查应用入口是否已通过 `app.use(SybzComponents, { theme: 'shijingshan' })` 设置全局主题。已设置时，业务组件继承全局主题，不重复写 `theme`：

```vue
<s-button type="primary">保存</s-button>
<s-card title="审核规则管理" />
```

仅当组件要覆盖全局主题，或项目没有设置全局主题而该组件需要主题时，显式传 `theme`，例如 `<s-button theme="chenghua" type="primary">保存</s-button>`。主题工具函数单独通过 `configureUtils({ theme: '...' })` 设置全局默认主题；已设置时，单次 `$toast`、`confirm` 也省略重复的 `theme`。

- 先复用项目主题 token/全局切换；品牌换色优先全局 `themeColors`（见 [setup.md](setup.md#自定义主题色)），避免页面硬编码。
- `gulou` 属于纯换色预设，复用 `shijingshan` 的组件结构；同类主题只登记基础主题映射和公共色板，不新增整套组件 SCSS。
- 同步处理背景、卡片、按钮、标签、标题和图表；检查桌面/移动端溢出、遮挡和挤压。
- 组件文档必须列出主题属性名、可选值、默认值；新增 `theme="chenghua"` 时同步侧边栏星号。
