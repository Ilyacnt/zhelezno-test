import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={styles.Logo}>Test</div>
            <Link to="/">Dashboard</Link>
            <Link to="/list">List</Link>
        </div>
    )
}

export default Header
