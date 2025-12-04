import { NavLink } from "react-router-dom";

function SidebarNavLink({ name, route, icon: Icon }) {
  return (
    <NavLink to={`/${route}`} className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}>
      <>
        <div className="nav-btn-icon">
          <Icon size={14} />
        </div>
        <p>{name}</p>
      </>
    </NavLink>
  );
}

export default SidebarNavLink;
