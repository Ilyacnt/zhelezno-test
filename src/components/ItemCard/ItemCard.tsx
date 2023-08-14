import { IItem } from '../../types/item'
import styles from './ItemCard.module.css'

interface ItemCardProps extends IItem {}

const ItemCard = ({ id, albumId, thumbnailUrl, title, url }: ItemCardProps) => {
    return (
        <div className={styles.ItemCard}>
            <div>{`${id} ${title}`}</div>
            <img src={thumbnailUrl} alt={title} />
        </div>
    )
}

export default ItemCard
