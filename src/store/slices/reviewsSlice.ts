import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getReviews,
  createReview as apiCreateReview,
  updateReview as apiUpdateReview,
  deleteReview as apiDeleteReview,
} from '@/clientApi/review'

export interface IReview {
  _id: string
  product: {
    _id: string
    title: string
  }
  user: {
    _id: string
    name: string
  }
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface ReviewsState {
  reviewsList: IReview[]
  isLoading: boolean
  error: string | null
}

const initialState: ReviewsState = {
  reviewsList: [],
  isLoading: false,
  error: null,
}

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (productId?: string) => {
    return await getReviews(productId)
  }
)

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData: Omit<IReview, '_id'>) => {
    const newReview = await apiCreateReview(reviewData)
    return newReview
  }
)

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({
    id,
    ...reviewData
  }: { id: string } & Partial<Omit<IReview, '_id'>>) => {
    const updatedReview = await apiUpdateReview(id, reviewData)
    return updatedReview
  }
)

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id: string) => {
    await apiDeleteReview(id)
    return id
  }
)

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviewsList = action.payload
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch reviews'
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviewsList.push(action.payload)
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviewsList.findIndex(
          (r) => r._id === action.payload._id
        )
        if (index !== -1) {
          state.reviewsList[index] = action.payload
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviewsList = state.reviewsList.filter(
          (r) => r._id !== action.payload
        )
      })
  },
})

export const { clearError } = reviewsSlice.actions
export default reviewsSlice.reducer
