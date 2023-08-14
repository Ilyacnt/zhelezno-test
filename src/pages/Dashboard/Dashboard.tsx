import { useAppSelector } from '../../store/hooks'
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const { favoriteItems } = useAppSelector((state) => state.items)

    return (
        <div className={styles.Dashboard}>
            <div>Number of favorite elements: {favoriteItems.length}</div>
            <div>Sum of images sizes: {0}</div>
        </div>
    )
}

export default Dashboard
