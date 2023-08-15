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
import { DragEvent, useRef } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface ItemCardProps extends Pick<IItem, 'id' | 'title' | 'thumbnailUrl'> {
    onDragStart?: (event: DragEvent<HTMLDivElement>, index: number) => void
    index: number
    draggable?: boolean
}

function Droppable(props: any) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    })

    return <div ref={setNodeRef}>{props.children}</div>
}

const ItemCard = ({ id, thumbnailUrl, title, index, draggable = false }: ItemCardProps) => {
    const dispatch = useAppDispatch()
    const favoriteItems = useAppSelector((state) => state.items.favoriteItems)
    const isItemInFavorites = favoriteItems.some((item) => item.id === id)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'unique-id',
    })
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    const clickHandle = () => {
        if (!isItemInFavorites) {
            dispatch(addItemToFavorite(id))
        } else {
            dispatch(removeItemFromFavorite(id))
        }
    }

    return (
        <div
            className={cn(styles.ItemCard, { [styles.Draggable]: draggable })}
            draggable={draggable}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
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

            <div className={styles.Image}>
                <img src={thumbnailUrl} alt={title} />
            </div>
        </div>
    )
}

export default ItemCard
