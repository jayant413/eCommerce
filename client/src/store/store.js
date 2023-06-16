import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import searchReducer from './slices/search'

export const store = configureStore({
  reducer: {
    authS: authReducer,
    search: searchReducer
  },
})