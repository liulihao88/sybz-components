<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
import group1 from '@/assets/images/overview/group1.png'
import group2 from '@/assets/images/overview/group2.png'
import group3 from '@/assets/images/overview/group3.png'
import group4 from '@/assets/images/overview/group4.png'
import overviewService from '@/assets/images/overview/overview-service.png'

defineOptions({
  name: 'SOutService',
})

const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: '', // horizontal
  },
})

const itemList = computed(() => {
  return [
    {
      label: '服务名称',
      value: props.details?.name,
      img: group1,
    },
    {
      label: '服务状态',
      value: props.details?.status,
      img: group2,
    },
    {
      label: '服务端口',
      value: props.details?.port,
      img: group3,
    },
    {
      label: '节点数量',
      value: props.details?.serveCount,
      img: group4,
    },
  ]
})
</script>

<template>
  <sBasicLayout class="s-out-service">
    <template #header>
      <s-title title="对外服务信息">
        <template #icon>
          <img :src="overviewService" class="s-out-service__title-icon" />
        </template>
      </s-title>
    </template>
    <div class="top" v-if="type !== 'horizontal'">
      <div v-for="(v, i) in itemList" :key="i" class="item">
        <img :src="v.img" class="s-out-service__item-icon" width="43" />
        <div class="item-right">
          <div class="s-out-service__item-value">{{ v.value }}</div>
          <div class="s-out-service__item-label">{{ v.label }}</div>
        </div>
      </div>
    </div>
    <sItemWrapper v-else gap="16px" class="" :columns="2">
      <template v-for="(v, i) in itemList" :key="i">
        <s-item
          :img="v.img"
          :label="v.label"
          :value="v.value"
          :itemStyle="{ fontSize: '16px' }"
          :boxStyle="{ justifyContent: 'start' }"
        >
          <template #img>
            <img :src="v.img" class="img-contain" width="43" style="min-width: 43px" />
          </template>
        </s-item>
      </template>
    </sItemWrapper>
  </sBasicLayout>
</template>

<style lang="scss" scoped>
.box {
  margin-bottom: 16px;
}

.s-out-service {
  height: 100%;
}

.s-out-service__title-icon,
.s-out-service__item-icon {
  margin-right: 8px;
}

.s-out-service__item-value {
  font-weight: 700;
  text-align: center;
}

.s-out-service__item-label {
  color: var(--45);
  text-align: center;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .item {
    display: flex;
    justify-content: space-between;
    .item-right {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      min-width: 100px;
    }
  }
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  margin-top: 16px;
  font-size: 12px;

  .bottom-item {
    display: flex;
    flex: 1;
    min-height: 63px;
    margin: 0 8px 0 0;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
    border-radius: 5px;

    .num-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      background: var(--el-color-primary-light-9);
      border-radius: 5px 0 0 5px;
    }

    .runtime-item-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 4px;
    }
  }

  .bottom-item:last-child {
    margin: 0;
  }
}
.img-contain {
  object-fit: contain;
}
</style>
