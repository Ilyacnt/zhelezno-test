import React, { useRef, useState } from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { reorderFavoriteItems } from '../../store/items/itemsSlice'
import styles from './Dashboard.module.css'
import { useDroppable } from '@dnd-kit/core'

const Dashboard = () => {
    const { favoriteItems, totalFileSizeOfImages } = useAppSelector((state) => state.items)
    const dispatch = useAppDispatch()
    const { setNodeRef } = useDroppable({
        id: 'unique-id',
    })

    return (
        <div className={styles.Dashboard}>
            <div>Number of favorite elements: {favoriteItems.length}</div>
            <div>Sum of images sizes: {totalFileSizeOfImages} bytes</div>
            <div>Favorite items:</div>
            <div className={styles.DraggableArea} ref={setNodeRef}>
                {favoriteItems.map((item, index) => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        thumbnailUrl={item.thumbnailUrl}
                        draggable={true}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
