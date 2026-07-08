<script setup lang="ts">
const tenantDetails = {
  tenantCount: 1,
  bucketCount: 4,
  tenantQuota: '0.01 TB',
  allocateQuota: '7.99 GB',
  totalSpace: 10995116032,
  usedSpace: '0 BYTE',
  handleTaskCount: 2,
}
</script>

<template>
  <div>
    <SCard title="租户容量配额" class="w-300 h-500">
      <template #header></template>
      <SQuotaPie
        class="h-block"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></SQuotaPie>
    </SCard>
    <br />
    <SCard title="租户容量配额" class="w-300" :square="true">
      <template #header></template>
      <SQuotaPie
        class="h-block"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></SQuotaPie>
    </SCard>

    <br />
    <hr />

    <SCard title="租户容量配额" class="h-360" :square="true">
      <template #header></template>
      <SQuotaPie
        class="h-block"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></SQuotaPie>
    </SCard>
  </div>
</template>
