<template>
  <div>
    <SBasicLayout collapsible :boxStyle="{ border: 'none' }">
      <template #header>
        <s-title title="更多">
          <template #right>
            <a href="#">header插槽</a>
          </template>
        </s-title>
      </template>
      默认插槽
      <template #icon>
        <s-icon name="plus" content="自定义折叠icon"></s-icon>
      </template>
      <template #footer>
        <el-button type="primary">footer插槽</el-button>
      </template>
    </SBasicLayout>
  </div>
</template>
