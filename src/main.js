import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router';
import '@/assets/css/style.css'
import '@/mock/index'

const app = createApp(App)

app.use(router).use(Antd).mount('#app')
