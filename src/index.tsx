import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './global.css'
import Layout from './components/Layout/Layout'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
)
