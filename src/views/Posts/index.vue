<script setup>
import { usePostStore } from '@/store/post'
import MyPost from '@/components/MyPost.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const postStore = usePostStore()
const router = useRouter()
const showPosts = ref(postStore.posts)


const sortMethod = [
  {
    value: 'sort',
    option: '排序'
  },
  {
    value: 'ascn',
    option: '由舊到新' // 由小到大
  },
  {
    value: 'desc',
    option: '由新到舊' // 由大到小
  }
]
const categories = [
  '所有文章',
  '音樂',
  '追星'
]
const currentCategory = ref(categories[0])

const handleCategoryClick = (category) => {
  currentCategory.value = category
  if (category === '所有文章') {
    showPosts.value = postStore.posts
    return
  }
  const filterPosts = postStore.posts.filter(post => post.category === category)
  showPosts.value = filterPosts
}
const handleSelect = (e) => {
  const method = e.target.value
  const newPosts = [...showPosts.value]
  if (method === 'ascn') {
    newPosts.sort((a, b) => a.created_at - b.created_at)
    showPosts.value = newPosts
    return
  }
  if (method === 'desc') {
    newPosts.sort((a, b) => b.created_at - a.created_at)
    showPosts.value = newPosts
  }
}
</script>

<template>
  <div class="flex pb-[70px]">
    <div class="w-[200px] h-[80vh] p-5">
      <div class="border border-gray-300 border-solid rounded-sm text-center">
        <h2 class="text-lg font-bold p-3 border-b-gray-300 border-b border-solid">文章分類</h2>
        <ul class="py-2 px-4">
          <li v-for="category in categories" :key="category" @click="handleCategoryClick(category)"
            :class="[{ 'text-themeColor': currentCategory === category }, 'py-2 border-b-gray-300 border-b border-solid last:border-none cursor-pointer']">
            {{ category }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1 p-5">
      <div class="mb-5">
        <select @change="handleSelect"
          class="border border-solid border-gray-300 w-[200px] rounded-sm p-1 focus:outline-0">
          <option v-for="method in sortMethod" :key="method.value" :value="method.value">{{ method.option }}</option>
        </select>
      </div>
      <div class="flex flex-wrap">
        <MyPost v-for="post in showPosts" :key="post.id" class='mr-5 mb-5' :avatar="post.author.image"
          :cover="post.cover" :time="post.created_at" :title="post.title" :likesNum="post.action.likes"
          :commentNum="post.action.comments.length" :author="post.author.name"
          @click="router.push(`/post/${post.id}`)" />
      </div>
    </div>
  </div>
</template>