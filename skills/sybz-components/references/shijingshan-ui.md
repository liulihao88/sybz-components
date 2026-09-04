# 石景山 UI

来源：`public/石景山AI产业服务平台设计规范(2).pdf`。用于石景山 AI 产业服务平台；清爽、可信、数据化，浅底白卡、蓝色重点、深蓝灰导航。移动基准 430px（@2x 标注直接用）；Web 设计稿 1920×1080@2x，通常 `1 CSS px = 2 设计稿 px`。

## Token

```css
:root {
  --sjs-primary: #2a6df4;
  --sjs-success: #10b981;
  --sjs-warning: #f59e0b;
  --sjs-danger: #ef4444;
  --sjs-mobile-accent: #f5a623;
  --sjs-bg-mobile: #f8f9fa;
  --sjs-bg-web: #f9fafb;
  --sjs-card-bg: #fff;
  --sjs-nav-bg: #1e293b;
  --sjs-text-primary: #1e1e1e;
  --sjs-text-secondary: #4b5563;
  --sjs-text-secondary-mobile: #6b7280;
  --sjs-text-assist: #9ca3af;
  --sjs-border-mobile: #eef2f6;
  --sjs-border-web: #e5e7eb;
  --sjs-tag-bg-mobile: #f2f4f7;
  --sjs-tag-bg-web: #f1f5f9;
  --sjs-tag-text-mobile: #374151;
  --sjs-tag-text-web: #334155;
  --sjs-radius-card: 12px;
  --sjs-radius-button: 8px;
  --sjs-radius-tag: 4px;
  --sjs-space-xs: 4px;
  --sjs-space-sm: 8px;
  --sjs-space-md: 12px;
  --sjs-space-lg: 16px;
  --sjs-space-xl: 24px;
  --sjs-shadow-card: 0 2px 8px rgba(0, 0, 0, 0.05);
  --sjs-font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
```

移动额外：下降 `#F43F5E`。字体 iOS SF Pro、Android Roboto；Web 用 token 字体。

## 基础尺寸

| 项目                           | 移动                            | Web CSS              |
| ------------------------------ | ------------------------------- | -------------------- |
| 大标题/标题1/标题2             | 22/18/16px, 600, 28/24/22px     | 24/18/16px, 600, 1.4 |
| 正文/辅助                      | 14/12px, 400, 20/16px           | 14/12px, 400, 1.5    |
| 数据/按钮字                    | 20–28px,600,1.2 / 16px,500,24px | 24或28px / 16px,500  |
| 页面边距/卡片 padding/卡片间距 | 16/16/12px                      | 24/16/12px           |
| 标题-内容/列表项/图文距        | 8/12/6px                        | 同左                 |
| 标签 padding/按钮 padding      | 8×4 / 16×12px                   | 8×4 / 16×8px         |

统一：卡片圆角 12、阴影 token；按钮/输入 8；标签/图表柱 4。

## 布局与组件

- 移动：内容约 398px，Flex/Grid 固定间距。Web：导航 240px（收缩 40px）、100vh；主区自适应、背景 `#f9fafb`、padding `24px 12px`；内容最大 720px；24 栅格、边距 24、gutter 16；小于 1440px 可减边距/列数。
- 按钮：主/次移动高 44、Web 40，圆角 8、字 16/500；主蓝白无边，次白/透明蓝字蓝边；文字按钮 14/400。
- 标签：高 24、水平 padding 8、圆角 4、字 12/500，颜色用对应 token；图标移动 16、Web 12，间距 4。
- 卡片：白底、padding 16、内容距 12；Web 标题 18/600，“查看更多”14/400 主色。
- 移动列表项高 48–56，分割线左右留 16；表格行高 40。Web 表格行高 40、字 14、表头 500/背景色、水平 padding 8、底边框；可选斑马纹。经营数据两列，值 600，Web 行高 28。
- 图表：主蓝；柱圆角 4（移动高 4–8，Web 12–20）；折线宽 2、点径 6；Web 环图直径 80/线宽 8；控制色彩数量。
- 移动页标题 22/600 + 可选 24 图标/14 描述；板块标题 18/600 + 14 主色链接。Web 导航 padding `12px 8px`，Logo 高 40，菜单高 32/padding `8px 4px`/圆角4，字14/图标16，选中 `#2a6df4` 或 `#334155`。
- 智能体网格：移动每行4、gap16、图标40/48、字12；Web 每行6–8、图标32、水平12/垂直16。
- 指标卡：padding12；名称14常规，值移动20–28/Web28、600，变化率12（升绿降红），Web 去年对比12辅助色。
- 资讯：标题14/600、描述/时间12/400；缩略图40、圆角4；分割线用平台 token。

## 落地

优先已有主题文件/token；背景浅灰、白卡承载，蓝色仅关键交互/选中/图表/链接，语义色按含义使用，阴影克制。数据页保持密度和可扫描性。至少检查 430px、375px 与常见桌面宽度，避免溢出、遮挡及导航/栅格/表格错位。
