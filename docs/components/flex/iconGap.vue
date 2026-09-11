<template>
  <s-title title="gap 默认值：0px，保留图标默认间距" />
  <s-flex>
    <s-icon icon="Edit" />
    <s-icon icon="Delete" />
    <s-icon icon="Search" />
  </s-flex>

  <s-title title="gap=12，图标间距为 12px" />
  <s-flex gap="12">
    <s-icon icon="Edit" />
    <s-icon icon="Delete" />
    <s-icon icon="Search" />
  </s-flex>

  <s-title title="direction=column（默认 row），gap=12" />
  <s-flex direction="column" align="start" gap="12">
    <s-icon icon="Edit" />
    <s-icon icon="Delete" />
    <s-icon icon="Search" />
  </s-flex>
</template>
