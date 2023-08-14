import ItemCard from '../../components/ItemCard/ItemCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchItemsThunk } from '../../store/items/itemsThunk'
import { IItem } from '../../types/item'
import styles from './List.module.css'
import { useEffect } from 'react'

const List = () => {
    const dispatch = useAppDispatch()
    const { items, loading, error } = useAppSelector((state) => state.items)

    useEffect(() => {
        dispatch(fetchItemsThunk(0))
    }, [])

    return (
        <div className={styles.List}>
            {error && <div>{error}</div>}
            {!loading ? (
                items.map((item: IItem) => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        thumbnailUrl={item.thumbnailUrl}
                    />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default List
