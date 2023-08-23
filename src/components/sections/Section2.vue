<template>
  <div class="mt-4 max-w-[1200px] mx-auto px-2">
    <h1 v-if="title" class="font-medium text-xl md:text-2xl">{{ title }}</h1>
    <div
      v-if="!isLoading"
      class="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
    >
      <Card2 v-for="comic in data.comics" :data="comic" :key="comic.id" />
    </div>

    <div
      v-if="isLoading"
      class="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2"
    >
      <Card2 v-for="comic in Array.from(Array(36).keys())" :key="comic" :skeleton="true" />
    </div>

    <div class="flex mt-4 items-center justify-center" v-if="!isLoading && data.total_pages > 1">
      <Pagination
        @update:model-value="handleChangePage"
        :model-value="+page"
        show-icons
        previous-label="Trang trước"
        next-label="Trang tiếp"
        :total-pages="data.total_pages"
        class="pagination"
        :slice-length="1"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import { Pagination } from 'flowbite-vue'
import Card2 from '../cards/Card2.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Object
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  page: {
    type: Number,
    default: 1
  },
  handleChangePage:{
    type:Function
  }
})
</script>
