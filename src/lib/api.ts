/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/prefer-promise-reject-errors, @typescript-eslint/prefer-nullish-coalescing */
// Axios instance configuration for API calls
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/env'
import { getToken, removeToken } from './auth'
import toast from 'react-hot-toast'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
        const token = getToken()
    if (token) {
            config.headers.Authorization = `Bearer ${token}`
    }
        return config
  },
  (error) => {
        return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
        return response
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
            const status = error.response.status
            const data = error.response.data as any

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
                    removeToken()
          if (typeof window !== 'undefined') {
                        const currentPath = window.location.pathname
            // Don't redirect if already on login/register pages
                        if (
                            currentPath !== '/login' &&
                            currentPath !== '/register'
                        ) {
                            toast.error('กรุณาเข้าสู่ระบบอีกครั้ง')
                            window.location.href = '/login'
            }
          }
                    break

        case 403:
          // Forbidden
                    toast.error('คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้')
                    break

        case 404:
          // Not found
                    toast.error(data?.message || 'ไม่พบข้อมูลที่ต้องการ')
                    break

        case 500:
          // Server error
                    toast.error(
                        'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง'
                    )
                    break

        default:
          // Other errors
          if (data?.message) {
                        toast.error(data.message)
          }
      }
    } else if (error.request) {
      // Network error - no response received
            toast.error(
                'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'
            )
    } else {
      // Other errors
            toast.error('เกิดข้อผิดพลาดที่ไม่คาดคิด')
    }

        return Promise.reject(error)
  }
)

export default api
