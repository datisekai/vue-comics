import axiosClient from '../config/axiosClient'

const ComicsApi = {
  getTrending: async () => {
    const response = await axiosClient.get('/trending-comics')
    return response.data
  },
  getRecentUpdate: async (page = 1) => {
    const response = await axiosClient.get(`/recent-update-comics?page=${page}`)
    return response.data
  },
  getNew: async (page = 1) => {
    const response = await axiosClient.get(`/new-comics?page=${page}`)

    return response.data
  },
  getTop: async ({ page, tab, status }) => {
    let response
    if (tab === 'all') {
      response = await axiosClient.get(`/top`, {
        params: {
          page: page || 1,
          status: status || 'all'
        }
      })
    } else {
      response = await axiosClient.get(`/top/${tab}`, {
        params: {
          page: page || 1,
          status: status || 'all'
        }
      })
    }

    return response.data
  },
  getByGenreId: async ({page = 1, id}) => {
    const response = await axiosClient.get(`/genres/${id}?page=${page}`)

    return response.data
  },
  getComicById:async(id) => {
    const response = await axiosClient.get(`/comics/${id}`)

    return response.data
  },
  getReadByComicIdAndChapterId:async({comicId, chapterId}) => {
    const response = await axiosClient.get(`/comics/${comicId}/chapters/${chapterId}`)
    return response.data
  }
}

export default ComicsApi
