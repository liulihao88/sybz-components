<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useData } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const APPEARANCE_KEY = 'vitepress-theme-appearance'

const { isDark } = useData()

const checked = ref(false)
let observer: MutationObserver | null = null

const iconComponent = computed(() => (checked.value ? Moon : Sunny))

const syncFromDom = () => {
  checked.value = document.documentElement.classList.contains('dark')
  isDark.value = checked.value
}

const setAppearance = (dark: boolean) => {
  const classList = document.documentElement.classList
  const css = document.createElement('style')

  css.type = 'text/css'
  css.appendChild(
    document.createTextNode(
      `:not(.theme-appearance-toggle):not(.theme-appearance-toggle *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`,
    ),
  )

  document.head.appendChild(css)
  classList[dark ? 'add' : 'remove']('dark')
  localStorage.setItem(APPEARANCE_KEY, dark ? 'dark' : 'light')
  syncFromDom()

  // force repaint before removing the temporary transition reset
  void window.getComputedStyle(css).opacity
  document.head.removeChild(css)
}

const toggleAppearance = () => {
  setAppearance(!checked.value)
}

onMounted(() => {
  syncFromDom()

  observer = new MutationObserver(() => {
    syncFromDom()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <button
    class="theme-appearance-toggle"
    type="button"
    :aria-pressed="checked"
    :aria-label="checked ? '切换为浅色主题' : '切换为深色主题'"
    @click="toggleAppearance"
  >
    <span class="theme-appearance-toggle__track">
      <span class="theme-appearance-toggle__thumb">
        <el-icon class="theme-appearance-toggle__icon">
          <component :is="iconComponent" />
        </el-icon>
      </span>
    </span>
  </button>
</template>

<style scoped>
.theme-appearance-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.theme-appearance-toggle__track {
  position: relative;
  display: block;
  width: 60px;
  height: 34px;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, var(--vp-c-bg) 12%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.theme-appearance-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  color: #101217;
  box-shadow:
    0 6px 14px rgba(15, 23, 42, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}

.theme-appearance-toggle__icon {
  font-size: 16px;
}

.theme-appearance-toggle:hover .theme-appearance-toggle__track {
  border-color: var(--vp-c-text-3);
}

.theme-appearance-toggle:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
  border-radius: 999px;
}

:global(html.dark) .theme-appearance-toggle__track {
  background: color-mix(in srgb, var(--vp-c-bg-elv) 88%, #0a0b0e 12%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

:global(html.dark) .theme-appearance-toggle__thumb {
  transform: translateX(26px);
  background: #05070b;
  color: #f8fafc;
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
</style>
