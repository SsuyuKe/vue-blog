<script setup>
import Logo from '@/assets/images/logo.png'
import { useUserStore } from '@/store/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
import ArrowToTop from '@/components/ArrowToTop.vue'

const router = useRouter()
const changePage = (url) => {
  router.push(url)
}

const userStore = useUserStore()

const isDarkTheme = computed(() => userStore.isDarkTheme)
const changeTheme = (isDark) => {
  userStore.setIsDarkTheme(isDark)
  const messageText = isDark ? '暗黑模式' : '明亮模式'
  message(messageText)
}
const token = computed(() => userStore.token)

const logout = () => {
  userStore.setToken('')
  message.success('登出成功')
}
</script>
<template>
  <div :class="{ darkMode: isDarkTheme }">
    <div class='border-b border-gray-200 border-solid h-20 flex items-center'>
      <div class='container mx-auto'>
        <div class='flex items-center justify-between'>
          <div class='flex items-center'>
            <img @click="changePage('/')" class="cursor-pointer" :src="Logo" alt="logo" />
            <div class='bg-gray-100 rounded-lg overflow-hidden px-3 leading-10 h-10'>
              <i class="fa-solid fa-magnifying-glass text-gray-300 mr-2" />
              <input class='bg-gray-100 w-72 focus:outline-0' type="text" placeholder='全站搜尋' />
            </div>
          </div>
          <div class='flex items-center'>
            <button @click="changePage('/create-post')" class='bg-themeColor px-2 py-1 mr-3 rounded
              text-white'>
              <i class="fa-solid fa-pen"></i>
              <span class='ml-2'>發表貼文</span>
            </button>
            <ul class='flex items-center text-lg'>
              <li @click="changePage('/posts')" class='mr-3 cursor-pointer px-2 py-1 hover:bg-gray-200
                rounded'>
                <i class="fa-regular fa-pen-to-square"></i>
              </li>
              <li class='mr-3 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded'>
                {{ 'En' }}</li>
              <li class='mr-3 cursor-pointer'>
                <button @click="changeTheme(false)" v-if="isDarkTheme" class='px-2 py-1 rounded hover:bg-gray-200'>
                  <i class="fa-solid fa-moon"></i>
                </button>
                <button @click="changeTheme(true)" v-else class='px-2 py-1 rounded hover:bg-gray-200'>
                  <i class="fa-regular fa-moon"></i>
                </button>
              </li>
              <li class='cursor-pointer'>
                <button v-if="token" @click="logout" class='px-2 py-1 rounded hover:bg-gray-200'>登出</button>
                <button v-else @click="changePage('/login')" class='px-2 py-1 rounded hover:bg-gray-200'>登入</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class='center-bg container mx-auto'>
      <slot />
    </div>
    <div class='bg-gray-200 py-3'>
      <p class='text-center text-sm border-t border-gray-200 border-solid'>©2024 ssuyuke All Rights Reserved.</p>
    </div>
    <arrow-to-top />
  </div>
</template>

<style scoped>

</style>