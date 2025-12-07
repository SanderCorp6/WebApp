import { useState, useRef } from "react";
import { Camera, Upload, Lock, Info, Check, User, Shield, HelpCircle, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../ui/Modal";
import "../../styles/components/SettingsModal.css";
import { useEmployee } from "../../hooks/useEmployee";
import { useAuth } from "../../hooks/useAuth";

export function SettingsModal({ user, open, onOpenChange }) {
  const { updateEmployee } = useEmployee(user.id);
  const { updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    phone_number: user.phone_number,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    const promise = updateEmployee(profileData);
    toast.promise(promise, {
      loading: "Updating profile...",
      success: "Profile updated successfully!",
      error: "Failed to update profile.",
    });

    await promise;
    updateUser({
      ...profileData,
      name: `${profileData.first_name} ${profileData.last_name}`,
    });
  };

  const handleChangePassword = () => {
    if (!securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (securityData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setSecurityData({
      ...securityData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Password changed successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "about", label: "About", icon: Info },
  ];

  return (
    <div className="settings-modal-wrapper">
      <Modal isOpen={open} onClose={() => onOpenChange(false)} id="settings-modal-container">
        <div className="settings-modal-content">
          {/* Sidebar */}
          <div className="settings-sidebar">
            <div className="settings-sidebar-header">
              <h2>Settings</h2>
              <p>Manage your preferences</p>
            </div>

            <div className="settings-tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`settings-tab-btn ${isActive ? "active" : ""}`}
                  >
                    <div className="tab-label">
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight size={16} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="settings-content">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <div className="content-header">
                  <h3>Profile Settings</h3>
                  <p>Manage your personal information</p>
                </div>

                {/* Profile Picture Section */}
                <div className="settings-section">
                  <div className="section-title">Profile Picture</div>
                  <div className="profile-picture-card">
                    <div className="avatar-container">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="avatar" />
                      ) : (
                        <div className="avatar-placeholder">
                          <span>
                            {profileData?.name
                              ?.split(" ")
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                      <button onClick={() => fileInputRef.current?.click()} className="camera-btn" title="Change photo">
                        <Camera size={14} />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="profile-actions">
                      <div>
                        <h4>Update your profile picture</h4>
                        <p>Recommended: Square image, at least 400x400px</p>
                      </div>
                      <div className="btn-group">
                        <button onClick={() => fileInputRef.current?.click()} className="btn btn-secondary">
                          <Upload size={14} />
                          Upload Photo
                        </button>
                        {profileImage && (
                          <button
                            onClick={() => {
                              setProfileImage(null);
                              toast.success("Profile picture removed");
                            }}
                            className="btn btn-danger-outline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="settings-section">
                  <div className="section-title">Personal Information</div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="profile-first-name">First Name</label>
                      <input
                        id="profile-first-name"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-last-name">Last Name</label>
                      <input
                        id="profile-last-name"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-email">Email</label>
                      <input
                        id="profile-email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-role">Role</label>
                      <input
                        id="profile-role"
                        value={profileData.role}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-phone">Phone</label>
                      <input
                        id="profile-phone"
                        value={profileData.phone_number}
                        onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "25px" }}>
                    <button onClick={handleSaveProfile} className="btn btn-primary">
                      <Check size={15} style={{ marginRight: "4px" }} />
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <div className="content-header">
                  <h3>Security Settings</h3>
                  <p>Manage your password and security preferences</p>
                </div>

                {/* Change Password */}
                <div className="settings-section">
                  <div className="section-title">
                    <Lock size={14} />
                    Change Password
                  </div>
                  <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label htmlFor="current-password">Current Password</label>
                    <input
                      id="current-password"
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label htmlFor="new-password">New Password</label>
                    <input
                      id="new-password"
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div style={{ marginTop: "16px" }}>
                    <button onClick={handleChangePassword} className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="settings-section">
                  <div className="section-title">Active Sessions</div>
                  <div className="list-item">
                    <div className="list-item-content">
                      <h4>Current Session</h4>
                      <p>Last active: Just now</p>
                    </div>
                    <span className="status-badge">Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div>
                <div className="content-header">
                  <h3>About</h3>
                  <p>System information and resources</p>
                </div>

                <div className="settings-section">
                  <div className="section-title">
                    <Info size={14} />
                    System Information
                  </div>
                  <div className="info-cards-grid">
                    <div className="info-card">
                      <small>Application Version</small>
                      <strong>1.0.0</strong>
                    </div>
                    <div className="info-card">
                      <small>Last Updated</small>
                      <p style={{ fontWeight: 500, color: "#0a0a0a" }}>Nov 19, 2025</p>
                    </div>
                    <div className="info-card">
                      <small>License</small>
                      <p style={{ fontWeight: 500, color: "#0a0a0a" }}>Commercial</p>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <div className="section-title">
                    <HelpCircle size={14} />
                    Support & Resources
                  </div>
                  <div className="links-grid">
                    <button className="link-btn">
                      <span>Help Center</span>
                      <ChevronRight size={16} color="#6a7282" />
                    </button>
                    <button className="link-btn">
                      <span>Contact Support</span>
                      <ChevronRight size={16} color="#6a7282" />
                    </button>
                    <button className="link-btn">
                      <span>Privacy Policy</span>
                      <ChevronRight size={16} color="#6a7282" />
                    </button>
                    <button className="link-btn">
                      <span>Terms of Service</span>
                      <ChevronRight size={16} color="#6a7282" />
                    </button>
                  </div>
                </div>

                <div className="footer-credits">
                  <p>Sander HR Management System</p>
                  <small>Made for your team</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
