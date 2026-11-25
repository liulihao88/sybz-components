# Codex 项目规则

## UI 规范

- 所有的主题示例, 都要放到基础用法和其他用法示例后面
- 改过的代码, 不要自动build或docsbuild, 因为本来就可以直接看到效果
- 每个对应的示例, 要把示例所要展示的属性名称, 还有都有哪些值, 默认值都显示出来, 但只写在示例标题或一行简短说明里, 不要展开成长篇属性介绍
- 每次组件新增的theme="chenghua", 要保证星号也跟着加入
- 示例如果有默认值, 把默认值加在示例顶部的title里, 简单用法用一句话说明即可, 不要在示例前后再写长篇介绍
- 示例保持简洁: 每个示例只保留一句必要的用法/说明, 禁止堆砌属性罗列、实现细节或重复解释; 以后修改某个组件的代码时, 顺手删除该组件对应示例后面的说明文字, 不要保留、扩写或新增说明
- 每个组件顶部, 都有一个基础用法, 并且有可复制的小icon, 用公共方法写

## TS 规范

- 公共组件, 要支持鼠标移入组件, 先显示当前组件的属性提示, 然后再显示element-plus的属性提示
- 组件的属性如果变更, 对应的ts, md文档, 测试代码都要跟着变
- 每次修改组件的属性、事件、插槽或其他对外用法时, 必须同时修改 `scripts/generate-component-types.mjs` 中对应组件的生成配置, 确保生成后的 `.d.ts` 与组件实现、类型声明和文档保持一致. 禁止只手动修改生成产物 `.d.ts` 而遗漏生成器

## 生成测试文件规范

- 禁止主动为任何组件新建 `*.spec.*`、`*.test.*` 或 `__tests__` 下的组件测试文件, 也不要因为新增或修改组件功能而自动生成组件测试文件
- 如果组件已有测试用例, 下次直接删除, 不要再维护组件的测试用例

## 生成示例规范

除其他用法外, 新生成的独立示例放在示例区最后一位、属性表之前。

- 其他用法只能放在基础用法的下面, 在 `home.md` 中写成 `::: other`。
- 单独展示一个简单属性时, 不要为它新建独立示例文件或独立 demo. 统一放进该组件的 `other.vue` 汇总示例; 已有 `other.vue` 就直接扩充, 没有时再创建. 如果项目中已经有 `usually.vue`, 就改名为 `other.vue`。
- `other.vue` 尽量参考 `docs/components/flex/other.vue` 的简洁写法: 在 `<script setup>` 中用一个 `ref` 对象保存待切换的属性, 用 `s-radio` 直接绑定对象属性, 用 `v-bind` 把对象传给同一个组件。选项直接写在模板里, 能不用额外的 `computed`、转换函数和配置数组就不用。属性名、可选值和默认值只在标题或一行说明中交代。
- 只有属性需要独立场景、较多配套代码或组合交互, 放进 `other.vue` 会影响理解时, 才新增单独示例。
- 生成的示例代码, 不允许再用原生select等等, 尤其是有多个选项的示例, 要用s-radio

`other.vue` 优先采用下面的结构, 保持示例简洁:

```vue
<script setup lang="ts">
import { ref } from 'vue'
const flexProps = ref({
  column: false,
  wrap: 'nowrap',
})
</script>

<template>
  <s-flex gap column>
    <s-radio v-model="flexProps.column" size="small" variant="button" simple :options="[true, false]" title="column" />
    <s-radio
      v-model="flexProps.wrap"
      :options="['wrap', 'nowrap', 'wrap-reverse']"
      simple
      title="wrap"
      size="small"
      variant="button"
    />
  </s-flex>
  <s-flex v-bind="flexProps">
    <div>1</div>
    <div>2</div>
  </s-flex>
</template>
```
