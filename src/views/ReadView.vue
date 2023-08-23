<template>
  <div v-if="!isLoading" class="max-w-[800px] mx-auto">
    <div className="text-lg breadcrumbs">
      <ul>
        <li>
          <RouterLink :to="{ name: 'comic', params: { id: comicId } }">
            <a>{{ data.comic_name }}</a>
          </RouterLink>
        </li>
        <li><a>{{ data.chapter_name }}</a></li>
      </ul>
    </div>
    <div v-for="image in data.images">
      <img :src="image.src" alt="" class="w-full rounded" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import ComicsApi from '../services/ComicsApi'

const route = useRoute()

const { comicId, chapterId } = route.params

const { isLoading, data } = useQuery(['read', comicId, chapterId], () =>
  ComicsApi.getReadByComicIdAndChapterId({ comicId, chapterId })
)
</script>
