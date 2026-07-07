<script setup lang="ts">
import { ref } from 'vue'
const htmlContent = `
  <div>这是html</div> 
  <span class="cl-blue">这是蓝色</span>  <br />
  <span class="cl-yellow">这是黄色</span>
`

const ulContent = `
  <ul>
    <li>1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!</li>  
    <li>2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!</li>  
    <li>3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!</li>  
  </ul>
`
</script>

<template>
  <div>
    <s-warning content="这是基础用法" title="我是title"></s-warning>
    <br />
    <s-warning
      content="<span class='vp-tag m-r-10'>1.2.0</span>这是基础用法-size为small <code>这是code包裹内容</code> <blue>这是blue包裹内容</blue>, <strong class='m-l-100'>这是strong包裹的内容</strong> 并且设置了left <a href='http://www.baidu.com'>设置根路径</a>   "
      size="small"
      class="m-l-10"
    ></s-warning>
    <br />
    <s-warning
      :content="ulContent"
      :dangerously-use-html-string="true"
      :icon="false"
      :style="{ paddingLeft: '20px' }"
    />
    <br />
    <s-flex>
      <s-warning title="我是title" content="默认类型, <code>这是code包裹内容</code>" class="m-r-8" />
      <s-warning title="我是title" content="type=warning <code>这是code包裹内容</code>" type="warning" class="m-r-8" />
      <s-warning title="我是title" content="type=simple <code>这是code包裹内容</code>" type="simple" class="m-r-8" />
      <s-warning title="我是title" content="type=error <code>这是code包裹内容</code>" type="error" class="m-r-8" />
    </s-flex>

    <br />
    <s-warning
      type="info"
      content="这是info的基础用法, 并更改图标"
      :icon-attrs="{
        name: 'delete',
      }"
    ></s-warning>
    <br />

    <s-warning content="这是更改样式" style="border-style: dotted; padding-left: 50px" left="10"></s-warning>

    <br />
    <s-warning :content="htmlContent"></s-warning>
    <br />
    <s-warning
      content="不要icon按钮"
      title="我是title"
      :dangerously-use-h-t-m-l-string="true"
      :icon="false"
    ></s-warning>
  </div>
</template>
