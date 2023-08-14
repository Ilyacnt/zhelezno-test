import React, { useState } from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { reorderFavoriteItems } from '../../store/items/itemsSlice'
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const { favoriteItems } = useAppSelector((state) => state.items)
    const dispatch = useAppDispatch()
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        event.preventDefault()

        if (draggedIndex !== null && draggedIndex !== targetIndex) {
            dispatch(reorderFavoriteItems({ fromIndex: draggedIndex, toIndex: targetIndex }))
        }

        setDraggedIndex(null)
    }

    return (
        <div className={styles.Dashboard}>
            <div>Number of favorite elements: {favoriteItems.length}</div>
            <div>Sum of images sizes: {0}</div>
            <div>Favorite items:</div>
            <div
                className={styles.DraggableArea}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, favoriteItems.length)}
            >
                {favoriteItems.map((item, index) => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        thumbnailUrl={item.thumbnailUrl}
                        draggable={true}
                        index={index}
                        // @ts-ignore
                        onDragStart={() => setDraggedIndex(index)}
                        onDragEnd={() => setDraggedIndex(null)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
