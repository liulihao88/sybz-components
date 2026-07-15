<template>
  <div>
    <s-title title="你好"></s-title>
    <s-title title="显示左侧树杠" sub-title="我不好"></s-title>
    <s-title title="无左侧树杠" type="simple"></s-title>
    <s-title title="form表单的类型" type="form"></s-title>
    <s-title title="小尺寸标题" size="small" margin="12px 0 0"></s-title>
    <s-title title="大尺寸标题" size="large" sub-title="统一控制标题和副标题字号" gap="12"></s-title>
    <s-title sub-title="我不服啊" type="simple">
      <template #title> title的slot </template>
      <template #icon>
        <s-icon name="delete"></s-icon>
      </template>
      <template #extra>
        <el-button type="primary">按钮1</el-button>
        <el-button type="primary">按钮2</el-button>
      </template>
      <template #append>我是追加内容</template>
    </s-title>

    <s-title>默认插槽标题</s-title>
    <s-title :level="2">ARIA 二级标题</s-title>
    <s-title tag="h2">原生二级标题</s-title>

    <s-title title="修改竖条颜色" type="icon" :style="{ '--lc': 'red' }"></s-title>
    <s-title title="左侧" margin="10px 0" l="10">
      <template #append><span class="m-l-16">标题追加内容</span></template>
      <template #extra>
        <el-button type="primary">右侧的button</el-button>
        <el-button type="primary">右侧的button2</el-button>
        <el-button type="primary">右侧的button3</el-button>
        <el-button type="primary">右侧的button4</el-button>
      </template>
    </s-title>

    <s-title title="icon" type="simple">
      <template #icon>
        <s-icon name="plus"></s-icon>
      </template>
    </s-title>
  </div>
</template>
