<script setup>
import Logo from '@/assets/images/logo.png'
</script>
<template>
  <div>
    <div class='border-b border-gray-200 border-solid h-20 flex items-center'>
      <div class='container mx-auto'>
        <div class='flex items-center justify-between'>
          <div class='flex items-center'>
            <img class="cursor-pointer" :src="Logo" alt="logo" />
            <div class='bg-gray-100 rounded-lg overflow-hidden px-3 leading-10 h-10'>
              <i class="fa-solid fa-magnifying-glass text-gray-300 mr-2" />
              <input class='bg-gray-100 w-72 focus:outline-0' type="text" placeholder='全站搜尋' />
            </div>
          </div>
          <div class='flex items-center'>
            <button class='bg-themeColor px-2 py-1 mr-3 rounded
              text-white'>
              <i class="fa-solid fa-pen"></i>
              <span class='ml-2'>發表貼文</span>
            </button>
            <ul class='flex items-center text-lg'>
              <li @click="changeLanguage" class='mr-3 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded'>
                {{ 'En' }}</li>
              <li class='mr-3 cursor-pointer'>
                <button v-if="theme === 'darkMode'" class='px-2 py-1 rounded hover:bg-gray-200'>
                  <i class="fa-solid fa-moon"></i>
                </button>
                <button v-else class='px-2 py-1 rounded hover:bg-gray-200' >
                  <i class="fa-regular fa-moon"></i>
                </button>
              </li>
              <li class='cursor-pointer'>
                <button v-if="token" class='px-2 py-1 rounded hover:bg-gray-200'>登出</button>
                <button v-else class='px-2 py-1 rounded hover:bg-gray-200' >登入</button>
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
  </div>
</template>

<style scoped></style>