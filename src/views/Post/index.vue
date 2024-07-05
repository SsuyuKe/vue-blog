<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { usePostStore } from '@/store/post'
import { formatDateTime } from "@/utils/time"
import { useRoute, useRouter } from 'vue-router'

const { params } = useRoute()
const routeId = ref(params.id)
const router = useRouter()

const userStore = useUserStore()
const postStore = usePostStore()

const post = postStore.posts.find(post => post.id === Number(routeId.value))


const isModalOpen = ref(false)
const setIsModalOpen = (bool) => {
  isModalOpen.value = bool
}

const newComment = ref('')

const submit = (e) => {
  e.preventDefault();
  if (!newComment.value) return
  const newPosts = postStore.posts.map(post => {
    if (post.id === Number(routeId.value)) {
      post.action.comments = [{
        author: {
          user: userStore.userInfo.user,
          image: userStore.userInfo.image,
        },
        comment: newComment.value,
        created_at: Math.floor(Date.now() / 1000)
      }, ...post.action.comments]
      return post
    }
    return post
  })
  postStore.setPosts(newPosts)
  newComment.value = ''
}

const deletePost = () => {
  const newPosts = postStore.posts.filter(post => post.id !== Number(routeId.value))
  postStore.setPosts(newPosts)
  router.push('/posts')
}
</script>

<template>
  <div class="border border-solid border-gray-300 my-5 p-5">
    <div class="flex justify-between">
      <p class="text-gray-300 mb-3">{{ formatDateTime(post.created_at) }}</p>
      <div class="flex items-center">
        <div class="mr-2 flex flex-col items-center cursor-pointer group hover:text-themeColor"
          @click="router.push(`/edit-post/${routeId}`)">
          <i class="fa-solid fa-pen mr-1"></i>
          <span class="invisible group-hover:visible text-sm">編輯</span>
        </div>
        <div @click="setIsModalOpen(true)" class="flex flex-col items-center cursor-pointer group
          hover:text-themeColor">
          <i class="fa-solid fa-trash-can mr-1"></i>
          <span class="invisible group-hover:visible text-sm">刪除</span>
        </div>
      </div>
    </div>
    <h1 class="text-2xl font-bold pb-5 border-b border-solid border-[rgb(229,231,235)] mb-5">{{ post.title }}</h1>
    <div class="mb-10">
      <div class="mb-5 text-sm text-[rgba(0,0,0,0.5)] flex items-center">
        <img class="w-6 h-6 inline-block mr-2 object-cover rounded-full" :src="post.author.image" alt="image" />
        <span class="mr-2">{{ post.author.name }}</span>
        <p
          class="py-1 px-2 rounded cursor-pointer text-sm mr-5 last:mr-0 border-themeColor border border-solid font-bold text-themeColor">
          #{{ post.category }}</p>
        <div class="flex items-center">
          <div class="flex items-center mr-2 cursor-pointer">
            <i class="text-gray-300 fa-regular fa-heart mr-2 text-lg"></i>
            <span class="text-sm">{{ post.action.likes > 99 ? '99+' : post.action.likes }}</span>
          </div>
          <div class="flex items-center cursor-pointers mr-2">
            <i class="text-gray-300 fa-regular fa-heart mr-2 text-lg"></i>
            <span class="text-sm">{{ post.action.comments.length > 99 ? '99+' : post.action.likes }}</span>
          </div>
          <div class="flex items-center cursor-pointer">
            <i class="text-gray-300 fa-regular fa-bookmark mr-2 text-lg"></i>
          </div>
        </div>
      </div>
      <img class="mb-5" :src="post.cover" alt="" />
      <p>{{ post.desc }}</p>
    </div>
    <div>
      <div class="bg-gray-100 p-3 mb-5">
        <div class="mb-3 text-sm text-[rgba(0,0,0,0.5)] flex items-center">
          <img class="w-6 h-6 inline-block mr-2 object-cover rounded-full" :src="userStore.userInfo.image"
            alt="image" />
          <span>{{ userStore.userInfo.user }}</span>
        </div>
        <form @submit="submit" class="flex flex-col items-end">
          <textarea v-model="newComment" placeholder="留個言吧~"
            class="focus:outline-0 text-sm p-3 resize-none border border-solid border-gray-300 w-full mb-3"></textarea>
          <button
            class="px-3 py-2 bg-themeColor rounded-sm text-white disabled:bg-gray-200 disabled:text-gray-300 cursor-pointer text-sm">發表留言</button>
        </form>
      </div>
      <div>
        <div v-for="(item, idx) in post.action.comments" :key="item.comment"
          class="border-b border-gray-200 border-solid">
          <p class="text-gray-300">#{{ idx + 1 }}</p>
          <div class="text-sm text-[rgba(0,0,0,0.5)]">
            <img class="w-6 h-6 inline-block mr-2 object-cover rounded-full" :src="item.author.image" alt="image" />
            <span class="text-base text-black mr-1">{{ item.author.name }}</span>
            <span>於 {{ formatDateTime(item.created_at) }}</span>
          </div>
          <p class="px-5 pt-3 pb-3">{{ item.comment }}</p>
        </div>
      </div>
    </div>
  </div>
  <a-modal v-model:open="isModalOpen" @cancel="isModalOpen = false" title="刪除貼文" @ok="deletePost">
    <p>是否要刪除</p>
    <p>{{ post.title }}</p>
  </a-modal>
</template>

<style scoped>

</style>

