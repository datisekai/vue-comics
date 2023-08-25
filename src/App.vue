<script setup>
import { RouterView, useRouter } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

const router = useRouter()

router.afterEach(() => {
  document.querySelectorAll('details').forEach((item) => (item.open = false))

  document.getElementById('drawer-sidebar').checked = false
  document.getElementById('drawer-search').checked = false
})
</script>

<template>
  <Header />
  <div class="pb-5">
    <RouterView />
  </div>
  <Footer />
</template>
