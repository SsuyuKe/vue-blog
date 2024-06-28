<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  tabKey: {
    type: String,
    default: ''
  },
  activeKey: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['tabClick'])
const tabClick = (key) => {
  emit('tabClick', key)
}
const activeCls = 'bg-secondaryTabColor !text-white'
</script>
<template>
  <button
    :class="[activeKey === tabKey && activeCls, 'border border-secondaryTabColor border-solid rounded-2xl px-5 py-1 text-secondaryTabColor cursor-pointer']"
    @click="tabClick(tabKey)">
    <slot />
  </button>
</template>
<style scoped></style>