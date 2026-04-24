import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as productApi from '../../clientApi/product'
import type { IProduct } from '../../clientApi/product'

export type { IProduct }

export interface ProductsState {
  productsList: IProduct[]
  page: number
  pages: number
  total: number
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
}

const initialState: ProductsState = {
  productsList: [],
  page: 0,
  pages: 0,
  total: 0,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: { page?: number; limit?: number; search?: string }) => {
    const data = await productApi.getProducts(params)
    return data
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: {
    title: string
    description: string
    category: string
    price: number
    stock: number
  }) => {
    const data = await productApi.createProduct(productData)
    return data
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({
    id,
    ...updateData
  }: { id: string } & Partial<{
    title: string
    description: string
    category: string
    price: number
    stock: number
  }>) => {
    const data = await productApi.updateProduct(id, updateData)
    return data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await productApi.deleteProduct(id)
    return id
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false

        if (Array.isArray(action.payload)) {
          state.productsList = action.payload
          state.page = 1
          state.pages = 1
          state.total = action.payload.length
        } else {
          state.productsList = action.payload.items
          state.page = action.payload.page
          state.pages = action.payload.totalPages
          state.total = action.payload.total
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch products'
      })

    builder
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isCreating = false
        state.productsList.push(action.payload)
        state.total += 1
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false
        state.error = action.error.message || 'Failed to create product'
      })

    builder
      .addCase(updateProduct.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdating = false
        const index = state.productsList.findIndex(
          (p) => p._id === action.payload._id
        )
        if (index !== -1) {
          state.productsList[index] = action.payload
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.error.message || 'Failed to update product'
      })

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleting = false
        state.productsList = state.productsList.filter(
          (p) => p._id !== action.payload
        )
        state.total -= 1
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false
        state.error = action.error.message || 'Failed to delete product'
      })
  },
})

export const { clearError, setPage } = productSlice.actions
export default productSlice.reducer
