<template>
  <div v-if="!skeleton">
    <div class="rounded aspect-square" @click="handleViewComic(data.id)">
      <img class="w-full rounded h-full object-cover" :src="data.thumbnail" />
    </div>
    <div class="bg-neutral text-base-100 px-2 py-2">
      <div class="link link-hover line-clamp-1 font-medium" @click="handleViewComic(data.id)">
        {{ data.title }}
      </div>

      <div class="flex items-center justify-between text-xs line-clamp-1">
        <div class="link link-hover" @click="handleViewChapter(data.id, data.last_chapter.id)">{{ data.last_chapter.name }}</div>
        <div>{{ data.updated_at }}</div>
      </div>
    </div>
  </div>

  <!-- Loading Skeleton -->
  <div v-if="skeleton" class="animate-pulse">
    <div class="rounded aspect-square bg-gray-200">
      <img class="w-full rounded h-full object-cover" />
    </div>
    <div class="bg-neutral text-base-100 px-2 py-2">
      <div class="link link-hover line-clamp-1 font-medium bg-gray-200 max-w-[50%]"></div>

      <div class="flex items-center h-10 justify-between text-sm line-clamp-1">
        <div class="bg-gray-200 max-w-[30%]"></div>
        <div class="bg-gray-200 max-w-[20%]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  skeleton: {
    type: Boolean,
    default: false
  }
})

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
