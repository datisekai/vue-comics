<template>
  <div @click="handleViewComic" class="hover:cursor-pointer flex items-center mt-2 gap-2">
    <div class="hover:cursor-pointer aspect-square w-[50px]">
      <img v-lazy="{ src: data.thumbnail }" class="w-full h-full object-cover rounded" alt="" />
    </div>
    <div class="flex-1">
      <h2 class="font-medium link link-hover line-clamp-1">
        {{ data.title }}
      </h2>
      <h2 class="mt-1">{{ data.lastest_chapter }}</h2>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

const router = useRouter()

const handleViewComic = () => {
  router.push({
    name: 'comic',
    params: {
      id: props.data.id
    }
  })
}
</script>
