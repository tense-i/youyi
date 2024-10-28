import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import './styles/main.scss'
// 导入pinia
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
