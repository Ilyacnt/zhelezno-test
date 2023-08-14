import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items/itemsSlice'

export const store = configureStore({
    reducer: {
        items: itemsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
