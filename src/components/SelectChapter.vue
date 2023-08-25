<template>
  <div
    class="fixed flex items-center gap-1 justify-center inset-x-0 bottom-0 shadow-lg bg-neutral bg-opacity-60 py-4"
  >
    <button
      @click="handlePreChap()"
      :disabled="currentIndex === chapters.length - 1"
      class="btn btn-primary btn-sm"
    >
      <i class="bx bx-chevron-left"></i>
    </button>
    <div @click="handleOpenModal()" class="select select-sm cursor-pointer">
      <div>{{ chapters[currentIndex].name }}</div>
    </div>
    <button @click="handleNextChap()" :disabled="currentIndex === 0" class="btn btn-primary btn-sm">
      <i class="bx bx-chevron-right"></i>
    </button>
  </div>

  <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-80 overflow-y-auto px-4">
      <button
        class="btn btn-sm"
        :class="{ 'btn-outline': chapter.id != chapterId, 'btn-primary': chapter.id == chapterId }"
        @click="handleReadView(chapter.id)"
        :key="index"
        v-for="(chapter,index) in chapters"
      >
        {{ chapter.name }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  chapters: {
    type: Array,
    default: []
  },
  chapterId: {
    type: String,
    default: ''
  },
  comicId: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const modalActive = ref(null)

const toggleModal = () => {
  modalActive.value = !modalActive.value
}

// const scrollToButton = (index) => {
//   const buttonElement = scrollContainer?.value?.querySelectorAll('button')[index]
//   buttonElement?.scrollIntoView({ behavior: 'smooth' })
// }

const currentIndex = ref(props.chapters.findIndex((item) => item.id == props.chapterId))

watch(props, () => {
  const index = props.chapters.findIndex((item) => item.id == props.chapterId)
  currentIndex.value = index
})

const handleOpenModal = () => {
  modalActive.value = true
}

const handleNextChap = () => {
  handleReadView(props.chapters[currentIndex.value - 1].id)
}

const handlePreChap = () => {
  handleReadView(props.chapters[currentIndex.value + 1].id)
}

const handleReadView = (id) => {
  router.push({ name: 'read', params: { comicId: props.comicId, chapterId: id } })
}


</script>
