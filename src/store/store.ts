import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productReducer from './slices/productSlice'
import categoriesReducer from './slices/categoriesSlice'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import ordersReducer from './slices/ordersSlice'
import reviewsReducer from './slices/reviewsSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product', 'categories', 'users', 'orders', 'reviews'],
}

const rootReducer = combineReducers({
  product: productReducer,
  categories: categoriesReducer,
  users: usersReducer,
  auth: authReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/FLUSH',
            'persist/REHYDRATE',
            'persist/PAUSE',
            'persist/PERSIST',
            'persist/PURGE',
            'persist/REGISTER',
          ],
        },
      }),
    devTools: import.meta.env.MODE !== 'production',
  })

  return store
}

export const makePersistor = (store: AppStore) => persistStore(store)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
