import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getOrders,
  createOrder as apiCreateOrder,
  updateOrder as apiUpdateOrder,
  deleteOrder as apiDeleteOrder,
} from '@/clientApi/order'

export interface IOrder {
  _id: string
  number: string
  customer: string
  status: 'pending' | 'paid' | 'shipped' | 'cancelled'
  total: number
  createdAt: string
  updatedAt: string
}

export interface OrdersState {
  ordersList: IOrder[]
  isLoading: boolean
  error: string | null
}

const initialState: OrdersState = {
  ordersList: [],
  isLoading: false,
  error: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  return await getOrders()
})

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Omit<IOrder, '_id'>) => {
    const newOrder = await apiCreateOrder(orderData)
    return newOrder
  }
)

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({
    id,
    ...orderData
  }: { id: string } & Partial<Omit<IOrder, '_id'>>) => {
    const updatedOrder = await apiUpdateOrder(id, orderData)
    return updatedOrder
  }
)

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string) => {
    await apiDeleteOrder(id)
    return id
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.ordersList = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch orders'
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.ordersList.push(action.payload)
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.ordersList.findIndex(
          (o) => o._id === action.payload._id
        )
        if (index !== -1) {
          state.ordersList[index] = action.payload
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.ordersList = state.ordersList.filter(
          (o) => o._id !== action.payload
        )
      })
  },
})

export const { clearError } = ordersSlice.actions
export default ordersSlice.reducer
