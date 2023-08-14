import Dashboard from '../../pages/Dashboard/Dashboard'
import List from '../../pages/List/List'
import Header from '../Header/Header'
import styles from './Layout.module.css'
import { Route, Routes } from 'react-router-dom'

const Layout = () => {
    return (
        <div className={styles.Layout}>
            <Header />
            <div className={styles.Content}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout
