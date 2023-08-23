<template>
  <div class="max-w-[1200px] mx-auto px-2">
    <h1 class="text-xl md:text-2xl font-medium">Thể loại</h1>
    <div class="mt-2 border-t border-b">
      <swiper v-if="!isLoadingRequest" slides-per-view="auto">
        <swiper-slide class="!w-auto" v-for="genre in genres" :key="genre.id">
          <div
            class="btn focus:outline-none rounded-none"
            @click="handleChangeType(genre.id)"
            :class="{
              'btn-primary': handleCheckActiveType(genre.id),
              'btn-ghost': !handleCheckActiveType(genre.id)
            }"
          >
            {{ genre.name }}
          </div>
        </swiper-slide>
      </swiper>

      <swiper v-if="isLoadingRequest" slides-per-view="auto" class="animate-pulse">
        <swiper-slide class="!w-auto" v-for="genre in Array.from(Array(20).keys())" :key="genre">
          <div
            class="btn btn-ghost focus:outline-none w-[100px] btn-square rounded-none mt-1 bg-gray-200"
          ></div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="alert alert-success bg-neutral text-base-100 rounded-none mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span v-if="typeDescription">{{ typeDescription }}</span>
      <div v-if="!typeDescription" class="animate-pulse w-full h-full">
        <div class="bg-gray-200 max-w-[80%] h-full"></div>
      </div>
    </div>

    <Section2 :page="page" :data="data" :is-loading="isLoading" :handle-change-page="handleChangePage"/>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useStore } from 'vuex'
import { computed, ref, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import ComicsApi from '../services/ComicsApi'
import Section2 from '../components/sections/Section2.vue'

const route = useRoute()
const router = useRouter()

const store = useStore()

const page = ref(+route.query?.page || 1)

const genres = computed(() => store.state.genres)
const isLoadingRequest = computed(() => store.state.isLoading)


const typeId = ref(route.query.type || 'all')

const handleGetDescription = (id) => {
  const genre = genres.value.find((item) => item.id === id)
  return genre?.description || ''
}


const typeDescription = ref(handleGetDescription(typeId.value))

const { isLoading, data } = useQuery({
  queryKey: ['genre', typeId, page],
  queryFn: () => ComicsApi.getByGenreId({ page: +page.value, id: typeId.value })
})

const handleChangePage = (newPage) => {
  page.value = +newPage
  router.push({
    name: 'genre',
    query: {
      ...route.query,
      page: newPage
    }
  })
}


watch(route,() => {
  typeId.value = route.query.type || 'all'
  typeDescription.value = handleGetDescription(typeId.value)
})

watch(genres, () => {
  typeDescription.value = handleGetDescription(typeId.value)
})

watch(typeId, () => {
  typeDescription.value = handleGetDescription(typeId.value)
})

const handleChangeType = (value) => {
  typeId.value = value
  page.value = 1
  router.push({
    name: 'genre',
    query: {
      type: value
    }
  })
}
const handleCheckActiveType = (value) => typeId.value === value
</script>
