<script setup>
import { defineProps, defineEmits } from 'vue'
import { message } from 'ant-design-vue';

defineProps({
  id: {
    type: Number,
    default: 0
  },
  theme: {
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
  desc: {
    type: String,
    default: ''
  },
  likeNum: {
    type: Number,
    default: 0
  },
  commentNum: {
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
  }
})

const emit = defineEmits(['cardClick'])

const cardClick = () => {
  emit('cardClick')
}
const copy = (id) => {
  message.success('已複製連結')
  console.log('copy', id);
}
</script>
<template>
  <div class="w-[700px] border-b border-gray-200 border-solid pb-5 mb-5">
    <div class="mb-5 text-sm text-[rgba(0,0,0,0.5)]">
      <img class="w-6 h-6 inline-block mr-2 object-cover rounded-full" :src="avatar" alt="image" />
      <span>{{ theme }}</span>
      <span>．</span>
      <span>{{ time }}</span>
    </div>
    <div class="flex justify-between">
      <div class="w-[504px]">
        <h2 @click="cardClick"
          class="whitespace-nowrap text-ellipsis overflow-hidden text-xl font-bold mb-3 cursor-pointer hover:underline">
          {{ title }}</h2>
        <p class="whitespace-nowrap text-ellipsis overflow-hidden text-sm mb-3">
          {{ desc }}
        </p>
        <div class="flex items-center text-[rgba(0,0,0,0.5)]">
          <div class="mr-3">
            <i class="fa-regular fa-heart mr-2"></i>
            <span>{{ likeNum }}</span>
          </div>
          <div class="mr-3">
            <i class="fa-regular fa-comment mr-2"></i>
            <span>{{ commentNum }}</span>
          </div>
          <div class="mr-3 cursor-pointer" @click="copy(id)">
            <i class="fa-solid fa-link"></i>
          </div>
        </div>
      </div>
      <div class="w-20 h-20 rounded-xl overflow-hidden">
        <img class="w-full h-full" :src="cover" alt="image" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>