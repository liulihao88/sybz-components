<template>
  <div>
    <p>将鼠标移到页面右下角的按钮上查看提示；点击后立即回到顶部。</p>
    <s-backtop :duration="0" :visibility-height="0" :bottom="140">
      <el-tooltip content="回到顶部" placement="left">
        <span class="backtop-hover-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 4.5h14M12 19V8m0 0-5 5m5-5 5 5" />
          </svg>
        </span>
      </el-tooltip>
    </s-backtop>
  </div>
</template>

<style scoped>
.backtop-hover-icon {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}
</style>
