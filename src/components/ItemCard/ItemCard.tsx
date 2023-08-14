import { IItem } from '../../types/item'
import styles from './ItemCard.module.css'
import cn from 'classnames'
// @ts-ignore
import { ReactComponent as FavIcon } from '../../assets/heart-outline.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addItemToFavorite, removeItemFromFavorite } from '../../store/items/itemsSlice'

interface ItemCardProps extends Pick<IItem, 'id' | 'title' | 'thumbnailUrl'> {
    draggable?: boolean
}

const ItemCard = ({ id, thumbnailUrl, title, draggable = false }: ItemCardProps) => {
    const dispatch = useAppDispatch()
    const favoriteItems = useAppSelector((state) => state.items.favoriteItems)
    const isItemInFavorites = favoriteItems.some((item) => item.id === id)

    const clickHandle = () => {
        if (!isItemInFavorites) {
            dispatch(addItemToFavorite(id))
        } else {
            dispatch(removeItemFromFavorite(id))
        }
    }

    return (
        <div className={styles.ItemCard}>
            <div>
                <div>{`ID: ${id}, TITLE: ${title}`}</div>
                <div
                    className={cn(styles.FavoriteButton, { [styles.Active]: isItemInFavorites })}
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
