<template>
  <div class="icon-url-demo">
    <s-icon icon="https://api.iconify.design/mdi/home.svg" size="32" />
    <s-icon
      icon="https://api.iconify.design/tabler/trash.svg?color=%232a6df4"
      source="url"
      size="32"
      :image-attrs="{ alt: '删除' }"
    />
  </div>
</template>

<style scoped>
.icon-url-demo {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
