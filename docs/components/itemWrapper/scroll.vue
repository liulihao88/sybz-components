<template>
  <sItemWrapper gap="20px" :minWidth="'200px'">
    <SItem label="label" value="value" ></SItem>
    <SItem label="label" value="value" ></SItem>
    <SItem label="label" value="value" ></SItem>
    <SItem label="label" value="value" ></SItem>
    <SItem label="label" value="value" ></SItem>
  </sItemWrapper>

  <s-title title="或者每个item单独设置">

  </s-title>

  <sItemWrapper gap="20px" >
    <SItem label="label" value="value" :style="{minWidth: '200px'}" ></SItem>
    <SItem label="label" value="value" :style="{minWidth: '200px'}" ></SItem>
    <SItem label="label" value="value" :style="{minWidth: '200px'}" ></SItem>
    <SItem label="label" value="value" :style="{minWidth: '200px'}" ></SItem>
    <SItem label="label" value="value" :style="{minWidth: '200px'}" ></SItem>
  </sItemWrapper>
</template>

<style lang="scss" scoped></style>
