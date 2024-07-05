<script setup>
import IconButton from '@/components/IconButton.vue'
import { useRouter } from 'vue-router'
import { postApi } from '@/api/post'
import { onMounted, ref, computed } from 'vue'
import HotCard from '@/components/HotCard.vue'
import Tab from '@/components/Tab.vue'
import PostCard from '@/components/PostCard.vue'
import { setStoragePosts, getStoragePosts } from '@/utils/localStorage'
import { usePostStore } from '@/store/post'

const postStore = usePostStore()

const router = useRouter()
const changePage = (url) => {
  router.push(url)
}
// 列表渲染 v-for => key(唯一值、獨一無二) 標示每個渲染的元素
const carouselImages = [
  'https://plus.unsplash.com/premium_photo-1718479227189-d5f36431b2a8?q=80&w=1537&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1718152220007-6fb2c02fec95?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1565006111656-06a8a9c8f53b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const searchData = [
  {
    title: '甜點工作坊',
    image: 'https://images.unsplash.com/flagged/photo-1558013276-d925ddb73271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfHhqUFI0aGxrQkdBfHxlbnwwfHx8fHw%3D'
  },
  {
    title: '下午茶',
    image: 'https://plus.unsplash.com/premium_photo-1689245691846-c152a885f5ad?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExMXx4alBSNGhsa0JHQXx8ZW58MHx8fHx8'
  }
]
const tabData = [
  {
    key: 'recommend',
    label: '推薦'
  },
  {
    key: 'dessert',
    label: '甜點'
  },
  {
    key: 'coffee',
    label: '咖啡'
  },
]

const activeKey = ref(tabData[0].key)
const posts = ref(postStore.posts)
const hotPosts = ref([])

const getHotPosts = async () => {
  const { code, data } = await postApi.getHotPosts()
  if (code === 200) {
    // 頁面渲染
    hotPosts.value = data
  }
}

const getPosts = async() => {
  const { code, data } = await postApi.getPosts()
  if (code === 200) {
    // 頁面渲染
    posts.value = data
    // 存進資料庫
    postStore.setPosts(data)
  }
}
const changeTabKey = (key) => {
  changePage(1)
  activeKey.value = key
}

const filterPosts = computed(() => {
  if (activeKey.value === 'recommend') {
    return postStore.posts
  }
  return postStore.posts.filter(post => post.categoryKey === activeKey.value)
})

const PAGE_SIZE = 5 // 數據數量/每頁
const currentPage = ref(1) // 當前頁碼
const changeCurrentPage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  getHotPosts()
  if (!posts.value.length) {
    getPosts()
  }
})
</script>

<template>
  <a-carousel autoplay>
    <div v-for="(image, idx) in carouselImages" :key="idx" class='h-96'>
      <img class='w-full h-96 object-cover' :src="image" alt="image" />
    </div>
  </a-carousel>
  <h2 class='text-xl font-bold my-4'>超熱搜話題</h2>
  <div class='flex'>
    <IconButton v-for="item in searchData" @icon-click="changePage(`/search?keyword=${item.title}`)" :key="item.title"
      :image="item.image" class='mr-3 last:mr-0'>
      {{ item.title }}
    </IconButton>
  </div>
  <h2 class='text-xl font-bold my-4'>本日熱門</h2>
  <div class='flex flex-wrap -mx-2'>
    <template v-for="(post, idx) in hotPosts" :key="post.id">
      <div v-if="idx < 5" class='w-1/5 px-2 mb-4 last:mb-0'>
        <HotCard :id="post.id" :cover="post.cover" :avatar="post.author.image" :author="post.author.name"
          :time="post.created_at" :title="post.title" :category="post.category"
          :comment-num="post.action.comments.length" @page-click="changePage(`/post/${post.id}`)" />
      </div>
    </template>
  </div>
  <div class='mt-5 flex flex-col items-center'>
    <div class='w-[700px] mb-5'>
      <Tab v-for="tab in tabData" :key="tab.key" :tab-key="tab.key" class='mr-3 last:mr-0' :activeKey="activeKey"
        @tab-click="changeTabKey">
        {{ tab.label }}
      </Tab>
    </div>
    <PostCard v-for="post in filterPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * 5)" @card-click="changePage(`/post/${post.id}`)" :key="post.id" :id="post.id"
      :theme="post.theme" :time="post.created_at" :title="post.title" :desc="post.desc" :like-num="post.action.likes"
      :comment-num="post.action.comments.length" :cover="post.cover" :avatar="post.author.image" />
    <a-pagination class="mb-5" v-model:current="currentPage" :total="filterPosts.length" :pageSize="PAGE_SIZE"
      @change="changeCurrentPage" show-less-items />
  </div>
</template>

<style scoped>
</style>

