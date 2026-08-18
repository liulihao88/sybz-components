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
      我是标题后内容
    </s-title>

    <s-title title="属性标题">默认插槽内容</s-title>
    <s-title title="ARIA 二级标题" :level="2"></s-title>
    <s-title title="原生二级标题" tag="h1"></s-title>

    <s-title title="修改竖条颜色" type="icon" :style="{ '--lc': 'red' }"></s-title>
    <s-title title="左侧" margin="10px 0" l="10">
      <span class="m-l-16">标题后内容</span>
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

    <s-title title="属性设置右侧内容" extra="这是 extra 属性文本"></s-title>

    <s-title title="自定义图标尺寸后自动布局" type="simple" gap="12">
      <template #icon>
        <s-icon name="plus" :size="40"></s-icon>
      </template>
    </s-title>
  </div>
</template>
