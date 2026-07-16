<script setup lang="ts">
const tenantDetails = {
  tenantQuota: '0.01 TB',
  allocateQuota: '7.99 GB',
  totalSpace: 10995116032,
  usedSpace: '0 BYTE',
}

const tenantDetailsExceed = {
  totalSpace: 10995116032,
  usedSpace: 13995116032,
}
</script>

<template>
  <div class="quota-pie-demo">
    <SCard title="租户容量配额" class="quota-pie-demo__item">
      <SQuotaPie
        class="quota-pie-demo__chart"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      />
    </SCard>

    <SCard title="当前使用量" class="quota-pie-demo__item">
      <SQuotaPie
        class="quota-pie-demo__chart"
        type="used"
        :used="tenantDetails.usedSpace"
        :total="tenantDetails.totalSpace"
        text="当前使用量 / 总空间"
      />
    </SCard>

    <SCard title="超额使用量" class="quota-pie-demo__item">
      <SQuotaPie
        class="quota-pie-demo__chart"
        type="used"
        :used="tenantDetailsExceed.usedSpace"
        :total="tenantDetailsExceed.totalSpace"
        text="当前使用量 / 总空间"
      />
    </SCard>

    <SCard title="空间占用率" class="quota-pie-demo__item">
      <SQuotaPie
        class="quota-pie-demo__chart"
        type="used"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.totalSpace"
        text="分配配额 / 总空间"
      />
    </SCard>
  </div>
</template>

<style scoped>
.quota-pie-demo {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 16px;
}

.quota-pie-demo__item {
  height: 300px;
}

.quota-pie-demo__chart {
  height: 100%;
}

@media (max-width: 900px) {
  .quota-pie-demo {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 520px) {
  .quota-pie-demo {
    grid-template-columns: 1fr;
  }
}
</style>
