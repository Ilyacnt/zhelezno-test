import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    const location = useLocation()

    return (
        <div className={styles.Header}>
            <div className={styles.Logo}>Test</div>
            {location.pathname === '/' ? <Link to="/list">List</Link> : <Link to="/">Go Back</Link>}
        </div>
    )
}

export default Header
