import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IItem } from '../../types/item'

interface IItemsState {
    items: IItem[]
    favoriteItems: IItem[]
}

const initialState: IItemsState = {
    items: [],
    favoriteItems: [],
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItemToFavorite: (state, action: PayloadAction<IItem>) => {
            state.favoriteItems.push(action.payload)
        },
        removeItemFromFavorite: (state, action: PayloadAction<number>) => {
            state.favoriteItems = state.favoriteItems.filter((item) => item.id === action.payload)
        },
    },
    extraReducers: {},
})

export const { addItemToFavorite, removeItemFromFavorite } = itemsSlice.actions
export default itemsSlice.reducer
