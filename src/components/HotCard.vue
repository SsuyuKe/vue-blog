<script setup>
import { defineProps, defineEmits, ref } from 'vue'

defineProps({
  id: {
    type: Number,
    default: 0
  },
  cover: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  commentNum: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['pageClick'])

// 換頁
const pageClick = () => {
  emit('pageClick')
}

// 收藏 => 比對收藏的內容是否有這項
// const collection = JSON.parse(localStorage.getItem('collection')) || []
const isCollect = ref(false)
const collect = (id) => {
  // 收藏功能
  isCollect.value = !isCollect.value
}
</script>
<template>
  <div class='rounded-lg overflow-hidden border border-solid border-gray-200'>
    <div class='h-40 relative'>
      <img class='w-full h-full object-cover' :src="cover" alt="image" />
      <div class="cursor-pointer" @click="collect(id)">
        <i v-if="isCollect" class="text-2xl text-primaryTabColor fa-solid fa-heart mr-1 absolute top-2 right-2"></i>
        <i v-else class="text-2xl text-white fa-regular fa-heart mr-1 absolute top-2 right-2"></i>
      </div>
    </div>
    <div class='p-3 cursor-pointer' @click="pageClick">
      <div class='flex items-center text-sm mb-2'>
        <img class='w-6 h-6 rounded-full object-cover border border-gray-300 border-solid mr-2' :src="avatar"
          alt="logo" />
        <span>{{ author }}</span>
        <span>・</span>
        <span>{{ time }}</span>
      </div>
      <p class='whitespace-nowrap text-ellipsis overflow-hidden'>{{ title }}</p>
      <div class='mt-9 flex justify-between'>
        <p class='bg-cardTagColor px-2 rounded text-white'>{{ category }}</p>
        <div class='mr-3 flex items-center text-md text-gray'>
          <i class="fa-regular fa-message mr-1"></i>
          <span class='text-base'>{{ commentNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>