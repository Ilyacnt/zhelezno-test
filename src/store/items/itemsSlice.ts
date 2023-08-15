import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem } from '../../types/item'
import { fetchItemsThunk } from './itemsThunk'

interface IItemsState {
    items: IItem[]
    favoriteItems: IItem[]
    totalCount: number
    totalFileSizeOfImages: number
    loading: boolean
    error: null | string
}

const initialState: IItemsState = {
    items: [],
    totalCount: 0,
    totalFileSizeOfImages: 0,
    favoriteItems: [],
    loading: false,
    error: null,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        },
        setTotalFileSizeOfImages: (state, action: PayloadAction<number>) => {
            state.totalFileSizeOfImages = action.payload
        },
        addItemToFavorite: (state, action: PayloadAction<number>) => {
            const findedItem = state.items.find((item) => item.id === action.payload)
            findedItem && state.favoriteItems.push(findedItem)
        },
        removeItemFromFavorite: (state, action: PayloadAction<number>) => {
            state.favoriteItems = state.favoriteItems.filter((item) => item.id !== action.payload)
        },
        reorderFavoriteItems: (
            state,
            action: PayloadAction<{ fromIndex: number; toIndex: number }>
        ) => {
            const { fromIndex, toIndex } = action.payload
            const [movedItem] = state.favoriteItems.splice(fromIndex, 1)
            state.favoriteItems.splice(toIndex, 0, movedItem)
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

export const { setTotalCount, addItemToFavorite, removeItemFromFavorite, reorderFavoriteItems } =
    itemsSlice.actions
export default itemsSlice.reducer
