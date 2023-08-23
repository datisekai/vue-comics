<template>
  <div v-if="!skeleton">
    <div class="rounded aspect-square relative">
      <img class="w-full rounded h-full object-cover" :src="data.thumbnail" />
      <div
        class="px-2 py-2 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black text-base-100"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center uppercase gap-1">
            <i class="bx bx-street-view"></i>
            <span> {{ formatNumber(data.total_views) }}</span>
          </div>
          <div class="flex items-center uppercase gap-1">
            <i class="bx bxs-heart"></i>
            <span> {{ formatNumber(data.followers) }}</span>
          </div>
        </div>
        <swiper slides-per-view="auto" :grab-cursor="true" class="border-t">
          <swiper-slide class="!w-auto px-1" v-for="genre in data.genres" :key="genre.id">
            <span @click="handleChangeType(genre.id)" class="text-sm link link-hover">{{
              genre.name
            }}</span>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="px-2 py-2">
      <div class="link link-hover line-clamp-1 font-medium" @click="handleViewComic(data.id)">{{ data.title }}</div>

      <div class="flex items-center justify-between text-sm">
        <div @click="handleViewChapter(data.id, data.last_chapter.id)" class="link link-hover">{{ data.last_chapter.name }}</div>
        <div>{{ data.updated_at }}</div>
      </div>
    </div>
  </div>

  <div v-if="skeleton" class="animate-pulse">
    <div class="rounded aspect-square relative bg-gray-200">
      <img class="w-full rounded h-full object-cover" />
      <div
        class="flex items-center justify-between h-10 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black text-base-100"
      >
        <div class="max-w-[40%] bg-gray-200 flex items-center uppercase gap-1">
          <span></span>
        </div>
        <div class="flex items-center uppercase max-w-[40%] bg-gray-200 gap-1">
          <span></span>
        </div>
      </div>
    </div>
    <div class="px-2 py-2 w-full">
      <div class="link link-hover line-clamp-1 font-medium max-w-[70%] bg-gray-200"></div>

      <div class="flex items-center justify-between text-sm">
        <div class="bg-gray-200 max-w-[30%]"></div>
        <div class="bg-gray-200 max-w-[30%]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import formatNumber from '../../constants/formatNumber'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  skeleton: {
    type: Boolean,
    default: false
  }
})

const handleChangeType = (id) => {
  router.push({
    name: 'genre',
    query: {
      type: id
    }
  })
}

const handleViewComic = (id) => {
  router.push({
    name: 'comic',
    params: {
      id
    }
  })
}

const handleViewChapter = (comicId, chapterId) => {
  router.push({
    name: 'read',
    params: {
      comicId,
      chapterId
    }
  })
}
</script>
