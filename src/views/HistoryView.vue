<template>
  <div class="max-w-[1200px] mx-auto px-2 pt-4 min-h-[calc(100vh-64px)]">
    <h1 class="text-xl md:text-2xl font-medium">Lịch sử đọc truyện</h1>

    <div
      v-if="!isLoading"
      class="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
    >
      <Card4
        :data="comic"
        v-for="comic in data"
        :chapter-id="historyComics.find((item) => item.comicId == comic.id)?.chapterId"
      />
    </div>

    <div v-if="!isLoading && historyComics.length == 0">Chưa có lịch sử đọc truyện</div>

    <div
      v-if="isLoading"
      class="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
    >
      <Card4 v-for="comic in Array.from(Array(36).keys())" :key="comic" :skeleton="true" />
    </div>
  </div>
</template>

<script setup>
import ComicsApi from '../services/ComicsApi'
import { useQuery } from '@tanstack/vue-query'
import Card4 from '../components/cards/Card4.vue'

const historyComics = localStorage?.getItem('history-comics')
  ? JSON.parse(localStorage?.getItem('history-comics'))
  : []

const { isLoading, data } = useQuery({
  queryKey: ['history', historyComics],
  queryFn: () => Promise.all(historyComics.map((item) => ComicsApi.getComicById(item.comicId)))
})
</script>
