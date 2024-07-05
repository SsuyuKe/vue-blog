import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import router from './router';
import '@/assets/css/style.css'
import '@/mock/index'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persist)

app.use(router).use(pinia).use(Antd).mount('#app')
