<template>
  <div>
    <SItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></SItem>
    <hr />
    <SItem label="label" value="value"></SItem>
    <s-title title="插槽用法" tb="8"></s-title>
    <SItem class="abc">
      <template #img>
        <img src="https://img.yzcdn.cn/vant/logo.png" />
      </template>
      <template #label>label</template>
      <template #value>value</template>
    </SItem>
  </div>
</template>

<style lang="scss" scoped></style>
