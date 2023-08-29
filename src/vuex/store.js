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
      state.genres.push(...payload)


      // state.a = 1;
      // state.a = 2; => detect chamge -> re-render

      // hey, link <li> with data.genere -> link state.genere
      // state.a = []
      // state.a = [1.2]; => dont detect chamge -> dont re-render
      // state.a.push(1,2); => detect change => re-render
    },
    setLoading:(state, payload) => {
        state.isLoading = payload
    }
  },
  actions: {
    getGenres: async ({ commit }) => {
      commit('setLoading', true)
      
      const data = await GenresApi.getAll();
      commit('setGenres', data)
      commit('setLoading', false)
    }
  }
})

export default store
