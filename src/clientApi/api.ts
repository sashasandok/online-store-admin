import axios from 'axios'
import { handleSessionExpired } from '../utils/sessionHandler'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-client': 'admin',
  },
  timeout: 10000,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')

  const isRefreshRequest = config.url?.includes('/auth/refresh')

  if (token && !isRefreshRequest) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (import.meta.env.DEV) {
    console.log(
      `API Request: ${config.method?.toUpperCase()} ${config.baseURL}${
        config.url
      }`
    )
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} ${response.config.url}`)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (import.meta.env.DEV) {
      console.error(
        `API Error: ${error.response?.status || 'Network Error'} ${
          error.config?.url
        }`,
        error.response?.data
      )
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const isLoginRequest = originalRequest.url?.includes('/login')
      const isRefreshRequest = originalRequest.url?.includes('/auth/refresh')
      const isOnLoginPage =
        typeof window !== 'undefined' && window.location.pathname === '/login'

      if (isRefreshRequest) {
        handleSessionExpired()
        return Promise.reject(error)
      }

      if (isLoginRequest || isOnLoginPage) {
        return Promise.reject(error)
      }

      try {
        if (import.meta.env.DEV) {
          console.log('🔄 Attempting to refresh token...')
        }

        const response = await api.post('/auth/refresh', {})

        if (import.meta.env.DEV) {
          console.log('Token refreshed successfully')
        }
        localStorage.setItem('access_token', response.data.token)
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`
        return api(originalRequest)
      } catch (refreshError) {
        if (import.meta.env.DEV) {
          console.error('Token refresh failed:', refreshError)
        }
        handleSessionExpired()
        return Promise.reject(refreshError)
      }
    }

    const errorMessage =
      error.response?.data?.error || error.message || 'An error occurred'

    const enhancedError = new Error(errorMessage)
    enhancedError.name = error.name

    // @ts-expect-error - Adding response data for debugging
    enhancedError.response = error.response

    return Promise.reject(enhancedError)
  }
)
