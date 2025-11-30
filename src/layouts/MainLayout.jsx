import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import '../styles/MainLayout.css'
import { useState } from 'react';

function MainLayout () {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <main className={isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}>
            <Sidebar />
            <div id='views'>
                <Outlet context={{ toggleSidebar }} />
            </div>
        </main>
    )
}

export default MainLayout;