import { IItem } from '../../types/item'
import styles from './ItemCard.module.css'
import cn from 'classnames'
// @ts-ignore
import { ReactComponent as FavIcon } from '../../assets/heart-outline.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    addItemToFavorite,
    removeItemFromFavorite,
    reorderFavoriteItems,
} from '../../store/items/itemsSlice'
import { useRef } from 'react'

interface ItemCardProps extends Pick<IItem, 'id' | 'title' | 'thumbnailUrl'> {
    index: number
    draggable?: boolean
}

const ItemCard = ({ id, thumbnailUrl, title, index, draggable = false }: ItemCardProps) => {
    const dispatch = useAppDispatch()
    const favoriteItems = useAppSelector((state) => state.items.favoriteItems)
    const isItemInFavorites = favoriteItems.some((item) => item.id === id)

    const dragRef = useRef<HTMLDivElement | null>(null)

    const clickHandle = () => {
        if (!isItemInFavorites) {
            dispatch(addItemToFavorite(id))
        } else {
            dispatch(removeItemFromFavorite(id))
        }
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        dragRef.current = event.target as HTMLDivElement
        event.dataTransfer?.setData('text/plain', '') // Needed for Firefox to enable dragging
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (!dragRef.current) return

        const fromIndex = dragRef.current.getAttribute('data-index')
        const toIndex = index.toString() // Get the 'index' prop passed to the component

        if (fromIndex && fromIndex !== toIndex) {
            dispatch(
                reorderFavoriteItems({ fromIndex: parseInt(fromIndex), toIndex: parseInt(toIndex) })
            )
        }
    }

    return (
        <div
            className={cn(styles.ItemCard, { [styles.Draggable]: draggable })}
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-index={index}
        >
            <div>
                <div>{`ID: ${id}, TITLE: ${title}`}</div>
                <div
                    className={cn(styles.FavoriteButton, {
                        [styles.Active]: isItemInFavorites,
                    })}
                    onClick={clickHandle}
                >
                    <FavIcon />
                </div>
            </div>

            <img src={thumbnailUrl} alt={title} />
        </div>
    )
}

export default ItemCard
