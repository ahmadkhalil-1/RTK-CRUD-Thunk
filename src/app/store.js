import { configureStore } from '@reduxjs/toolkit'
import userDetailSlice from '../features/userDetails'

export const store = configureStore({
  reducer: {
    app: userDetailSlice
  },
})