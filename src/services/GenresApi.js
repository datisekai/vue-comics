import axiosClient from '../config/axiosClient'

const GenresApi = {
  getAll: async () => {
    const response = await axiosClient.get('/genres')
    return response.data
  },
  getById: async (id) => {}
}

export default GenresApi
