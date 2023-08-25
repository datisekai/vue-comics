<template>
  <div v-if="!isLoading" class="max-w-[800px] mx-auto px-2">
    <div class="text-sm md:text-lg breadcrumbs">
      <ul>
        <li>
          <RouterLink :to="{ name: 'comic', params: { id: ids.comicId } }">
            <a class="font-medium">{{ data.comic_name }}</a>
          </RouterLink>
        </li>
        <li>
          <a class="font-medium">{{ data.chapter_name }}</a>
        </li>
      </ul>
    </div>
    <div v-for="image in data.images">
      <img v-lazy="{ src: image.src }" alt="" class="w-full rounded" />
    </div>

    <SelectChapter :chapters="data.chapters" :chapterId="ids.chapterId" :comicId="ids.comicId" />
  </div>

  <div v-if="isLoading" class="animate-pulse max-w-[800px] mx-auto px-2">
    <div class="max-w-[70%] h-5 bg-gray-200"></div>
    <div class="mt-2 w-full h-20 bg-gray-200" v-for="img in Array.from(Array(36).keys())"></div>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import ComicsApi from '../services/ComicsApi'
import SelectChapter from '../components/SelectChapter.vue'
import { ref, watch, reactive } from 'vue'

const route = useRoute()

const ids = reactive(route.params)
const handleLocalStorage = ({ comicId, chapterId }) => {
  const historyComics = localStorage?.getItem('history-comics')
    ? JSON.parse(localStorage?.getItem('history-comics'))
    : []

  const isExist = historyComics.some((item) => item.comicId == comicId)

  localStorage.setItem(
    'history-comics',
    JSON.stringify(
      isExist
        ? historyComics.map((item) => (item.comicId == comicId ? { ...item, chapterId } : item))
        : [{ comicId, chapterId }, ...historyComics]
    )
  )
}

handleLocalStorage(ids)

watch(route, () => {
  handleLocalStorage(route.params)
  Object.assign(ids, route.params)
})

const { isLoading, data } = useQuery(['read', ids], () =>
  ComicsApi.getReadByComicIdAndChapterId({ comicId: ids.comicId, chapterId: ids.chapterId })
)
</script>
