<template>
  <SWrapper :columns="2">
    <SItem
      label="这是默认类型"
      value="123456"
      src="https://img.yzcdn.cn/vant/logo.png"
      :img-style="{ height: '100px' }"
      height="300"
    ></SItem>
    <SItem
      label="这个类型是type='value'"
      type="value"
      value="123456"
      src="https://img.yzcdn.cn/vant/logo.png"
      :img-style="{ height: '100px' }"
      height="300"
    ></SItem>
    <SItem
      label="这个类型是type='value'且加属性"
      type="value"
      value="123456789233412"
      src="https://img.yzcdn.cn/vant/logo.png"
      :img-style="{ height: '100px' }"
      :attrs="{
        formatBytes: true,
        formatThousands: true,
        toFixed: true,
      }"
      height="300"
    ></SItem>
    <SItem
      label="这个类型是type='value'且加attrs加center属性"
      type="value"
      value="123456789233412"
      src="https://img.yzcdn.cn/vant/logo.png"
      :img-style="{ height: '100px' }"
      :attrs="{
        formatBytes: true,
        formatThousands: true,
        toFixed: true,
        center: true,
      }"
      height="300"
    ></SItem>
  </SWrapper>
</template>

<style lang="scss" scoped></style>
