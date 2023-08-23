import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://comics-api.vercel.app'
})

export default axiosClient
