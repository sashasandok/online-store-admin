import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from '@/clientApi/user'

export interface IUser {
  _id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface UsersState {
  usersList: IUser[]
  isLoading: boolean
  error: string | null
}

const initialState: UsersState = {
  usersList: [],
  isLoading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers()
  return users
})

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: Omit<IUser, '_id'>) => {
    const newUser = await apiCreateUser(userData)
    return newUser
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, ...userData }: { id: string } & Partial<Omit<IUser, '_id'>>) => {
    const updatedUser = await apiUpdateUser(id, userData)
    return updatedUser
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    await apiDeleteUser(id)
    return id
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.usersList = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.usersList.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.usersList.findIndex(
          (u) => u._id === action.payload._id
        )
        if (index !== -1) {
          state.usersList[index] = action.payload
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersList = state.usersList.filter(
          (u) => u._id !== action.payload
        )
      })
  },
})

export const { clearError } = usersSlice.actions
export default usersSlice.reducer
