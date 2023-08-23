<template>
  <div class="max-w-[1200px] px-2 mx-auto w-full">
    <swiper
      v-if="!isLoading"
      :slides-per-view="1.5"
      :breakpoints="breakpoints"
      :space-between="10"
      :navigation="true"
      :modules="modules"
      :grab-cursor="true"
    >
      <swiper-slide :key="comic.id" v-for="comic in trendings.comics">
        <Card1 :data="comic" :skeleton="false" />
      </swiper-slide>
    </swiper>

     <swiper
      v-if="isLoading"
      :slides-per-view="1.5"
      :breakpoints="breakpoints"
      :space-between="10"
      :navigation="true"
      :modules="modules"
    >
      <swiper-slide  v-for="comic in [1,2,3,4,5,6]">
        <Card1 :skeleton="true" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import Card1 from '../cards/Card1.vue'

import { useQuery } from '@tanstack/vue-query'
import ComicsApi from '../../services/ComicsApi'

const modules = [Navigation]
const breakpoints = {
  576:{
    slidesPerView:2.5
  },
  768: {
    slidesPerView: 3.5
  },
  1024: {
    slidesPerView: 5.5
  }
}
const { isLoading, data: trendings } = useQuery({
  queryKey: ['trending'],
  queryFn: ComicsApi.getTrending
})


</script>
