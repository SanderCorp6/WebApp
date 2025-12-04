import { BsPeople, BsPeopleFill, BsCalendar3Week, BsCalendar3WeekFill, BsTags, BsFillTagsFill } from "react-icons/bs";
import { Users, Settings, Calendar as CalendarIcon, Briefcase } from "lucide-react";
import { FiSettings } from "react-icons/fi";
import SidebarNavLink from "./SidebarNavLink";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/Sidebar.css";

function Sidebar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <section id="sidebar">
      <div className="profile-info">
        <div className="user-image-border">
          <div className="user-image"></div>
        </div>
        <div className="user-data">
          <h1>{user?.name}</h1>
          <p>{user?.role}</p>
        </div>
      </div>

      <div className="nav-buttons">
        <SidebarNavLink name="Employees" route="" icon={Users} />
        <SidebarNavLink name="Vacations" route="vacations" icon={CalendarIcon} />
        <SidebarNavLink name="Openings" route="openings" icon={Briefcase} />
      </div>

      <div className="info-section">
        <div className="info-btn" onClick={handleLogout}>
          <Settings size={15} />
          <p>Settings</p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
