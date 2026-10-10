<template>
  <el-input
    v-model="query"
    placeholder="Search groceries"
    style="width: 300px; margin-bottom: 12px"
    @keydown.down.prevent="move(1)"
    @keydown.up.prevent="move(-1)"
  />
  <s-scroll ref="scroll" width="300px" height="150px" type="always" scrollbars="y">
    <button
      v-for="(item, index) in filtered"
      :key="item"
      class="grocery"
      :class="{ active: index === highlighted }"
      @click="highlighted = index"
    >
      {{ item }}
    </button>
  </s-scroll>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🍊 Oranges',
  '🥛 Milk',
  '🍞 Bread',
  '🥚 Eggs',
  '🍗 Chicken',
  '🥩 Beef',
  '🍝 Pasta',
  '🍚 Rice',
  '🥔 Potatoes',
  '🧅 Onions',
  '🍅 Tomatoes',
  '🥒 Cucumbers',
  '🥕 Carrots',
  '🥬 Lettuce',
  '🍃 Spinach',
  '🥦 Broccoli',
  '🧀 Cheese',
  '🍦 Yogurt',
  '🧈 Butter',
  '🍚 Sugar',
  '🧂 Salt',
  '🌶️ Pepper',
  '☕ Coffee',
  '🍵 Tea',
  '🥤 Juice',
  '💧 Water',
  '🍪 Cookies',
  '🍫 Chocolate',
]
const query = ref('')
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
  cursor: pointer;
}
.grocery.active {
  background: #e0f2fe;
}
</style>
