---
outline: 2
---

# 项目使用组件常见问题

这里汇总业务项目使用 `sybz-components` 时的常见问题和推荐写法。

## 1. 如何在保留公司主题规范的同时快速修改主题色？

`chenghua` 和 `shijingshan` 主题已经包含符合公司规范的组件布局、圆角和交互样式。如果项目只需要替换品牌色，在注册组件库时同时配置 `theme` 和 `themeColors` 即可，不需要在业务页面重写组件样式。

### 基于 shijingshan 主题修改颜色

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SybzComponents from 'sybz-components'
import 'sybz-components/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(SybzComponents, {
  theme: 'shijingshan',
  themeColors: {
    primary: '#7c3aed',
    accent: '#ec4899',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#dc2626',
  },
})

app.mount('#app')
```

`theme` 的可选值是 `default`、`chenghua` 和 `shijingshan`，默认值是 `default`。快速换色时将它设置为 `chenghua` 或 `shijingshan`，表示继续使用对应的公司主题规范。

`themeColors` 的默认值是未配置，常用属性如下：

| 属性      | 说明   | 默认值               |
| --------- | ------ | -------------------- |
| `primary` | 主色   | 对应主题的内置主色   |
| `accent`  | 强调色 | 对应主题的内置强调色 |
| `success` | 成功色 | 对应主题的内置成功色 |
| `warning` | 警告色 | 对应主题的内置警告色 |
| `danger`  | 危险色 | 对应主题的内置危险色 |
| `info`    | 信息色 | 对应主题的内置信息色 |

只需要填写项目要替换的颜色。未填写的属性继续使用对应主题的默认值。`primary` 和 `accent` 使用十六进制或 `rgb(...)` 颜色时，组件库会自动生成 hover、active 和透明度相关的颜色值。

### 同时配置两套主题颜色

如果同一个项目会切换两套主题，可以使用嵌套配置：

```ts
app.use(SybzComponents, {
  theme: 'chenghua',
  themeColors: {
    chenghua: {
      primary: '#165dff',
      accent: '#00c5e7',
    },
    shijingshan: {
      primary: '#2a6df4',
      accent: '#f5a623',
    },
  },
})
```

### 运行时修改或恢复主题色

```ts
import { resetSybzThemeColors, setSybzThemeColors } from 'sybz-components'

setSybzThemeColors('chenghua', {
  primary: '#7c3aed',
  accent: '#06b6d4',
})

// 恢复成华主题的内置颜色
resetSybzThemeColors('chenghua')
```

`setSybzThemeColors` 的 `theme` 可选值是 `chenghua` 和 `shijingshan`，没有默认值；`colors` 没有默认值，只需传入本次要替换的颜色。`resetSybzThemeColors` 会移除运行时设置的颜色，恢复对应主题的内置值。
