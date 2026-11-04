<script setup lang="ts">
import { ref } from 'vue'

const type = ref('default')
const color = ref('')
const gradient = ref('')
const shorthandColor = ref('')
const component = ref('span')
const lineClamp = ref(0)
const fontSize = ref<number | ''>('')
const fontWeight = ref('')
const decoration = ref('none')
const unselectable = ref(false)
const text =
  '这是一段用于展示 s-text 的较长文字。可以切换语义色、常用颜色、根元素、字号、字重和显示行数，观察文本在有限宽度内的换行与省略效果。'
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
      title="component（默认 span）"
      :options="['span', 'p', 'div', 'strong', 'small']"
      type="simple"
    />
    <s-radio v-model="lineClamp" title="lineClamp（默认 0）" :options="[0, 1, 2, 3]" type="simple" />
    <s-radio
      v-model="decoration"
      title="装饰（默认 none）"
      :options="['none', 'italic', 'underline', 'delete', 'mark']"
      type="simple"
    />
    <s-radio v-model="unselectable" title="unselectable（默认 false）" type="boolean" />
    <s-text
      :type="type"
      :c="color || undefined"
      :gradient="gradient || undefined"
      :component="component"
      :line-clamp="lineClamp"
      :italic="decoration === 'italic'"
      :td="decoration === 'underline' ? 'underline' : decoration === 'delete' ? 'line-through' : undefined"
      :mark="decoration === 'mark'"
      :unselectable="unselectable"
      w="280px"
      :title="text"
    >
      {{ text }}
    </s-text>
  </s-flex>
</template>
