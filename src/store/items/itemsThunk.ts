import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItems } from '../../api/itemsAPI'
import { IItem } from '../../types/item'

export const fetchItemsThunk = createAsyncThunk<IItem[], number>(
    'items/fetchItemsWithOffset',
    async (offset: number, thunkAPI) => {
        try {
            const response = await fetchItems(offset)
            return response
        } catch (error) {
            throw new Error('need to handle error')
        }
    }
)
