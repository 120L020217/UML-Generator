import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/styles/index.scss"
import TDesign from 'tdesign-vue-next';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)

// 注册 Vue Router
app.use(router).use(TDesign)

// 挂载应用
app.mount('#app')
