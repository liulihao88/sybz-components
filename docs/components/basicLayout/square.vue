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
    <sBasicLayout title="租户容量配额" class="w-[300px] h-[500px]">
      <template #header></template>
      <SQuotaPie
        class="h-full"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></SQuotaPie>
    </sBasicLayout>
    <br />
    <sBasicLayout title="租户容量配额" class="w-[300px]" :square="true">
      <template #header></template>
      <SQuotaPie
        class="h-full"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></SQuotaPie>
    </sBasicLayout>

    <br />
    <hr />

    <sBasicLayout title="租户容量配额" class="h-[360px]" :square="true">
      <template #header></template>
      <SQuotaPie
        class="h-full"
        type="quota"
        :used="tenantDetails.allocateQuota"
        :total="tenantDetails.tenantQuota"
        text="总使用量 / 总可用量"
      ></SQuotaPie>
    </sBasicLayout>
  </div>
</template>
