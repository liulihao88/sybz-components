# 成华 UI（规范 v1.0）

用于成华区 AI 产业服务平台页面。气质：清爽、可信、AI 服务、白/浅底蓝色重点；渐变仅用于 banner、关键入口/数据。

## Token

```css
:root {
  --ch-primary: #165dff;
  --ch-accent-start: #1e6efc;
  --ch-accent-end: #00c5e7;
  --ch-text-title: #000;
  --ch-text-body: #000;
  --ch-text-secondary: #979797;
  --ch-radius-button: 8px;
  --ch-radius-card: 12px;
  --ch-space-xs: 8px;
  --ch-space-sm: 16px;
  --ch-space-md: 24px;
  --ch-space-lg: 32px;
  --ch-font-ui: 'PingFang SC', sans-serif;
  --ch-font-number: 'Roboto Mono', monospace;
}
```

## 尺寸

| 项目                      | Web（基准 1280）             | 移动端（基准 375） |
| ------------------------- | ---------------------------- | ------------------ |
| 主标题                    | 36/40px, 600, 1.4            | 28px, 600, 1.4     |
| 模块标题                  | 20px, 500, 1.5               | 同左               |
| 正文大/小                 | 16px/14px, 400, 1.6/1.5      | 16px/14或12px, 400 |
| 数字指标                  | 24px, 600, 1.4, Roboto Mono  | 同左               |
| 按钮文字                  | 16或14px, 500                | 16px, 500          |
| 图标：功能/指标/推荐/头像 | 16–24/20或64/40、42或48/32px | 24/20/48/40px      |

- 主按钮：`44px` 高、`8px` 圆角、水平 `20px`、字 `16px`；次按钮：`36px`、`8px`、水平 `16px`、字 `14px`；文字按钮：自适应高、0 圆角、水平 `8px`、字 `14px`。状态清晰，图文距 `8px`。
- 移动卡片参考：数据 `280×120`/padding 20；服务 `280×100`/16；推荐 `280×140`/20。均圆角 12、轻阴影。Web 自适应，padding 16/20，工具页克制。
- 间距按 8px 网格：模块 32、卡片 24、内容 16、小间距 8。用最大宽度容器、Flex/Grid 和断点，不按视口缩放字体。
- 优先现有组件/token；至少检查 375px 与常见桌面宽度，避免溢出、遮挡、错位。
