import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore(
  'post',
  () => {
    const posts = ref([])
    const collection = ref([])
    const setPosts = (items) => {
      posts.value = items
    }
    const setCollection = (posts) => {
      collection.value = posts
    }

    return {
      posts,
      collection,
      setPosts,
      setCollection
    }
  },
  {
    persist: true
  }
)