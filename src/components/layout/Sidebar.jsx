import { Users, Settings, Calendar as CalendarIcon, Briefcase, LogOut } from "lucide-react";
import SidebarNavLink from "./SidebarNavLink";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/Sidebar.css";
import { useState } from "react";
import { SettingsModal } from "../settings/SettingsModal";
import { useEmployee } from "../../hooks/useEmployee";

function Sidebar() {
  const { user, logout } = useAuth();
  const { employee } = useEmployee(user?.id);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const currentUser = employee || user;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <section id="sidebar">
        <div className="profile-info">
          <div className="user-image-border">
            <div className="user-image">
              {currentUser?.image_url ? (
                <img
                  src={currentUser.image_url}
                  alt={currentUser.full_name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                currentUser?.full_name
                  ?.split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>
          </div>
          <div className="user-data">
            <h1>{currentUser?.full_name}</h1>
            <p>{currentUser?.role}</p>
          </div>
        </div>

        <div className="nav-buttons">
          <SidebarNavLink name="Employees" route="" icon={Users} />
          <SidebarNavLink name="Vacations" route="vacations" icon={CalendarIcon} />
          {currentUser?.role !== "Employee" && <SidebarNavLink name="Openings" route="openings" icon={Briefcase} />}
        </div>

        <div className="info-section">
          <div className="info-btn" onClick={() => setIsSettingsOpen(true)}>
            <Settings size={15} />
            <p>Settings</p>
          </div>
          <div className="info-btn" onClick={handleLogout}>
            <LogOut size={15} />
            <p>Logout</p>
          </div>
        </div>
      </section>

      <SettingsModal user={currentUser} open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}

export default Sidebar;
