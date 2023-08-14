import axios from 'axios'
import { IItem } from '../types/item'

export const fetchItems = async (offset: number) => {
    try {
        const limit = 10
        const page = Math.ceil((offset + 1) / limit)

        const response = await axios.get<IItem[]>(
            'https://jsonplaceholder.typicode.com/albums/1/photos',
            { params: { _page: page, _limit: limit } }
        )

        let totalCount: string | null = await response.headers['x-total-count']
        if (!totalCount) {
            totalCount = '10'
        }
        return await response.data
    } catch (error) {
        throw new Error('Error when fetching items')
    }
}
