<script setup lang="ts">
const map = [
  { type: 'primary', name: '标签1' },
  { type: 'primary', name: '标签11' },
  { type: 'primary', name: '标签11' },
  { type: 'info', name: '标签2' },
  { type: 'warning', name: '标签3' },
  { type: 'danger', name: '标签4' },
]

const map2 = [
  {
    danger: [{ Issuce: '问题' }, { OutOfService: '未激活1' }],
  },
  {
    warning: [{ Loading: '激活中' }, { Unloading: '停服中' }, { Standby: '备用' }],
  },
  {
    info: [{ Unknown: '未知' }],
  },
  {
    primary: [{ InService: '已激活' }],
  },
]
const row = {
  asyncValue: 'OutOfService',
  InService: 'InService',
}
</script>

<template>
  <div>
    <div v-for="(v, i) in map" :key="i">
      <STag class="mr-[8px]" :type="v.type">{{ v.name }}</STag>
    </div>
    <STag class="mr-[8px]" :options="map2" :value="row.asyncValue" width="100"></STag>
    <STag class="mr-[8px]" :options="map2" :value="row.InService" width="100"></STag>
  </div>
</template>
