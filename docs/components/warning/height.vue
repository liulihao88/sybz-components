<template>
  <s-flex gap="small">
    <s-warning content="content内容" title="title内容" height="100" />
    <s-warning title="content内容" height="100" />
    <s-warning content="title内容" height="100" />

    <div class="w-100% h-100">
      <s-warning content="content内容" title="title内容" height="100%" />
    </div>
    <s-warning height="30" content="高度30"></s-warning>
  </s-flex>
</template>
