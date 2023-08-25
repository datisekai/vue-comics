<script setup>
import { RouterView, useRouter } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

const router = useRouter()

router.afterEach(() => {
  document.querySelectorAll('details').forEach((item) => (item.open = false))

  document.getElementById('drawer-sidebar').checked = false
  document.getElementById('drawer-search').checked = false
  document.getElementById('drawer-ui').checked = false
})

const theme = localStorage.getItem('theme') || 'light'
document.getElementById('app').setAttribute('data-theme', theme)

</script>

<template>
  <Header />
  <div class="pb-5 min-h-[calc(100vh-64px)]">
    <RouterView />
  </div>
  <Footer />
</template>
