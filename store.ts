import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { marvelApi } from './services/mainApi';

export const store = configureStore({
    reducer: {
        [marvelApi.reducerPath]: marvelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marvelApi.middleware),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;