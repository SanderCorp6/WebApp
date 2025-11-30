import { NavLink } from 'react-router-dom';

function SidebarNavLink ({ name, route, icon, fillIcon }) {
    return (
        <NavLink 
            to={`/${route}`} 
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`} >

            {({ isActive }) => (
                <>
                    <div className='nav-btn-icon'>
                        {isActive ? fillIcon : icon}
                    </div>
                    <p>{name}</p>
                </>
            )}
        </NavLink>
    );
} 

export default SidebarNavLink;