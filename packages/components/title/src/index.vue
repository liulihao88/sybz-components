<template>
  <div
    class="s-title"
    :class="titleClass"
    :style="{ ...margin, height: processWidth(mergedProps.height, true) }"
    v-bind="$attrs"
  >
    <div class="s-title__top" :class="parseClass">
      <div class="s-title__main" :style="{ marginLeft: mergedProps.inner ? '8px' : 0 }">
        <span :class="($slots.icon || mergedProps.type === 'icon') && 's-title__slot-icon-wrapper'">
          <slot name="icon" class="icon_slot">
            <span
              v-if="mergedProps.theme === 'chenghua' && mergedProps.type === 'icon'"
              class="s-title__chenghua-icon"
              aria-hidden="true"
            ></span>
            <svg
              v-else-if="mergedProps.type === 'icon'"
              class="s-title__default-icon"
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M800.512 474.944h-377.6a24.256 24.256 0 0 0-24.32 24.32c0 13.504 10.816 24.32 24.32 24.32h377.6c13.504 0 24.32-10.816 24.32-24.32a24.576 24.576 0 0 0-24.32-24.32z m-377.6 203.776a24.256 24.256 0 0 0-24.32 24.32c0 13.504 10.816 24.32 24.32 24.32h377.6c13.504 0 24.32-10.816 24.32-24.32a24.576 24.576 0 0 0-24.32-24.32h-377.6z"
              />
              <path
                fill="currentColor"
                d="M928.064 209.6h-252.736l-5.376-15.68c-37.824-104.832-110.272-129.728-164.288-132.416h-409.728a62.592 62.592 0 0 0-62.72 62.144v776.704c0 34.048 28.096 62.144 62.72 62.144h832.128a62.72 62.72 0 0 0 62.72-62.144v-628.608a62.272 62.272 0 0 0-62.72-62.144z m-848.384-56.256c0-48.128 17.856-41.6 90.816-41.6h261.056c110.784 0 139.456 23.808 160.512 61.056l15.68 36.736h-528.064v-56.192z m773.248 759.424H170.496c-74.56 0-86.464-5.952-86.464-85.952v-566.464h784.576c78.912 0 70.784 30.784 70.784 85.952v492.928c0.064 72.448-25.344 73.536-86.464 73.536z"
              />
              <path
                fill="currentColor"
                d="M196.992 536.576h78.912v-78.912h-78.912v78.912z m0 205.952h78.912v-78.912h-78.912v78.912z"
              />
            </svg>
          </slot>
        </span>
        <span class="title-text">
          <slot name="title">
            {{ mergedProps.title }}
          </slot>
        </span>
        <slot></slot>
      </div>
      <div :class="$slots.right && 's-title__slot-right-wrapper'">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="s-title__subTitle" v-if="mergedProps.subTitle" v-bind="mergedProps.subAttrs">
      {{ mergedProps.subTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
<s-title title="使用hooks1" t="100"></s-title>
<s-title title="我说呢" sub-title="test/t2.vue"></s-title>
*
*/
import { processWidth } from '@/utils/src/index.ts'
import { computed } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'STitle',
})
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '', // 默认margin 16px 0
  },
  // 本地开发. 用来对文件命名. 可以快速定位到文件的名字
  subTitle: {
    type: String,
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => ({}),
  },
  inner: {
    type: Boolean,
    default: false,
  },
  t: {
    type: [String, Number],
    default: '',
  },
  b: {
    type: [String, Number],
    default: '',
  },
  l: {
    type: [String, Number],
    default: '',
  },
  tb: {
    type: [String, Number],
  },
  height: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String, // simple, icon, form
    default: 'icon',
  },
  theme: {
    type: String, // chenghua
    default: '',
  },
})
const mergedProps = useGlobalComponentConfig('sTitle', props)

const margin = computed(() => {
  const { t, b, l, tb } = mergedProps.value
  if (!t && !b && !l && !tb) {
    return {}
  } else {
    let obj: any = {}
    if (tb) {
      obj.marginTop = processWidth(tb, true)
      obj.marginBottom = processWidth(tb, true)
    }
    if (t) {
      obj.marginTop = processWidth(t, true)
    }
    if (b) {
      obj.marginBottom = processWidth(b, true)
    }
    if (l) {
      obj.marginLeft = processWidth(l, true)
    }
    return obj
  }
})

const parseClass = computed(() => {
  let type = mergedProps.value.type
  if (type === 'simple' || type === 'icon') {
    return 's-title__top-simple-left'
  }
  if (type === 'form') {
    return 's-title__form-left'
  }
  return 's-title__top-left'
})

