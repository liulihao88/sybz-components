<template>
  <div class="" tabindex="-1">({{ pkgVersion }})</div>
  <el-button
    v-if="!isHome"
    type="primary"
    size="small"
    class="prod-toogle"
    tabindex="-1"
    @click.stop.prevent="toggleSourceVisible"
  >
    <div class="visible-text">
      {{ sourceVisible === true ? '代码折叠' : '代码显示' }}
    </div>
  </el-button>

  <div v-if="isDev && !isHome" class="code-toggle" tabindex="-1">
    <el-button type="primary" size="small" class="dev-md-copy" @click.stop.prevent="jumpUrl('md')">
      <div class="visible-text">跳转home.md(仅本地)</div>
    </el-button>
    <el-button
      v-if="showPackagesButton"
      type="primary"
      size="small"
      class="dev-package-copy"
      @click.stop.prevent="jumpUrl('packages')"
    >
      <div class="visible-text">跳转packages(仅本地)</div>
    </el-button>
    <el-button
      v-if="isDev"
      type="primary"
      size="small"
      class="dev-package-copy"
      @click.stop.prevent="jumpUrl('test/home')"
    >
      <div class="visible-text">跳转测试页</div>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { getStorage, setStorage, $toast } from '@sybz-components/utils'
import STitle from '@/components/title'

import { ElMessage } from 'element-plus'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import pkg from '../../../package.json'
import {
  buildVscodeFileUrl,
  getComponentDocPath,
  getDocsBasePath,
  getSourceDir,
  joinLocalPath,
} from './utils/localFile'

const { page } = useData()
const router = useRouter()

const isDev = ref(import.meta.env.DEV)

const pkgVersion = ref(pkg.version)

const sourceVisible = ref(false)
const showPackagesButton = ref(true)
const componentPackageSourceModules = import.meta.glob('../../../packages/components/**/src/index.vue')
const componentPackageDocPaths = new Set(
  Object.keys(componentPackageSourceModules).map((path) =>
    path.replace('../../../packages/components/', '').replace('/src/index.vue', ''),
  ),
)

const getComponentDocPathFromRelativePath = (routePath: string) => {
  return routePath
    .replace(/^components\/?/, '')
    .replace(/\/(?:home|index)\.md$/, '')
    .replace(/\.md$/, '')
}

const hasPackagesJumpFile = (compStr: string) => {
  if (!compStr) return false
  if (compStr.startsWith('utils') || compStr.startsWith('directives')) return true
  return componentPackageDocPaths.has(compStr)
}

const getPackagesTargetPath = (sourceDir: string, compStr: string) => {
  if (!hasPackagesJumpFile(compStr)) return ''
  if (compStr.startsWith('utils')) return joinLocalPath(sourceDir, 'packages/utils/src/index.ts')
  if (compStr.startsWith('directives')) return joinLocalPath(sourceDir, 'packages/directives/gDirectives.js')
  return joinLocalPath(sourceDir, 'packages/components', compStr, 'src/index.vue')
}

const shouldshowPackagesButton = (routePath: string) => {
  return hasPackagesJumpFile(getComponentDocPathFromRelativePath(routePath))
}

watch(
  () => page.value.relativePath,
  (newPath) => {
    showPackagesButton.value = shouldshowPackagesButton(newPath)
  },
  {
    immediate: true,
  },
)

const toggleSourceVisible = () => {
  setStorage('codeVisible', !sourceVisible.value)
  location.reload()
}

const openLocalSourceFile = (targetPath: string) => {
  window.open(buildVscodeFileUrl(targetPath), '_blank')
}

const jumpUrl = (type: string) => {
  let pathname = location.pathname
  if (!pathname || pathname === '/') {
    return
  }
  const sourceDir = getSourceDir()

  if (!sourceDir) {
    $toast({
      type: 'warning',
      duration: 0,
      showClose: true,
      message: () =>
        h('div', [
          h(STitle, {
            theme: 'chenghua',
            title:
              '此按钮作用是,点击按钮, 直接跳转到本地的对应路由所在路径; 请先配置 VITE_SOURCE_DIR 环境变量作为跳转至你电脑本地的路径',
          }),
          h('div', { class: 'm-tb-8' }, '1. pwd查看当前项目路径并复制'),
          h('div', { class: 'm-b-8' }, '2. 项目根目录新建文件 `.env.local`'),
          h(
            'div',
            { class: 'm-b-8' },
            '3. .env.local添加 VITE_SOURCE_DIR=当前项目绝对路径; example: VITE_SOURCE_DIR="/Users/xxx/sybz/sybz-components"',
          ),
        ]),
    })
    return
  }

  let compStr = getComponentDocPath(pathname)
  let targetPath = ''
  if (type === 'md') {
    targetPath = joinLocalPath(sourceDir, 'docs/components', compStr, 'home.md')
    if (compStr === '') {
      targetPath = joinLocalPath(sourceDir, 'docs/components/index.md')
    }
  } else if (type === 'packages') {
    targetPath = getPackagesTargetPath(sourceDir, compStr)
  } else if (type === 'test/home') {
    router.go(`${getDocsBasePath()}/components/test/home`) // 使用 VitePress 路由进行跳转
    targetPath = joinLocalPath(sourceDir, 'docs/components/test/base.vue')
  }

  if (!targetPath) {
    return
  }

  openLocalSourceFile(targetPath)
}

const isHome = ref(false)
const timer = ref<ReturnType<typeof setInterval> | null>(null)

onMounted(() => {
  sourceVisible.value = !!getStorage('codeVisible')
  timer.value = setInterval(() => {
    if (window.location.pathname === `${getDocsBasePath()}/`) {
      isHome.value = true
      return
    }
    isHome.value = false
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style lang="scss">
.code-toggle {
  position: fixed;
  top: 20px;
  right: 40%;
  z-index: 200;
}
.prod-toogle {
  position: fixed;
  top: 50px;
  right: 50%;
  z-index: 200;
}
</style>
