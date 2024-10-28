import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器、添加token
instance.interceptors.request.use((config) => {
  const store = useUserStore()
  // 用户token存在
  if (store.user?.token && config.headers) {
    config.headers.Authorization = `Bearer ${store.user.token}`
  }
  return config
})

// 响应拦截器、处理错误
instance.interceptors.response.use((response) => {
  const data = response.data
  if (data?.code !== 10000) {
    showToast(data?.message || '业务错误')
    return Promise.reject(response.data)
  }
  // 业务成功、返回响应数据
  return response.data
}, (error) => {
  if (error.response?.status === 401) {
    // 删除用户信息
    const store = useUserStore()
    store.delUser()
    showToast('登录过期，请重新登录')
    router.push({
      path: '/login',
      query: {
        // 记录当前路径、登录后跳转
        redirect: router.currentRoute.value.path
      }
    })
  }
  return Promise.reject(error)
})

type Data<T> = {
  code: number
  message: string
  data: T
}

export const request = <T>(url: string, method: Method = 'GET', data?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: data
  })
}

export default { baseURL, instance }

