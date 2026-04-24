import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getCategories,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory,
  type ICategory as ApiCategory,
} from '../../clientApi/category'

export type ICategory = ApiCategory

export interface CategoriesState {
  categoriesList: ICategory[]
  isLoading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categoriesList: [],
  isLoading: false,
  error: null,
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const categories = await getCategories()
    return categories
  }
)

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: { name: string }) => {
    const newCategory = await apiCreateCategory(categoryData)
    return newCategory
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, ...categoryData }: { id: string; name: string }) => {
    const updatedCategory = await apiUpdateCategory(id, categoryData)
    return updatedCategory
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string) => {
    await apiDeleteCategory(id)
    return id
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categoriesList = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch categories'
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoriesList.push(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categoriesList.findIndex(
          (c) => c._id === action.payload._id
        )
        if (index !== -1) {
          state.categoriesList[index] = action.payload
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoriesList = state.categoriesList.filter(
          (c) => c._id !== action.payload
        )
      })
  },
})

export const { clearError } = categoriesSlice.actions
export default categoriesSlice.reducer
