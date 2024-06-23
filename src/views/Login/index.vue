<script setup>
import Layout from '@/components/Layout.vue'
import { message } from 'ant-design-vue';
import { reactive, onMounted, ref } from 'vue'
import { userApi } from '@/api/user'
import { setToken, getToken } from '@/utils/localStorage'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToHome = () => {
  router.push('/')
}
const formData = reactive({
  username: '',
  password: ''
})
// username: 'emilys',
//  password: 'emilyspass',
const token = ref(getToken())

const submit = async(e) => {
  e.preventDefault()
  try {
    const { code, data } = await userApi.login(username, password)
    if (code === 200) {
      const { token } = data
      setToken(token)
      message.success('登入成功')
      goToHome()
    }
  } catch(err) {
    message.error('使用者名稱或密碼錯誤')
  }
}

onMounted(() => {
  if (token.value) {
    goToHome()
  }
})
</script>

<template>
  <layout>
    <form @submit="submit" class="flex flex-col items-center my-[300px] w-[400px] mx-auto">
      <div class="flex mb-4">
        <label class="w-[100px] block text-left mr-2" for="username">使用者名稱</label>
        <input type="text" v-model="formData.username" id="username"
          class="px-2 py-1 w-56 rounded bg-gray-100 focus:outline-0" />
      </div>
      <div class="flex mb-4">
        <label class="w-[100px] block text-left mr-2" for="password">密碼</label>
        <input type="password" v-model="formData.password" id="password"
          class="px-2 py-1 w-56 rounded bg-gray-100 focus:outline-0" />
      </div>
      <button
        class="px-5 py-1 bg-themeColor rounded-sm text-white disabled:bg-gray-200 disabled:text-gray-300 cursor-pointer"
        type="submit" :disabled="!formData.username || !formData.password">登入</button>
    </form>
  </layout>
</template>

<style scoped>

</style>

