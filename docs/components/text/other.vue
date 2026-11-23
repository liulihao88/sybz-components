<script setup lang="ts">
import { ref } from 'vue'

const type = ref('default')
const color = ref('')
const gradient = ref('')
const shorthandColor = ref('')
const component = ref('span')
const code = ref(false)
const codeType = ref('')
const lineClamp = ref(0)
const cursor = ref<string | boolean>(false)
const fontSize = ref<number | ''>('')
const fontWeight = ref('')
const decoration = ref('none')
const unselectable = ref(false)
const disabled = ref(false)
const link = ref(false)
const clickCount = ref(0)
const dangerouslyUseHTMLString = ref(true)
const text =
  '这是一段用于展示 s-text 的较长文字。可以切换语义色、常用颜色、根元素、字号、字重和显示行数，观察文本在有限宽度内的换行与省略效果。'
const richText =
  '普通文字<br><s-tag type="danger">危险标签</s-tag><br><strong>加粗文字</strong> <s-button type="primary">我是按钮</s-button> <el-button type="primary">我是按钮</el-button> '
</script>

<template>
  <s-flex direction="column" gap="0">
    <s-radio
      v-model="type"
      title="type（默认 default）"
      :options="['default', 'primary', 'success', 'warning', 'danger', 'error', 'info']"
      type="simple"
    />
    <s-radio
      v-model="color"
      title="color（默认不设置；选不设置后 type 才会生效）"
      :options="[
        { label: '不设置', value: '' },
        'main',
        'default',
        'secondary',
        'disabled',
        'placeholder',
        'white',
        'black',
        'blue',
        'red',
        'green',
        'yellow',
      ]"
      type="simple"
    />
    <s-radio
      v-model="gradient"
      title="gradient（默认不设置，优先于 type / color / c）"
      :options="[
        { label: '不设置', value: '' },
        { label: '红到蓝', value: 'linear-gradient(90deg, red, blue)' },
        { label: '蓝到绿', value: 'linear-gradient(90deg, blue, green)' },
      ]"
    />
    <!-- <s-radio
      v-model="shorthandColor"
      title="c（默认不设置，优先于 color 和 type）"
      :options="[{ label: '不设置', value: '' }, 'main', 'default', 'secondary', 'disabled', 'red']"
    /> -->
    <s-radio
      v-model="component"
      title="component（默认 span；code 开启时默认 code，此处选择不生效）"
      :options="['span', 'p', 'div', 'strong', 'small']"
      type="simple"
    />
    <s-radio v-model="code" title="code（默认 false；开启后使用代码片段样式）" type="boolean" />
    <s-radio
      v-model="codeType"
      title="type（code 开启时生效；默认不设置)"
      :options="[{ label: '不设置', value: '' }, 'primary', 'success', 'warning', 'danger', 'error', 'info']"
      type="simple"
    />
    <s-radio v-model="lineClamp" title="lineClamp（默认 0）" :options="[0, 1, 2, 3]" type="simple" />
    <s-radio
      v-model="cursor"
      title="cursor（默认不设置；true 为 pointer，false 不设置）"
      :options="[
        { label: 'false（不设置）', value: false },
        { label: 'true（pointer）', value: true },
        'auto',
        'pointer',
        'default',
        'help',
        'not-allowed',
      ]"
      type="simple"
    />
    <s-radio
      v-model="decoration"
      title="装饰（默认 none）"
      :options="['none', 'italic', 'underline', 'delete', 'mark']"
      type="simple"
    />
    <s-radio v-model="unselectable" title="unselectable（默认 false）" type="boolean" />
    <s-radio v-model="disabled" title="disabled（true / false，默认 false）" type="boolean" />
    <s-radio v-model="link" title="link（true / false，默认 false）" type="boolean" />
    <s-radio
      v-model="dangerouslyUseHTMLString"
      title="dangerouslyUseHTMLString（true / false，默认 true）"
      type="boolean"
    />
    <s-text
      :type="code ? codeType || 'default' : type"
      :c="color || undefined"
      :gradient="gradient || undefined"
      :component="code ? undefined : component"
      :code="code"
      :line-clamp="lineClamp"
      :cursor="cursor"
      :italic="decoration === 'italic'"
      :td="decoration === 'underline' ? 'underline' : decoration === 'delete' ? 'line-through' : undefined"
      :mark="decoration === 'mark'"
      :unselectable="unselectable"
      :disabled="disabled"
      :link="link"
      :dangerouslyUseHTMLString="dangerouslyUseHTMLString"
      w="280px"
      :title="text"
      @click="clickCount++"
    >
      {{ richText }}
    </s-text>
    <span>点击次数：{{ clickCount }}（disabled 为 true 时不增加）</span>
  </s-flex>
</template>
