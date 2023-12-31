<template>
  <div v-if="!isLoading" class="max-w-[1200px] mx-auto px-2">
    <div class="flex items-center flex-col md:flex-row rounded border-4 border-base-100 gap-4">
      <div class="w-full md:w-[20%]">
        <img v-lazy="{ src: data.thumbnail }" class="rounded w-full" />
      </div>
      <div class="space-y-2 flex-1">
        <h1 class="font-bold text-xl md:text-2xl">{{ data.title }}</h1>
        <div class="flex flex-wrap gap-2">
          <button
            @click="handleViewGenre(genre.id)"
            class="btn btn-xs btn-outline btn-primary"
            v-for="genre in data.genres"
          >
            {{ genre.name }}
          </button>
        </div>
        <p>Tác giả: {{ data.authors }}</p>
        <div class="flex items-center gap-4">
          <div class="flex items-center uppercase gap-1">
            <i class="bx bx-street-view"></i>
            <span> {{ formatNumber(data.total_views) }}</span>
          </div>
          <div class="flex items-center uppercase gap-1">
            <i class="bx bxs-heart"></i>
            <span> {{ formatNumber(data.followers) }}</span>
          </div>
        </div>

        <div>
          <p :class="{ 'line-clamp-3': !showMore }">{{ data.description }}</p>
          <button
            @click="handleCollapse"
            class="focus:outline-none btn btn-ghost btn-sm md:hidden md:line-clamp-none"
          >
            {{ showMore ? 'Thu gọn' : 'Xem thêm' }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button class="btn btn-primary focus:outline-none" @click="handleReadFromStart()">
            Đọc ngay
          </button>
          <button
            v-if="readContinue"
            @click="handleReadView(readContinue.chapterId)"
            class="btn btn-secondary focus:outline-none"
          >
            Đọc tiếp
          </button>
        </div>
      </div>
    </div>
    <div v-if="!isFetching">
      <h2 class="text-xl md:text-2xl mt-4 font-medium">Chapter</h2>
      <div class="mt-2 flex items-center gap-2 flex-wrap">
        <button
          v-for="(chapItem, index) in chapters"
          :class="{ 'btn-primary': index === displayChapterIndex }"
          class="btn focus:outline-none"
          @click="handleChangeDisplayIndex(index)"
        >
          {{ chapItem.text }}
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-4 gap-2">
        <button
          class="focus:outline-none btn btn-outline"
          @click="handleReadView(chapter.id)"
          v-for="chapter in chapters[displayChapterIndex]?.data"
        >
          {{ chapter.name }}
        </button>
      </div>
    </div>

    <div v-if="isFetching">
      <h2 class="text-xl h-5 md:text-2xl mt-4 font-medium max-w-[30%] bg-gray-200"></h2>
      <div class="mt-2 flex items-center gap-2 flex-wrap h-5 bg-gray-200 max-w-full"></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-4 gap-2">
        <button
          class="w-full bg-gray-200 h-10"
          v-for="chapter in Array.from(Array(offset).keys())"
        ></button>
      </div>
    </div>
  </div>

  <div v-if="isLoading" class="max-w-[1200px] mx-auto px-2 animate-pulse">
    <div class="flex items-center flex-col md:flex-row rounded border-4 border-base-100 gap-4">
      <div class="w-full md:w-[20%] h-48 bg-gray-200"></div>
      <div class="space-y-2 flex-1 w-full">
        <h1 class="font-bold text-xl bg-gray-200 md:text-2xl max-w-[60%]"></h1>
        <div class="flex flex-wrap gap-2 bg-gray-200 max-w-[90%] h-5"></div>
        <p class="bg-gray-200 max-w-[30%] h-5"></p>
        <div class="flex items-center gap-4">
          <div class="flex items-center h-5 uppercase gap-1 w-10 bg-gray-200"></div>
          <div class="flex items-center h-5 uppercase gap-1 w-10 bg-gray-200"></div>
        </div>

        <div class="max-w-[100%] h-10 bg-gray-200"></div>

        <button class="w-[100px] bg-gray-200 h-5"></button>
      </div>
    </div>
    <div>
      <h2 class="text-xl h-5 md:text-2xl mt-4 font-medium max-w-[30%] bg-gray-200"></h2>
      <div class="mt-2 flex items-center gap-2 flex-wrap h-5 bg-gray-200 max-w-full"></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-4 gap-2">
        <button
          class="w-full bg-gray-200 h-10"
          v-for="chapter in Array.from(Array(offset).keys())"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import ComicsApi from '../services/ComicsApi'
import formatNumber from '../constants/formatNumber'
import { ref, watch, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id)

const showMore = ref(false)
const chapters = ref([])
const displayChapterIndex = ref(0)

const handleCollapse = () => {
  showMore.value = !showMore.value
}

const historyComics = localStorage.getItem('history-comics')
  ? JSON.parse(localStorage.getItem('history-comics'))
  : []

const readContinue = historyComics.find((item) => item.comicId == id.value)

const offset = 50

const { isLoading, data, isFetching } = useQuery(
  ['comic', id],
  () => ComicsApi.getComicById(id.value),
  {
    onSuccess: (data) => {
      const sliceChapters = []
      const sortChapters = data.chapters.reverse()
      for (let i = 0; i < sortChapters.length; i += offset) {
        const nextOffset = i + offset
        const chapterStart = sortChapters[i].name.split(' ')[1] || i
        const chapterEnd =
          sortChapters[
            nextOffset < sortChapters.length ? nextOffset - 1 : sortChapters.length - 1
          ].name.split(' ')[1] || ''

        sliceChapters.push({
          text: `${chapterStart} - ${chapterEnd}`,
          data: sortChapters.slice(i, nextOffset)
        })
      }
      chapters.value = sliceChapters
    }
  }
)

const handleChangeDisplayIndex = (index) => {
  displayChapterIndex.value = index
}

const handleViewGenre = (id) => {
  router.push({
    name: 'genre',
    query: {
      type: id
    }
  })
}

const handleReadView = (chapterId) => {
  router.push({ name: 'read', params: { comicId: id.value, chapterId: chapterId } })
}

const handleReadFromStart = () => {
  if (chapters.value && chapters.value.length > 0 && chapters.value[0].data.length > 0) {
    router.push({
      name: 'read',
      params: { comicId: id.value, chapterId: chapters.value[0].data[0].id }
    })
  }
}
</script>
