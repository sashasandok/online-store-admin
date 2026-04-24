import { api } from './api'
import type { IOrder } from '@/store/slices/ordersSlice'

export const getOrders = async (): Promise<IOrder[]> => {
  const response = await api.get('/admin/orders')
  return response.data.items
}

export const createOrder = async (
  orderData: Omit<IOrder, '_id'>
): Promise<IOrder> => {
  const response = await api.post('/admin/orders', orderData)
  return response.data
}

export const updateOrder = async (
  id: string,
  orderData: Partial<Omit<IOrder, '_id'>>
): Promise<IOrder> => {
  const response = await api.put(`/admin/orders/${id}`, orderData)
  return response.data
}

export const deleteOrder = async (id: string): Promise<void> => {
  await api.delete(`/admin/orders/${id}`)
}
