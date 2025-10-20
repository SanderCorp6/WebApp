import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/MainLayout.css'

function MainLayout () {
    return (
        <main>
            <Sidebar />
            <div id='views'>
                <Outlet />
            </div>
        </main>
    )
}

export default MainLayout;