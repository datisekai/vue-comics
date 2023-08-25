<template>
  <div class="navbar bg-base-100 z-[50] max-w-[1200px] mx-auto px-2">
    <div class="navbar-start">
      <div className="drawer block lg:hidden w-auto">
        <input id="drawer-sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <label htmlFor="drawer-sidebar" className="btn btn-ghost btn-sm drawer-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-[50]">
          <label htmlFor="drawer-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full space-y-1 bg-base-200 text-base-content">
            <RouterLink to="/" active-class="header-active-router">
              <li><a>Trang chủ</a></li>
            </RouterLink>
            <li tabIndex="{0}">
              <details>
                <summary>Thể loại</summary>
                <ul class="p-2 max-h-[200px] overflow-y-auto overflow-x-hidden">
                  <li
                    v-if="!isLoading"
                    v-for="genre in genres"
                    @click="handleGenre(genre)"
                    :key="genre.id"
                  >
                    <a>{{ genre.name }}</a>
                  </li>
                  <li v-if="isLoading">
                    <a
                      class="loading loading-dots loading-xs md:loading-sm text-center mx-auto block"
                    ></a>
                  </li>
                </ul>
              </details>
            </li>
            <RouterLink active-class="header-active-router" to="/truyen-moi">
              <li><a>Truyện mới</a></li>
            </RouterLink>
            <RouterLink active-class="header-active-router" to="/truyen-top">
              <li><a>Truyện TOP</a></li>
            </RouterLink>
          </ul>
        </div>
      </div>

      <RouterLink to="/">
        <a class="btn btn-ghost normal-case text-xl">VueComics</a>
      </RouterLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 space-x-1 z-[50]">
        <RouterLink to="/" active-class="header-active-router">
          <li><a>Trang chủ</a></li>
        </RouterLink>
        <li tabIndex="{0}">
          <details>
            <summary>Thể loại</summary>
            <ul class="p-2 max-h-[200px] max-w-md rounded overflow-y-auto overflow-x-hidden">
              <li
                v-if="!isLoading"
                v-for="genre in genres"
                @click="handleGenre(genre)"
                :key="genre.id"
              >
                <a>{{ genre.name }}</a>
              </li>
              <li v-if="isLoading" class="w-[148px]">
                <a
                  class="loading loading-dots loading-xs md:loading-sm text-center mx-auto block"
                ></a>
              </li>
            </ul>
          </details>
        </li>
        <RouterLink active-class="header-active-router" to="/truyen-moi">
          <li><a>Truyện mới</a></li>
        </RouterLink>
        <RouterLink active-class="header-active-router" to="/truyen-top">
          <li><a>Truyện TOP</a></li>
        </RouterLink>
      </ul>
    </div>
    <div class="navbar-end">
      <div class="drawer drawer-end w-auto">
        <input id="drawer-ui" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for="drawer-ui" class="drawer-button">
            <div class="tooltip tooltip-left" data-tip="Giao diện">
              <div class="btn btn-ghost btn-sm">
                <i class="bx bx-palette bx-sm"></i>
              </div>
            </div>
          </label>
        </div>
        <div class="drawer-side z-[100]">
          <label for="drawer-ui" class="drawer-overlay"></label>
          <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <li @click="handleApplyTheme(color)" class="rounded" :class="{'bg-primary':color === theme,'text-base-100':color === theme}" v-for="color in dataTheme" :key="color">
              <a class="capitalize">{{ color }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tooltip tooltip-left" data-tip="Lịch sử">
        <RouterLink to="/lich-su">
          <button class="btn btn-ghost btn-sm">
            <i class="bx bx-sm bx-history"></i>
          </button>
        </RouterLink>
      </div>
      <div class="drawer drawer-end w-auto">
        <input id="drawer-search" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for="drawer-search" class="drawer-button">
            <div class="tooltip tooltip-left" data-tip="Tìm kiếm">
              <div class="btn btn-ghost btn-sm">
                <i class="bx bx-sm bx-search"></i>
              </div>
            </div>
          </label>
        </div>
        <div class="drawer-side z-[100]">
          <label for="drawer-search" class="drawer-overlay"></label>
          <div class="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <h1 class="font-medium text-lg md:text-xl">Tìm kiếm</h1>
            <div class="join mt-4">
              <input
                class="input input-bordered join-item"
                v-model="searchQuery"
                @input="getSearchResults"
                placeholder="Tìm kiếm"
              />
              <button class="btn join-item btn-primary rounded-r-full">
                <i class="bx bx-search bx-sm"></i>
              </button>
            </div>
            <div v-if="searchResults" class="space-y-1">
              <Card3 v-for="result in searchResults" :data="result" :key="result.id" />
            </div>

            <div v-if="searchResults?.length == 0" class="mt-2">
              <p>Không có kết quả phù hợp</p>
            </div>

            <div v-if="searchError" class="mt-2">
              <p>Có lỗi xảy ra, vui lòng thử lại sau</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ComicsApi from '../services/ComicsApi'
import Card3 from '../components/cards/Card3.vue'
import dataTheme from '../constants/dataTheme'

const store = useStore()
const theme = ref(localStorage.getItem('theme') || 'light')

onMounted(() => {
  store.dispatch('getGenres')
})

const genres = computed(() => store.state.genres)
const isLoading = computed(() => store.state.isLoading)

const searchQuery = ref('')
const queryTimeout = ref(null)
const searchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const results = await ComicsApi.getComicSearchSuggest(searchQuery.value)
        searchResults.value = results
      } catch {
        searchError.value = true
      }

      return
    }
    searchResults.value = null
  }, 300)
}

const router = useRouter()

const handleGenre = (genre) => {
  router.push({
    name: 'genre',
    query: {
      type: genre.id
    }
  })
}

const handleApplyTheme = (color) => {
  theme.value = color;
  localStorage.setItem('theme', color)

  document.getElementById('app').setAttribute('data-theme', color)
}


</script>
