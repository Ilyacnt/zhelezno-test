import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItems } from '../../api/itemsAPI'
import { IItem } from '../../types/item'
import { setTotalCount } from './itemsSlice'

export const fetchItemsThunk = createAsyncThunk<IItem[], number>(
    'items/fetchItemsWithOffset',
    async (offset: number, { dispatch }) => {
        try {
            const response = await fetchItems(offset)
            let totalCount: number | null = await response.headers['x-total-count']
            if (!totalCount) {
                totalCount = 20
            }
            dispatch(setTotalCount(totalCount))
            return response.data
        } catch (error) {
            throw new Error('need to handle error')
        }
    }
)
