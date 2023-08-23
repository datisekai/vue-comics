import { createStore } from 'vuex'
import GenresApi from '../services/GenresApi'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      genres: [],
      isLoading: false
    }
  },
  mutations: {
    setGenres: (state, payload) => {
      state.genres = payload
    },
    setLoading:(state, payload) => {
        state.isLoading = payload
    }
  },
  actions: {
    getGenres: async ({ commit }) => {
      commit('setLoading', true)
      
      const data = await GenresApi.getAll()
      
      commit('setGenres', data)
      commit('setLoading', false)
    }
  }
})

export default store
