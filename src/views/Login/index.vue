<script setup>
import { reactive, onMounted, ref } from 'vue'
import { userApi } from '@/api/user'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const formData = reactive({
  username: '',
  password: ''
})

const router = useRouter()
const goToHome = () => {
  router.push('/')
}
const token = ref(userStore.token)

// JWT => 前端 帳號+密碼 => 登入api => 登入成功 => token => 存到本地 localStorage => 登入狀態
// username: 'emilys',
// password: 'emilyspass',
const login = async(e) => {
  e.preventDefault();
  try {
    const { data, code } = await userApi.login(formData.username, formData.password)
    if (code === 200) {
      const { token } = data
      // 放到資料庫
      userStore.setToken(token)
      goToHome()
      message.success('登入成功')
    }
  } catch (err) {
    console.error(err);
    message.error('使用者名稱或密碼錯誤')
  }
}

onMounted(() => {
  if (token.value) { // 登入狀態
    goToHome() // 強制導到首頁
  }
})
</script>

<template>
  <form @submit="login" class="flex flex-col items-center my-[300px] w-[400px] mx-auto">
    <div class="flex mb-4">
      <label class="w-[100px] block text-left mr-2" for="username">使用者名稱</label>
      <input v-model="formData.username" type="text" id="username"
        class="px-2 py-1 w-56 rounded bg-gray-100 focus:outline-0" />
    </div>
    <div class="flex mb-4">
      <label class="w-[100px] block text-left mr-2" for="password">密碼</label>
      <input v-model="formData.password" type="password" id="password"
        class="px-2 py-1 w-56 rounded bg-gray-100 focus:outline-0" />
    </div>
    <button
      class="px-5 py-1 bg-themeColor rounded-sm text-white disabled:bg-gray-200 disabled:text-gray-300 cursor-pointer"
      type="submit" :disabled="!formData.username || !formData.password">登入</button>
  </form>
</template>

<style scoped></style>

