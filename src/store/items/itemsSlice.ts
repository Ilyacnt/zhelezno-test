import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem } from '../../types/item'
import { fetchItemsThunk } from './itemsThunk'

interface IItemsState {
    items: IItem[]
    favoriteItems: IItem[]
    loading: boolean
    error: null | string
}

const initialState: IItemsState = {
    items: [],
    favoriteItems: [],
    loading: false,
    error: null,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItemToFavorite: (state, action: PayloadAction<number>) => {
            const findedItem = state.items.find((item) => item.id === action.payload)
            findedItem && state.favoriteItems.push(findedItem)
        },
        removeItemFromFavorite: (state, action: PayloadAction<number>) => {
            state.favoriteItems = state.favoriteItems.filter((item) => item.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItemsThunk.fulfilled, (state, action: PayloadAction<IItem[]>) => {
            state.items.push(...action.payload)
            state.loading = false
        })
        builder.addCase(fetchItemsThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchItemsThunk.rejected, (state, action) => {
            state.error = action.error.message || null
            state.loading = false
        })
    },
})

export const { addItemToFavorite, removeItemFromFavorite } = itemsSlice.actions
export default itemsSlice.reducer
