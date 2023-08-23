<script setup>
import { RouterView, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import {watch} from 'vue'

const router = useRouter()

router.afterEach(() => {
  document.querySelectorAll("details").forEach((item) => (item.open = false));

  document.getElementById('drawer-sidebar').checked = false
})



</script>

<template>
  <Header />
  <div class="pb-5">
    <RouterView />
  </div>
</template>
