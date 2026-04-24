import { api } from './api'

export interface IProduct {
  _id: string
  title: string
  description: string
  category: {
    _id: string
    name: string
  }
  price: number
  stock: number
  createdAt?: string
  updatedAt?: string
}

export interface ProductsResponse {
  items: IProduct[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ProductsQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const getProducts = async (
  params?: ProductsQueryParams
): Promise<ProductsResponse | IProduct[]> => {
  const response = await api.get('/admin/products', { params })
  return response.data
}

export const getProduct = async (id: string): Promise<IProduct> => {
  const response = await api.get(`/admin/products/${id}`)
  return response.data
}

export const createProduct = async (productData: {
  title: string
  description: string
  category: string
  price: number
  stock: number
}): Promise<IProduct> => {
  const response = await api.post('/admin/products', productData)
  return response.data
}

export const updateProduct = async (
  id: string,
  productData: Partial<{
    title: string
    description: string
    category: string
    price: number
    stock: number
  }>
): Promise<IProduct> => {
  const response = await api.patch(`/admin/products/${id}`, productData)
  return response.data
}

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/admin/products/${id}`)
}
