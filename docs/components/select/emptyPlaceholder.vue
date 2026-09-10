<template>
  <s-wrapper :columns="1">
    <s-select width="100%" :options="[]" title="emptyPlaceholder=暂无数据（默认值）" />
    <s-select width="100%" :options="[]" empty-placeholder="暂无可选服务" title="emptyPlaceholder=暂无可选服务" />
    <s-select width="100%" :options="[]" empty-placeholder="" title="emptyPlaceholder=空字符串" />
    <s-select width="100%" :options="[]" placeholder="请选择服务" title="空选项优先显示暂无数据" />
    <s-select
      width="100%"
      :options="[{ label: '服务一', value: 1 }]"
      placeholder="请选择服务"
      title="有选项显示 placeholder"
    />
  </s-wrapper>
</template>
