<script setup lang="ts">
function handleEvent(evt, ...rest) {
  console.log(`72 evt`, evt)
  console.log(`39 rest`, rest)
}
</script>

<template>
  <div>
    <div v-debounce="($event) => handleEvent($event, '其他传参')">可以传参的</div>
    <div v-debounce.click.scroll.1000="handleEvent" class="h-100">
      <h3>这里, click和scroll事件, 都添加了1000毫秒的防抖</h3>
      <p v-for="item in 20" :key="item">
        2024-05-28 11:17:06I want to set some random text, if you like it, please tell me. good wish for you! thank you
        so much. have a nice day!
      </p>
    </div>
  </div>
</template>
