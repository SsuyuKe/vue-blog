<script setup>
import { defineProps, defineEmits } from 'vue'
import { formatDate } from '@/utils/time'
defineProps({
  author: {
    type: String,
    default: ''
  },
  avatar: {
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
  cover: {
    type: String,
    default: ''
  },
  likesNum: {
    type: Number,
    default: 0
  },
  commentNum: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['cardClick'])

const cardClick = () => emit('cardClick')
</script>
<template>
  <div
    class='w-[240px] h-[300px] border border-solid border-gray-300 rounded-sm overflow-hidden relative flex flex-col justify-between'>
    <div class="absolute top-3 right-3 text-gray-200 text-xl">
      <i class="fa-regular fa-bookmark"></i>
    </div>
    <img class="w-full h-[180px] object-cover" :src="cover" alt="" />
    <div @click="cardClick" class="p-2">
      <div class='flex items-center text-sm mb-2 text-gray-300'>
        <img class='w-6 h-6 rounded-full object-cover border border-gray-300 border-solid mr-2' :src="avatar"
          alt="logo" />
        <span>{{ author }}</span>
        <span>・</span>
        <span>{{ formatDate(time) }}</span>
      </div>
      <p class="whitespace-nowrap text-ellipsis overflow-hidden">{{ title }}</p>
      <div class="text-gray-300 border-t border-solid border-gray-200 mt-2 pt-2 px-1 flex justify-between">
        <div class="cursor-pointer">
          <i class="fa-regular fa-heart mr-2"></i>
          <span>{{ likesNum }}</span>
        </div>
        <div>
          <i class="fa-regular fa-comment mr-2"></i>
          <span>{{ commentNum }}</span>
        </div>
        <div class="cursor-pointer">
          <i class="fa-solid fa-link"></i>
        </div>
      </div>
    </div>
  </div>
</template>