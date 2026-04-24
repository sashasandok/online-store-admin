import { api } from './api'
import type { IReview } from '@/store/slices/reviewsSlice'

export const getReviews = async (productId?: string): Promise<IReview[]> => {
  const url = productId
    ? `/admin/reviews/product/${productId}`
    : '/admin/reviews'
  const response = await api.get(url)
  return response.data.items
}

export const createReview = async (
  reviewData: Omit<IReview, '_id'>
): Promise<IReview> => {
  const response = await api.post('/admin/reviews', reviewData)
  return response.data
}

export const updateReview = async (
  id: string,
  reviewData: Partial<Omit<IReview, '_id'>>
): Promise<IReview> => {
  const response = await api.put(`/admin/reviews/${id}`, reviewData)
  return response.data
}

export const deleteReview = async (id: string): Promise<void> => {
  await api.delete(`/admin/reviews/${id}`)
}
