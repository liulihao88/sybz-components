<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { processWidth, formatThousands, formatToFixed, formatBytes } from '@sybz-components/utils'

defineOptions({
  name: 'SItem',
})
interface ItemProps {
  src?: string
  label: string | number
  value: string | number
  width?: string | number
  height?: string | number
  labelStyle?: Record<string, any>
  valueStyle?: Record<string, any>
  itemStyle?: Record<string, any>
  imgStyle?: Record<string, any>
  boxStyle?: Record<string, any>
  type?: '' | 'value'
  attrs?: Record<string, any>
}

const props = withDefaults(defineProps<ItemProps>(), {
  src: '',
  // default: 'https://img.yzcdn.cn/vant/logo.png',
  width: '',
  height: '',
  labelStyle: () => ({}),
  valueStyle: () => ({}),
  itemStyle: () => ({}),
  imgStyle: () => ({}),
  boxStyle: () => ({}),
  type: '', // 不传时为 ''
  attrs: () => ({}),
})
defineSlots<{
  img?: () => any
  label?: () => any
  value?: () => any
}>()
const slots = useSlots()
const hasImgSlot = !!slots.img // 判断是否使用了 img 插槽

const parseValue = computed(() => {
  let { value, attrs } = props
  let finalValue = value
  if (attrs?.formatBytes) {
    finalValue = formatBytes(finalValue)
  }
  if (attrs?.toFixed) {
    finalValue = formatToFixed(finalValue, attrs.toFixed === true ? 2 : attrs.toFixed)
  }
  if (attrs?.formatThousands) {
    finalValue = formatThousands(finalValue)
  }

  return finalValue
})
</script>

<template>
  <div
    v-if="props.type === ''"
    class="s-item-box"
    :style="{ ...{ height: processWidth(props.height, true) }, ...processWidth(props.width), ...boxStyle }"
  >
    <div class="s-item-box__img" :style="props.imgStyle">
      <slot name="img">
        <img :src="props.src" alt="" />
      </slot>
    </div>
    <div class="s-item-box__right" :style="props.itemStyle">
      <div class="s-item_box__label" :style="props.labelStyle">
        <slot name="label">
          {{ props.label }}
        </slot>
      </div>
      <div class="s-item_box__value" :style="props.valueStyle">
        <slot name="value">
          {{ parseValue }}
        </slot>
      </div>
    </div>
  </div>
  <div
    v-else-if="props.type === 'value'"
    class="s-item-box__value"
    :style="{ ...{ height: processWidth(props.height, true) }, ...processWidth(props.width), ...boxStyle }"
  >
    <div class="o_item_box_value_item" :class="{ o_item_box_value_item_center: props.attrs?.center === true }">
      <div class="s-item_box__value__value" :style="props.valueStyle">
        <slot name="value">
          {{ parseValue }}
        </slot>
      </div>
      <div class="s-item_box__label__value" :style="props.labelStyle">
        <slot name="label">
          {{ props.label }}
        </slot>
      </div>
    </div>
    <div class="s-item-box__img__value" :style="props.imgStyle">
      <slot name="img">
        <img :src="props.src" alt="" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-item-box {
  background-color: var(--el-bg-color);
  padding: 16px;
  border-radius: 4px;
  color: var(--85);
  display: flex;
  height: 100px;
  align-items: center;
  font-size: 18px;
  justify-content: v-bind('props.src || hasImgSlot ? "space-between" : "center"');
  // justify-content: center;
  .s-item-box__img {
    height: 100%;
    margin-right: 8px;
    :deep(img) {
      height: 100%;
    }
  }
  .s-item-box__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    .s-item_box__label {
      color: var(--45);
      font-size: 17px;
      font-weight: 600;
    }
    .s-item_box__value {
      font-weight: 700;
    }
  }
}

.s-item-box__value {
  background-color: var(--el-bg-color);
  padding: 16px;
  border-radius: 4px;
  color: var(--85);
  display: flex;
  flex-direction: column;
  height: 100px;
  font-size: 18px;
  justify-content: v-bind('props.src || hasImgSlot ? "space-between" : "center"');
  // justify-content: center;
  .s-item-box__img__value {
    height: 100%;
    margin-right: 8px;
    :deep(img) {
      height: 100%;
    }
  }
  .o_item_box_value_item {
    .s-item_box__label__value {
      color: var(--45);
      font-size: 14px;
      font-weight: 500;
    }
    .s-item_box__value__value {
      font-weight: 700;
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
  .o_item_box_value_item_center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
