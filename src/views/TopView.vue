<template>
  <div class="max-w-[1200px] px-2 mx-auto">
    <div class="mt-4 flex items-center gap-2">
      <button
        class="btn focus:outline-none"
        @click="handleChangeTab(tab.value)"
        :class="{ 'btn-primary': handleCheckActiveTab(tab.value) }"
        :key="tab.value"
        v-for="tab in tabs"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs mt-4">
      <a
        class="tab tab-bordered capitalize tab-lg"
        :class="{ 'tab-active': handleCheckActiveFilter(fil) }"
        @click="handleChangeFilter(fil)"
        v-for="fil in filters"
        >{{ fil }}</a
      >
    </div>

    <Section2 :handle-change-page="handleChangePage" :data="data" :is-loading="isLoading" :page="page"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ComicsApi from '../services/ComicsApi'
import { useQuery } from '@tanstack/vue-query';
import Section2 from '../components/sections/Section2.vue';

const tabs = [
  { label: 'Top Comics', value: 'all' },
  { label: 'Top Daily', value: 'daily' },
  { label: 'Top Weekly', value: 'weekly' },
  { label: 'Top Monthly', value: 'monthly' },
  { label: 'Top Chapter', value: 'chapter' },
  { label: 'Top Follow', value: 'follow' },
  { label: 'Top Comment', value: 'comment' }
]

const filters = ['all', 'completed', 'ongoing']

const route = useRoute()
const router = useRouter()

const page = ref(route.query.page || 1)
const tab = ref(route.query.tab || 'all')
const filter = ref(route.query.filter || 'all')

const handleChangeTab = (value) => {
  tab.value = value
  router.push({
    name: 'top',
    query: {
      ...route.query,
      tab: value
    }
  })
}

const handleChangeFilter = (value) => {
  filter.value = value
  router.push({
    name: 'top',
    query: {
      ...route.query,
      filter: value
    }
  })
}

const handleCheckActiveTab = (value) => {
  return tab.value === value
}

const handleCheckActiveFilter = (value) => {
  return filter.value === value
}

const handleChangePage = (newPage) => {
  page.value = +newPage
  router.push({
    name: 'top',
    query: {
      ...route.query,
      page: newPage
    }
  })
}

const { isLoading, data } = useQuery({
  queryKey: ['top', page, filter, tab],
  queryFn: () => ComicsApi.getTop({ page: page.value, tab: tab.value, status: filter.value })
})
</script>
