import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../../clientApi/auth'
import type { User } from '../../clientApi/auth'

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

const getTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

const initialState: AuthState = {
  user: null,
  token: getTokenFromStorage(),
  isLoading: false,
  isAuthenticated: !!getTokenFromStorage(),
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await authApi.login(credentials)

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.token)
    }

    return response
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authApi.logout()

  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
  }
})

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const user = await authApi.getCurrentUser()
    return user
  }
)

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await authApi.refreshToken()

  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', response.token)
  }

  return response
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Login failed'
        state.isAuthenticated = false
      })

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Logout failed'
      })

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to get user'
        state.isAuthenticated = false
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
        }
        state.token = null
      })

    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Token refresh failed'
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
        }
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, clearAuth } = authSlice.actions
export default authSlice.reducer
