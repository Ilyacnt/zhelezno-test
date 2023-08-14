import axios from 'axios'
import { IItem } from '../types/item'

export const getItemsApi = async () => {
    const response = await axios.get<IItem[]>(
        'https://jsonplaceholder.typicode.com/albums/1/photos'
    )
    return response
}
