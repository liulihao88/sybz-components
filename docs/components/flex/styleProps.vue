<template>
  <div class="flex-style-props-demo">
    <s-title title="外边距 m / 内边距 p（数字自动补 px）" />
    <div class="box-wrap">
      <s-flex m="12" p="16" bg="#f0f6ff" c="#1d4ed8" bd="1px solid #bfdbfe" class="w-block">
        <span>m=12 p=16</span>
      </s-flex>
    </div>

    <hr />

    <s-title title="文字样式 fs / fw / lh / ta / tt / c" />
    <s-flex direction="column" align="start" gap="8" p="16" bg="#f8fafc" bd="1px solid #e2e8f0">
      <s-flex fs="18" fw="700" c="#0f172a">fs=18 fw=700</s-flex>
      <s-flex fs="14" lh="1.6" c="#475569">fs=14 lh=1.6（lh 不带单位保持原样）</s-flex>
      <s-flex ta="center" tt="uppercase" td="underline" w="200px" bg="#eef2ff">ta/tt/td</s-flex>
    </s-flex>

    <hr />

    <s-title title="尺寸与定位 w / h / miw / maw / pos / top / z" />
    <div class="box-wrap pos-wrap">
      <s-flex w="160px" h="80px" bg="#e0f2fe" align="center" justify="center">w=160px h=80px</s-flex>
      <s-flex miw="160px" maw="260px" h="80px" p="12" bg="#fef3c7" align="center" justify="center">
        miw=160px maw=260px
      </s-flex>
    </div>

    <hr />

    <s-title title="背景 / 颜色 / 透明度 / 边框 bg / c / opacity / bd" />
    <s-flex gap="12">
      <s-flex w="80px" h="40px" bg="#3b82f6" opacity="0.4" />
      <s-flex w="80px" h="40px" bg="#3b82f6" opacity="0.7" />
      <s-flex w="80px" h="40px" bg="#3b82f6" opacity="1" />
      <s-flex w="80px" h="40px" c="#0f172a" bd="1px solid #94a3b8" align="center" justify="center">bd</s-flex>
    </s-flex>
  </div>
</template>

<style scoped lang="scss">
.flex-style-props-demo {
  max-width: 720px;
}

.box-wrap {
  padding: 4px;
  background: repeating-linear-gradient(45deg, #fafafa 0 8px, #ffffff 8px 16px);
}

.pos-wrap {
  position: relative;
  min-height: 96px;
}

.s-flex {
  box-sizing: border-box;
}
</style>
