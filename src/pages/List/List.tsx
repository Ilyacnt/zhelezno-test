import debounce from 'lodash.debounce'
import ItemCard from '../../components/ItemCard/ItemCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchItemsThunk } from '../../store/items/itemsThunk'
import { IItem } from '../../types/item'
import { store } from '../../store/store'
import styles from './List.module.css'
import { useEffect, useRef } from 'react'

const List = () => {
    const dispatch = useAppDispatch()
    const { items, loading, error, totalCount } = useAppSelector((state) => state.items)
    const offsetRef = useRef(10)

    useEffect(() => {
        const scrollHandler = debounce((event: Event) => {
            const dataLength = store.getState().items.items.length
            const element = (event.target as Document)?.documentElement
            if (
                element.scrollHeight - (element.scrollTop + window.innerHeight) < 100 &&
                dataLength < totalCount &&
                !loading
            ) {
                offsetRef.current += 20
                dispatch(fetchItemsThunk(offsetRef.current))
            }
        }, 200)

        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [loading, dispatch, totalCount])

    useEffect(() => {
        if (items.length <= 0) {
            dispatch(fetchItemsThunk(0))
        }
    }, [])

    return (
        <div className={styles.List}>
            {error && <div>{error}</div>}
            {items.map((item: IItem, index) => (
                <ItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    thumbnailUrl={item.thumbnailUrl}
                    index={index}
                />
            ))}
            {loading && <div>Loading...</div>}
        </div>
    )
}

export default List
