import { createApp } from 'vue'
import '@/assets/css/style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router';

const app = createApp(App)

app.use(router).use(Antd).mount('#app')
