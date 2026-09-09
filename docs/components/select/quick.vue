<template>
  <s-select :options="[]" title="showQuick=true（默认值），空选项仍显示按钮" />
  <s-select :options="[]" :show-quick="false" title="showQuick=false，隐藏按钮" />
</template>
