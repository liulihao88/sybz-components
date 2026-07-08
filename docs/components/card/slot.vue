<template>
  <div>
    <SCard collapsible :box-style="{ border: 'none' }">
      <template #header>
        <s-title title="更多">
          <template #extra>
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
    </SCard>
  </div>
</template>
