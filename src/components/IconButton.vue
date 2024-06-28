<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['iconClick'])

defineProps({
  image: {
    type: String,
    default: ''
  },
})
const iconClick = () => {
  emit('iconClick')
}
</script>
<template>
  <button class='flex items-center border-2 border-solid border-gray-200 px-3 py-2 rounded-3xl cursor-pointer'
    @click="iconClick">
    <div class='w-8 h-8 rounded-full overflow-hidden mr-2'>
      <img class='w-full h-full object-cover' :src="image" alt="image" />
    </div>
    <slot />
  </button>
</template>
<style scoped></style>