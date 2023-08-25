import './assets/main.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'swiper/css'
import 'swiper/css/navigation'
import '@ocrv/vue-tailwind-pagination/styles'
import store from './vuex/store'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin)
app.use(VueLazyLoad)
app.use(store)

app.mount('#app')
