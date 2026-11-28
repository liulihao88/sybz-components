# Menu 菜单组件

[Element Plus Menu Documentation](https://element-plus.org/zh-CN/component/menu.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<SMenu v-model="active" :header="header" :options="menus" />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`defaultOpenAll` 默认值 `true`）

:::demo 传入 `header` 的 `icon / title / subtitle` 即可显示内置头部样式；示例使用 `computed` 配置头尾点击回调和样式，折叠后悬浮头部可见自定义内容；同时支持任意层级递归菜单、路由跳转和图标，并默认展开全部父级。基础写法：`<SMenu v-model="active" :header="header" :footer="footer" :options="menus" />`。属性：`header` 类型 `SMenuHeaderConfig`，默认值 `undefined`；`options` 类型 `SMenuItem[]`，默认值 `[]`；`router` 可选值 `true / false`，默认值 `true`；`defaultOpenAll` 可选值 `true / false`，默认值 `true`；`width` 类型 `string / number`，默认值 `256`；`height` 类型 `string / number`，默认值 `100%`。
menu/base
:::

### 浅色分组菜单（`variant` 默认值 `dark`）

:::demo `variant="light"` 为白色背景，任意 `theme` 都保持浅色外观。通过 `#append` 在头部添加按钮，直接用 `@click` 绑定处理函数。基础写法：`<SMenu variant="light" :options="menus" :header="header" :footer="footer"><template #append><SButton @click="handleNewChat">新建对话</SButton></template></SMenu>`。属性：`variant` 可选值 `dark / light`，默认值 `dark`；`header / footer` 默认值均为 `undefined`；`append` 插槽默认无内容；菜单项 `type` 可选值 `item / group`，默认值 `item`；`tag / tagColor / suffixIcon / detail` 默认值均为 `undefined`。
menu/light
:::

### 主题与明暗外观（`theme` 默认值 `default`，`variant` 默认值 `dark`）

:::demo 用按钮切换 `theme` 和 `variant`，查看两者的全部组合。`variant="light"` 始终为白色背景，`variant="dark"` 始终为深色背景；`theme` 只切换强调色。收起后，含子菜单的项目隐藏展开箭头并在左侧显示竖杠；选中子菜单时，竖杠与父级图标使用主题强调色。基础写法：`<SMenu :theme="theme" :variant="variant" :header="header" :options="menus" />`。属性：`theme` 可选值 `default / chenghua / shijingshan / sybz / gulou`，默认值 `default`；`variant` 可选值 `dark / light`，默认值 `dark`。示例进入页面时的 `theme` 跟随右上角主题，`variant` 初始值为 `light`，并选中一个子菜单；在示例内切换主题不会改变右上角。
menu/theme
:::

### 全部展示（`autoHeight` 默认值 `false`）

:::demo 开启后，展开状态保持菜单列表容器上下左右 `16px` padding，收起状态改为 `4px`；根据可用高度等比压缩菜单项高度、间距、图标和字号，不产生组件内部滚动条。基础写法：`<SMenu auto-height height="420px" :options="menus" />`。属性：`autoHeight` 可选值 `true / false`，默认值 `false`；`height` 类型 `string / number`，默认值 `100%`，用于确定自适应的高度边界。
menu/autoHeight
:::

### 禁止收缩与头部追加内容（`collapsible` 默认值 `true`）

:::demo 设置 `collapsible="false"` 后菜单保持展开，切换按钮不显示；通过 `#append` 在头部内容之后追加元素，并在按钮上绑定点击处理函数。基础写法：`<SMenu :collapsible="false" :header="header" :options="menus"><template #append><SButton @click="handleCreate">新建内容</SButton></template></SMenu>`。属性：`collapsible` 可选值 `true / false`，默认值 `true`；`collapse` 可选值 `true / false`，默认值 `false`，需要双向绑定时使用 `v-model:collapse`；`header` 默认值 `undefined`；`append` 插槽默认无内容。
menu/append
:::

### 菜单下方自定义内容（`default` 插槽，默认无内容）

:::demo 顶部 `options` 只放导航项，项目/最近列表放默认插槽，头部用 `#header` + `#append`，底部账号栏用 `#footer`；内容随菜单区域滚动，头尾固定。基础写法：`<SMenu :options="menus"><template #default>...</template></SMenu>`。
menu/custom
:::

### 尺寸配置与悬停展开（`size` 默认值 `default`，`expandOnHover` 默认值 `true`）

:::demo `size` 可传预设，也可传对象精细设置 `fontSize / height / width / lineHeight / padding / levelPadding / margin / iconSize / listPadding`；`expandOnHover` 开启后，收起状态鼠标移入临时展开为完整菜单，展开宽度不挤占布局。基础写法：`<SMenu v-model:collapse="collapsed" :size="size" :expand-on-hover="expandOnHover" :options="menus" />`。属性：`size` 可选值 `small / default / large` 或配置对象，默认值 `default`；`expandOnHover` 可选值 `true / false`，默认值 `true`。
menu/other
:::

### API

| 属性名            | 说明                                                                  | 类型                                   | 可选值                                            | 默认值      |
| ----------------- | --------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- | ----------- |
| `modelValue`      | 当前激活菜单的 index/path                                             | string                                 | -                                                 | `''`        |
| `options`         | 菜单配置，children 可循环嵌套                                         | `SMenuItem[]`                          | -                                                 | `[]`        |
| `fieldNames`      | 自定义数据字段名                                                      | `SMenuFieldNames`                      | -                                                 | `{}`        |
| `router`          | 点击菜单时启用 Vue Router 跳转                                        | boolean                                | `true / false`                                    | `true`      |
| `defaultOpenAll`  | 默认展开所有含 children 的菜单                                        | boolean                                | `true / false`                                    | `true`      |
| `defaultOpeneds`  | 额外指定默认展开项                                                    | string[]                               | -                                                 | `[]`        |
| `width`           | 菜单宽度，数字按 px 处理                                              | string / number                        | -                                                 | `256`       |
| `height`          | 菜单高度，数字按 px 处理                                              | string / number                        | -                                                 | `100%`      |
| `size`            | 菜单尺寸：预设或对象配置字号、宽高、行高、内边距和图标                | `SybzComponentSize \| SMenuSizeConfig` | `small / default / large` 或配置对象              | `default`   |
| `autoHeight`      | 是否按可用高度自适应缩放菜单项                                        | boolean                                | `true / false`                                    | `false`     |
| `backgroundColor` | 深色模式背景色                                                        | string                                 | CSS 颜色                                          | `#1d293b`   |
| `textColor`       | 深色模式文字颜色                                                      | string                                 | CSS 颜色                                          | `#cbd5e1`   |
| `activeTextColor` | 深色模式激活文字颜色                                                  | string                                 | CSS 颜色                                          | `#ffffff`   |
| `collapse`        | 是否折叠菜单，支持 `v-model:collapse`；收起后列表 padding 为 4px      | boolean                                | `true / false`                                    | `false`     |
| `collapsible`     | 是否允许收起；关闭后保持展开并隐藏切换按钮                            | boolean                                | `true / false`                                    | `true`      |
| `expandOnHover`   | 收起后鼠标移入是否临时悬浮展开；展开宽度不挤占布局，移出恢复收起      | boolean                                | `true / false`                                    | `true`      |
| `variant`         | 明暗外观：light 固定白色背景，dark 使用深色背景；仅颜色不同，尺寸一致 | string                                 | `dark / light`                                    | `dark`      |
| `theme`           | 主题强调色，不改变明暗外观                                            | string                                 | `default / chenghua / shijingshan / sybz / gulou` | `default`   |
| `header`          | 内置头部配置，可传点击回调、class/style 和折叠悬浮文案                | `SMenuHeaderConfig`                    | -                                                 | `undefined` |
| `headerConfig`    | `header` 的兼容属性，已废弃                                           | `SMenuHeaderConfig`                    | -                                                 | `undefined` |
| `footer`          | 内置底部账号配置，可传点击回调和 class/style                          | `SMenuFooterConfig`                    | -                                                 | `undefined` |

深色与浅色只切换颜色，尺寸一致；`size` 默认 56px 高 / 16px 字 / 4px 间距。`size` 传对象时支持 `fontSize / height / width / lineHeight / padding / levelPadding / margin / iconSize / listPadding`，数字按 px 处理；`padding` 取左右方向的值，子级默认按 `padding` 缩进。`small` 预设为 40px 高 / 14px 字 / 12px 内边距，`large` 预设为 64px 高 / 18px 字 / 24px 内边距。

头部和底部区域的四边内边距始终为 `16px`；菜单列表默认展开时为 `16px`，可通过 `size` 的 `listPadding` 调整，收起时固定为 `4px`。自定义头尾插槽同样位于头尾区域的内边距内。`header`、`headerConfig`、`footer` 可直接传 Vue `computed`，在模板中会自动解包并随依赖更新。`header` 和 `footer` 配置支持 `handler(event)`、`class`、`style`。`#append` 中的按钮可直接绑定 `@click` 处理函数。折叠后悬浮在内置头部会显示 `title`，可通过 `collapsedTooltip` 自定义。默认值：`handler / class / style / collapsedTooltip` 均为 `undefined`。

`SMenuItem` 默认字段为 `index / path / title / icon / children / disabled / route`。`index` 优先于 `path`；`icon / suffixIcon` 可传 Element Plus 图标名称字符串或 Vue 图标组件。`type="group"` 用于分组标题；`tag / tagColor` 用于菜单标签；`detail` 配置 `tag / title / description` 后，鼠标移入会显示详情卡片。其余 Element Plus Menu 属性和事件会透传。

菜单收起时，顶层单项可通过悬浮提示查看详情；多级菜单弹层已经展示了文字，弹层内的菜单项不再重复显示提示。

开启 `expandOnHover`（默认 `true`）后，收起状态下鼠标移入会临时展开为完整菜单，展开宽度用负外边距抵消、始终按收起宽度占位，并悬浮在页面内容上方；移出后恢复收起。设为 `false` 时保留收起态的菜单项 hover 高亮，不再自动展开。

切换选中项时，背景色与浅色模式的左侧标记会平滑过渡；收缩时文字先淡出，再切换为图标栏；展开时宽度先展开，文字随后淡入，避免菜单项被挤压。二级菜单展开约 200ms；收起状态下悬浮子菜单默认 100ms 展开、150ms 收起，可通过 `show-timeout` / `hide-timeout` 覆盖。系统开启“减少动态效果”时，菜单会缩短这些动画。

### 事件

| 事件名              | 说明                                     | 参数                                     |
| ------------------- | ---------------------------------------- | ---------------------------------------- |
| `update:modelValue` | 选择菜单后更新激活值                     | `(index: string)`                        |
| `update:collapse`   | 点击右侧按钮切换菜单折叠状态             | `(collapse: boolean)`                    |
| `select`            | 选择菜单时触发，参数与 Element Plus 一致 | `(index, indexPath, item, routerResult)` |

### 插槽

| 插槽名    | 说明                                         |
| --------- | -------------------------------------------- |
| `default` | 菜单列表下方的自定义内容，随菜单区域一起滚动 |
| `header`  | 菜单顶部品牌或自定义内容                     |
| `append`  | 在头部内容后追加元素                         |
| `footer`  | 菜单底部操作或自定义内容                     |

默认插槽内容与菜单项共用滚动区域，适合放项目、最近记录等；菜单收起时该区域隐藏。`autoHeight` 只压缩菜单项，自定义内容仍正常滚动。自定义 `#header` / `#footer` 内容不会自动折叠，需在收起状态隐藏文字和按钮，可参考示例中的 `.s-menu.is-collapse` / `.is-expanding` 样式。

### 宽高布尔写法

`w` / `width` 裸写或传入 `true` 表示宽度 `100%`；`h` / `height` 裸写或传入 `true` 表示高度 `100%`。传入 `false` 表示不设置该尺寸；也可传数字或 CSS 长度。未传时沿用组件属性表中的默认值。百分比高度需要父容器有明确高度。
