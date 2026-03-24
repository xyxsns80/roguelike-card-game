import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
// Import test utilities for development
import './utils/testCombat'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
