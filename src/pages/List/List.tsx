import { getItemsApi } from '../../api/items'
import styles from './List.module.css'
import { useEffect } from 'react'

const List = () => {
    useEffect(() => {
        console.log(getItemsApi())
    }, [])

    return <div className={styles.List}>List</div>
}

export default List
