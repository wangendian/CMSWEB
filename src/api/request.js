import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data.status === 200) {
      return response.data
    } else {
      ElMessage.error(response.data.msg)
      return Promise.reject(new Error(response.data.msg))
    }
  },
  (AxiosError) => {
    ElMessage.error(AxiosError.message)
    console.log(AxiosError)
    return Promise.reject(new Error(AxiosError.message))
  }
)

export default service
