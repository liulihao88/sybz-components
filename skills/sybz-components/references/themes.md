# sybz-components 主题参考

当用户要求按 `chenghua` 或 `shijingshan` 主题设计、优化、重构 UI 时读取本文件，再读取对应主题文件。

## 可用主题

| 主题          | 使用场景               | 详细规范                               |
| ------------- | ---------------------- | -------------------------------------- |
| `chenghua`    | 成华区 AI 产业服务平台 | [chenghua-ui.md](chenghua-ui.md)       |
| `shijingshan` | 石景山 AI 产业服务平台 | [shijingshan-ui.md](shijingshan-ui.md) |

## 组件用法

优先通过组件的 `theme` 属性应用主题：

```vue
<s-button theme="shijingshan" type="primary">保存</s-button>
<s-card theme="shijingshan" title="审核规则管理"></s-card>
<s-title theme="shijingshan" title="企业经营数据" />
```

## 落地原则

- 先检查目标项目是否已有主题 token、主题样式文件或全局主题切换逻辑。
- 优先使用组件库已有主题能力，不在业务页面重复硬编码主题色。
- 页面背景、卡片、按钮、标签、标题、图表色要一起调整，避免只改按钮颜色。
- 主题示例和文档要展示属性名、可选值、默认值。
- 新增 `theme="chenghua"` 的组件文档时，侧边栏星号规则也要同步更新。
- 移动端和桌面端都要检查文字是否溢出、按钮是否挤压、内容是否重叠。
