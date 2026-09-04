# 主题路由

只读取目标主题：成华读 [chenghua-ui.md](chenghua-ui.md)，石景山读 [shijingshan-ui.md](shijingshan-ui.md)。

```vue
<s-button theme="shijingshan" type="primary">保存</s-button>
<s-card theme="shijingshan" title="审核规则管理" />
```

- 先复用项目主题 token/全局切换；组件优先 `theme`，品牌换色优先全局 `themeColors`（见 [setup.md](setup.md#自定义主题色)），避免页面硬编码。
- 同步处理背景、卡片、按钮、标签、标题和图表；检查桌面/移动端溢出、遮挡和挤压。
- 组件文档必须列出主题属性名、可选值、默认值；新增 `theme="chenghua"` 时同步侧边栏星号。
