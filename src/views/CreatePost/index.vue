<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { usePostStore } from '@/store/post'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const postStore = usePostStore()

const formData = reactive({
  title: '',
  category: '',
  cover: '',
  desc: '',
})

const handleImageChange = (e) => {
  const file = e.target.files[0]; // filList
  if (file) {
    const imageURL = URL.createObjectURL(file)
    formData.cover = imageURL
  }
}
const submit = (e) => {
  e.preventDefault()
  const newPost = {
    id: Math.floor(Math.random()),
    title: formData.title,
    category: formData.category,
    cover: formData.cover,
    desc: formData.desc,
    action: { likes: 0, comments: [] },
    author: {
      name: userStore.userInfo.user,
      image: userStore.userInfo.image
    },
    created_at: Math.floor(Date.now() / 1000)
  }
  postStore.setPosts([newPost, ...postStore.posts])
  router.push('/posts')
}
</script>

<template>
  <div className="pt-5 pb-[120px]">
    <h2 className="text-xl mb-5">發表文章</h2>
    <form className="flex flex-col" @submit="submit">
      <input v-model="formData.title" className="border-gray-300 border border-solid
      px-3
      py-2 mb-3 focus:outline-0" placeholder="請輸入文章標題" type="text" />
      <select v-model="formData.category" className="border-gray-300 border
        border-solid mb-3 px-3 py-2 focus:outline-0" name="" id="">
        <option defaultChecked>選擇分類</option>
        <option value="甜點">甜點</option>
        <option value="咖啡">咖啡</option>
      </select>
      <textarea v-model="formData.desc"
        className="border-gray-300 border border-solid resize-none focus:outline-none px-3 py-2 mb-5 h-[400px]" id=""
        placeholder="今天想寫些什麼...">
        </textarea>
      <div className="mb-5 flex">
        <label htmlFor="cover-upload"
          className="mr-3 relative w-16 h-16 rounded-full border-gray-300 border border-solid">
          <i
            className="fa-solid fa-upload absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-themeColor text-lg"></i>
        </label>
        <input id="cover-upload" className="hidden" type="file" accept="image/*" @change="handleImageChange" />
        <img v-if="formData.cover" :src="formData.cover" alt="preview"
          className="border-themeColor border border-solid w-16 h-16 rounded-full object-cover" />
      </div>
      <button
        className="px-5 py-2 bg-themeColor rounded-sm text-white disabled:bg-gray-200 disabled:text-gray-300 cursor-pointer">發表文章</button>
    </form>
  </div>
</template>

<style scoped>

</style>

