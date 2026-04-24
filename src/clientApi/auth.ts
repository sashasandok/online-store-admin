import { api } from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    _id: string
    email: string
    name: string
    role: string
  }
}

export interface User {
  _id: string
  email: string
  name: string
  role: string
}

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/me')
  return response.data
}

export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await api.post('/auth/refresh')
  return response.data
}
