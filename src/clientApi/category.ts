import { api } from './api'

export interface ICategory {
  _id: string
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await api.get('/admin/categories')
  return response.data.items
}

export const getCategory = async (id: string): Promise<ICategory> => {
  const response = await api.get(`/admin/categories/${id}`)
  return response.data
}

export const createCategory = async (categoryData: {
  name: string
  description?: string
}): Promise<ICategory> => {
  const response = await api.post('/admin/categories', categoryData)
  return response.data
}

export const updateCategory = async (
  id: string,
  categoryData: Partial<{
    name: string
    description: string
  }>
): Promise<ICategory> => {
  const response = await api.patch(`/admin/categories/${id}`, categoryData)
  return response.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/admin/categories/${id}`)
}
