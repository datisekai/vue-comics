<script setup>
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Section1 from '../components/sections/Section1.vue'
import Section2 from '../components/sections/Section2.vue'
import ComicsApi from '../services/ComicsApi'

const route = useRoute()
const router = useRouter()

const page = ref(route.query.page || 1)

const handleChangePage = (newPage) => {
  page.value = +newPage
  router.push({
    name: 'home',
    query: {
      page: newPage
    }
  })
}

const { isLoading, data } = useQuery({
  queryKey: ['updates', page],
  queryFn: () => ComicsApi.getRecentUpdate(+page.value)
})
</script>

<template>
  <main>
    <Section1 />
    <Section2 :handleChangePage="handleChangePage" :page="+page" title="Truyện mới cập nhật" :data="data" :isLoading="isLoading" />
  </main>
</template>