const titleClass = computed(() => ({
  's-title--chenghua': mergedProps.value.theme === 'chenghua',
}))
</script>

<style scoped lang="scss">
.s-title {
  position: relative;
  box-sizing: border-box;
  .s-title__main {
    display: flex;
    align-items: center;
  }
  .s-title__top {
    display: flex;
    align-items: center;
    color: var(--el-text-color-primary);
    font-size: 16px;
    justify-content: space-between;
    .s-title__slot-icon-wrapper {
      margin-right: 8px;
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      color: currentColor;
    }
    .s-title__default-icon {
      width: 14px;
      height: 14px;
      display: block;
    }
    .s-title__slot-right-wrapper {
      text-align: right;
      display: flex;
    }
  }

  .s-title__form-left {
    padding: 0 0 8px;
    margin: 0 0 16px;
    font-weight: 800;
    width: 100%;
    border-bottom: 1px dashed var(--el-border-color-lighter);
  }

  .s-title__top-simple-left {
    width: 100%;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    display: flex;
    .title-text {
      letter-spacing: 0;
      font-weight: 600;
      margin-right: 8px;
      white-space: nowrap;
    }
  }
  .s-title__top-left {
    width: 100%;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &::before {
      position: absolute;
      content: '';
      width: 3px;
      left: -8px;
      top: 5px;
      height: calc(100% - 8px);
      bottom: 0;
      letter-spacing: 0;
      background-color: var(--lc, var(--blue)); // 左侧的竖条颜色
    }
    .title-text {
      letter-spacing: 0;
      font-weight: 600;
      margin-right: 8px;
      white-space: nowrap;
    }
  }
  .s-title__subTitle {
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-secondary);
    letter-spacing: 0;
  }

  &.s-title--chenghua {
    --ch-title-primary: #165dff;
    --ch-title-primary-hover: #1e6efc;
    --ch-title-accent: #00c5e7;
    --ch-title-text: var(--el-text-color-primary);
    --ch-title-secondary: var(--el-text-color-secondary);

    font-family: 'PingFang SC', sans-serif;

    .s-title__top {
      position: relative;
      min-height: 34px;
      padding-bottom: 8px;
      color: var(--ch-title-text);
      font-size: 18px;
      line-height: 1.4;

      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(22, 93, 255, 0.28) 0%,
          rgba(0, 197, 231, 0.14) 38%,
          rgba(0, 197, 231, 0) 78%
        );
        content: '';
      }
    }

    .s-title__main {
      flex: 1 1 auto;
      min-width: 0;
    }

    .s-title__slot-icon-wrapper {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      color: var(--ch-title-primary);
    }

    .s-title__chenghua-icon {
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: linear-gradient(135deg, var(--ch-title-primary) 0%, var(--ch-title-accent) 100%);
      box-shadow: 0 6px 14px rgba(22, 93, 255, 0.18);

      &::before {
        position: absolute;
        inset: 3px;
        border: 1px solid rgba(255, 255, 255, 0.62);
        border-radius: 2px;
        content: '';
      }

      &::after {
        position: absolute;
        right: -2px;
        bottom: 2px;
        width: 6px;
        height: 6px;
        border: 2px solid var(--el-bg-color);
        border-radius: 3px;
        background: var(--ch-title-accent);
        content: '';
      }
    }

    .s-title__top-simple-left,
    .s-title__top-left,
    .s-title__form-left {
      width: 100%;

      .title-text {
        display: inline-block;
        max-width: 100%;
        margin-right: 10px;
        overflow: hidden;
        color: var(--ch-title-text);
        font-weight: 600;
        letter-spacing: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .s-title__top-left {
      padding-left: 14px;

      &::before {
        top: 50%;
        bottom: auto;
        left: 0;
        width: 4px;
        height: 18px;
        border-radius: 4px;
        background: linear-gradient(180deg, var(--ch-title-primary) 0%, var(--ch-title-accent) 100%);
        transform: translateY(calc(-50% - 4px));
      }
    }

    .s-title__form-left {
      padding: 0 0 10px;
      margin: 0 0 16px;
      border-bottom: 0;
    }

    .s-title__slot-right-wrapper {
      display: flex;
      flex: 0 0 auto;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      min-width: 0;
    }

    .s-title__subTitle {
      margin-top: 4px;
      color: var(--ch-title-secondary);
      font-size: 13px;
      line-height: 1.5;
    }
  }
}
</style>
