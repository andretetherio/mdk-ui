import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authSlice } from './slices/auth-slice'
import { notificationSlice } from './slices/notification-slice'
import { timezoneSlice } from './slices/timezone-slice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    timezone: timezoneSlice.reducer,
    notifications: notificationSlice.reducer,
  },
  devTools: true,
})

setupListeners(store.dispatch)
