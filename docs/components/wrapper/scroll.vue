<template>
  <sWrapper gap="20px" :min-width="'200px'">
    <SItem label="label" value="value"></SItem>
    <SItem label="label" value="value"></SItem>
    <SItem label="label" value="value"></SItem>
    <SItem label="label" value="value"></SItem>
    <SItem label="label" value="value"></SItem>
  </sWrapper>

  <s-title title="或者每个item单独设置"></s-title>

  <sWrapper gap="20px">
    <SItem label="label" value="value" :style="{ minWidth: '200px' }"></SItem>
    <SItem label="label" value="value" :style="{ minWidth: '200px' }"></SItem>
    <SItem label="label" value="value" :style="{ minWidth: '200px' }"></SItem>
    <SItem label="label" value="value" :style="{ minWidth: '200px' }"></SItem>
    <SItem label="label" value="value" :style="{ minWidth: '200px' }"></SItem>
  </sWrapper>
</template>

<style lang="scss" scoped></style>
