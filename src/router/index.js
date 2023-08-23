import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GenreView from '../views/GenreView.vue'
import ErrorView from '../views/ErrorView.vue'
import TopView from '../views/TopView.vue'
import NewView from '../views/NewView.vue'
import HistoryView from '../views/HistoryView.vue'
import SearchView from '../views/SearchView.vue'
import ComicView from '../views/ComicView.vue'
import ReadView from '../views/ReadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/the-loai',
      name: 'genre',
      component: GenreView
    },
    {
      path: '/truyen-moi',
      name: 'new',
      component: NewView
    },
    {
      path: '/truyen-top',
      name: 'top',
      component: TopView
    },
    {
      path: '/lich-su',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/tim-kiem',
      name: 'search',
      component: SearchView
    },
    {
      path: '/chi-tiet/:id',
      name: 'comic',
      component: ComicView
    },
    {
      path: '/chi-tiet/:comicId/:chapterId',
      name: 'read',
      component: ReadView
    },
    {
      path: '/:catchAll(.*)',
      component: ErrorView
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
