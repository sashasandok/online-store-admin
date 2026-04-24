import { api } from './api'
import type { IUser } from '@/store/slices/usersSlice'

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await api.get<{ items: IUser[] }>(`admin/users`)
    return response.data.items
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const createUser = async (
  userData: Omit<IUser, '_id'>
): Promise<IUser> => {
  const response = await api.post('admin/users', userData)
  return response.data
}

export const updateUser = async (
  id: string,
  userData: Partial<Omit<IUser, '_id'>>
): Promise<IUser> => {
  const response = await api.put(`admin/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`admin/users/${id}`)
}
