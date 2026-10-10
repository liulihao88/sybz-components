<template>
  <el-popover :visible="opened" placement="bottom-start" :width="300" trigger="manual">
    <template #reference>
      <el-input
        v-model="query"
        placeholder="Search groceries"
        style="width: 300px"
        @focus="opened = true"
        @blur="opened = false"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
      />
    </template>
    <s-scroll ref="scroll" autosize max-height="200px" type="always" scrollbars="y">
      <button v-for="(item, index) in filtered" :key="item" class="grocery" :class="{ active: index === highlighted }">
        {{ item }}
      </button>
      <span v-if="!filtered.length">Nothing found</span>
    </s-scroll>
  </el-popover>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const groceries = [
  'Apples',
  'Bananas',
  'Oranges',
  'Milk',
  'Bread',
  'Eggs',
  'Chicken',
  'Beef',
  'Pasta',
  'Rice',
  'Potatoes',
  'Onions',
  'Tomatoes',
  'Cucumbers',
  'Carrots',
  'Lettuce',
  'Spinach',
  'Broccoli',
  'Cheese',
  'Yogurt',
  'Butter',
  'Sugar',
  'Salt',
  'Pepper',
  'Coffee',
  'Tea',
  'Juice',
  'Water',
  'Cookies',
  'Chocolate',
]
const query = ref('')
const opened = ref(false)
const highlighted = ref(-1)
const scroll = ref<{ viewport?: HTMLElement }>()
const filtered = computed(() => groceries.filter((item) => item.toLowerCase().includes(query.value.toLowerCase())))
watch(query, () => {
  highlighted.value = -1
})
function move(delta: number) {
  highlighted.value = Math.min(Math.max(highlighted.value + delta, 0), filtered.value.length - 1)
  scroll.value?.viewport?.querySelectorAll('.grocery')[highlighted.value]?.scrollIntoView({ block: 'nearest' })
}
</script>
<style scoped>
.grocery {
  display: block;
  width: 100%;
  padding: 5px;
  text-align: left;
  border: 0;
  background: transparent;
}
.grocery.active {
  background: #e0f2fe;
}
</style>
