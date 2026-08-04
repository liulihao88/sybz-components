---
name: sybz-sidebar-star
description: >-
  Use this skill when marking selected sybz-components sidebar items with a
  prominent red rounded star badge before the item text.
metadata:
  short-description: Mark selected sidebar items with a red star
---

# sybz-sidebar-star

## 展示要求

1. 在左侧侧边栏指定条目前添加醒目的红色星号标志。
2. 星号放在文字前面。
3. 星号样式要圆润、醒目、好看。
4. 只给下面列出的函数、组件或指令添加星号，不要标记其他条目。

## 标记范围

标记范围需要和 `docs/.vitepress/config.ts` 中使用 `sybzMark(...)` 的侧边栏条目保持一致。凡是组件已经支持并展示 `theme="chenghua"` 成华主题，都需要在侧边栏加星号。
