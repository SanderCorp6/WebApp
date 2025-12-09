import { useState, useEffect } from "react";
import { Calendar, Check, X, Clock, Plus, Umbrella, Heart, Home, AlertCircle, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/Dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import * as vacationService from "../api/vacationService";

import "../styles/VacationsPage.css";

export default function VacationsPage() {
  const [activeTab, setActiveTab] = useState("my-vacations");
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [teamRequests, setTeamRequests] = useState([]);

  const [newRequest, setNewRequest] = useState({
    type: "Holidays",
    startDate: "",
    endDate: "",
    description: "",
  });

  const fetchVacationData = async () => {
    try {
      const [myVacationsData, teamRequestsData] = await Promise.all([
        vacationService.getMyVacations(),
        vacationService.getTeamRequests(),
      ]);
      setMyRequests(myVacationsData);
      setTeamRequests(teamRequestsData);
    } catch {
      toast.error("Could not load vacation data.");
    }
  };

  useEffect(() => {
    fetchVacationData();
  }, []);

  const handleRequestSubmit = async () => {
    if (!newRequest.startDate || !newRequest.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await vacationService.createRequest(newRequest);
      toast.success("Vacation request submitted successfully");
      setRequestModalOpen(false);
      setNewRequest({ type: "Holidays", startDate: "", endDate: "", description: "" });
      fetchVacationData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await vacationService.approveRequest(requestId);
      setTeamRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "Approved" } : req)));
      toast.success("Request approved");
      if (selectedRequest?.id === requestId) {
        setSelectedRequest((prev) => (prev ? { ...prev, status: "Approved" } : null));
      }
      fetchVacationData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await vacationService.rejectRequest(requestId);
      setTeamRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "Rejected" } : req)));
      toast.error("Request rejected");
      if (selectedRequest?.id === requestId) {
        setSelectedRequest((prev) => (prev ? { ...prev, status: "Rejected" } : null));
      }
      fetchVacationData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getTypeIcon = (type) => {
    switch ((type || "").toLowerCase()) {
      case "holidays":
        return Umbrella;
      case "sick":
      case "sick leave":
        return Heart;
      case "home office":
        return Home;
      default:
        return Calendar;
    }
  };

  const getBadgeStyle = (type) => {
    switch ((type || "").toLowerCase()) {
      case "holidays":
        return { backgroundColor: "#10b981", color: "white" };
      case "sick":
      case "sick leave":
        return { backgroundColor: "#3b82f6", color: "white" };
      case "home office":
        return { backgroundColor: "#8b5cf6", color: "white" };
      default:
        return { backgroundColor: "#6b7280", color: "white" };
    }
  };

  const totalVacationDays = 20;
  const takenVacationDays = 5;
  const remainingVacationDays = totalVacationDays - takenVacationDays;

  const pendingRequests = teamRequests.filter((req) => req.status === "Pending" || req.status === "pending");

  return (
    <div className="vacations-page">
      <div className="vacations-content">
        {/* Header */}
        <div className="vacations-header-section">
          <div>
            <h1 className="vacations-title">Vacations</h1>
            <p className="vacations-description">Manage time off and vacation requests</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="vacations-tabs">
          <button
            onClick={() => setActiveTab("my-vacations")}
            className={`tab-button ${activeTab === "my-vacations" ? "active" : ""}`}
          >
            My Vacations
          </button>
          <button
            onClick={() => {
              setActiveTab("team-requests");
              setSelectedRequest(null);
            }}
            className={`tab-button ${activeTab === "team-requests" ? "active" : ""}`}
          >
            Team Requests
            {pendingRequests.length > 0 && <span className="tab-badge">{pendingRequests.length}</span>}
          </button>
        </div>

        {/* My Vacations Tab */}
        {activeTab === "my-vacations" && (
          <div className="vacations-scrollable-content">
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="vacations-grid">
                <div className="stat-card bg-blue-gradient">
                  <div className="stat-card-header">
                    <Calendar className="w-5 h-5 opacity-80" size={20} />
                    <div className="stat-value">{totalVacationDays}</div>
                  </div>
                  <p className="stat-label">Total Days</p>
                  <p className="stat-sublabel">Annual allocation</p>
                </div>

                <div className="stat-card bg-red-gradient">
                  <div className="stat-card-header">
                    <Clock className="w-5 h-5 opacity-80" size={20} />
                    <div className="stat-value">{takenVacationDays}</div>
                  </div>
                  <p className="stat-label">Days Taken</p>
                  <p className="stat-sublabel">Used this year</p>
                </div>

                <div className="stat-card bg-green-gradient">
                  <div className="stat-card-header">
                    <Umbrella className="w-5 h-5 opacity-80" size={20} />
                    <div className="stat-value">{remainingVacationDays}</div>
                  </div>
                  <p className="stat-label">Remaining</p>
                  <p className="stat-sublabel">Available to use</p>
                </div>
              </div>

              {/* Request Vacation Button */}
              <div className="request-button-container">
                <button onClick={() => setRequestModalOpen(true)} className="btn-primary">
                  <Plus size={16} />
                  Request Time Off
                </button>
              </div>

              {/* Request History */}
              <div>
                <h3 className="requests-section-title">Recent Requests</h3>
                <div className="requests-list">
                  {myRequests.map((request) => {
                    const TypeIcon = getTypeIcon(request.type);
                    return (
                      <div key={request.id} className="request-card">
                        <div className="request-card-content">
                          <div className="type-icon-wrapper" style={getBadgeStyle(request.type)}>
                            <TypeIcon size={20} />
                          </div>

                          <div className="request-info">
                            <div className="request-header">
                              <h4 className="request-type-title">{request.type}</h4>
                              <span className={`status-badge status-${(request.status || "").toLowerCase()}`}>
                                {(request.status || "").charAt(0).toUpperCase() + (request.status || "").slice(1)}
                              </span>
                            </div>

                            <div className="request-meta">
                              <span className="meta-item">
                                <Calendar size={12} />
                                {new Date(request.startDate).toLocaleDateString()} →{" "}
                                {new Date(request.endDate).toLocaleDateString()}
                              </span>
                              <span className="meta-item">
                                <Clock size={12} />
                                {request.workingDays} working days
                              </span>
                            </div>

                            {request.description && <p className="request-description">{request.description}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Requests Tab */}
        {activeTab === "team-requests" && (
          <div className="team-view-grid">
            {/* Requests List */}
            <div className="pending-list">
              <h3 className="requests-section-title">Pending Approvals</h3>
              {pendingRequests.map((request) => {
                const TypeIcon = getTypeIcon(request.type);
                const isSelected = selectedRequest?.id === request.id;

                return (
                  <button
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`selectable-request-card ${isSelected ? "selected" : ""}`}
                  >
                    <div className="avatar-placeholder">
                      {request.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div className="request-info">
                      <h4 className="request-type-title">{request.employeeName}</h4>
                      <div className="meta-item" style={{ marginTop: "4px" }}>
                        <div style={{ ...getBadgeStyle(request.type), padding: "2px", borderRadius: "4px" }}>
                          <TypeIcon size={12} />
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{request.type}</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>
                        {request.workingDays} days
                      </p>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`transition-transform ${isSelected ? "rotate-90" : ""}`}
                      color="var(--muted-foreground)"
                    />
                  </button>
                );
              })}

              {pendingRequests.length === 0 && (
                <div className="empty-state">
                  <div className="avatar-placeholder" style={{ width: "64px", height: "64px", margin: "0 auto 16px" }}>
                    <Check size={32} color="#10b981" />
                  </div>
                  <p className="stat-label" style={{ color: "var(--accent-foreground)" }}>
                    All caught up!
                  </p>
                  <p className="stat-sublabel">No pending requests</p>
                </div>
              )}
            </div>

            {/* Request Details */}
            <div className="request-details-column">
              {selectedRequest ? (
                <div className="request-details-panel">
                  <div className="space-y-6">
                    {/* Employee Header */}
                    <div className="details-header">
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div
                          className="large-avatar bg-blue-gradient"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9999px",
                          }}
                        >
                          {selectedRequest.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="vacations-title">{selectedRequest.employeeName}</h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                            <div
                              style={{
                                ...getBadgeStyle(selectedRequest.type),
                                padding: "4px 12px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <span style={{ display: "flex" }}>
                                {(() => {
                                  const I = getTypeIcon(selectedRequest.type);
                                  return <I size={16} />;
                                })()}
                              </span>
                              {selectedRequest.type}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="date-range-container">
                      <div className="date-grid">
                        <div>
                          <p className="stat-label" style={{ color: "var(--muted-foreground)", marginBottom: "8px" }}>
                            Start Date
                          </p>
                          <div className="date-box">
                            <p className="stat-sublabel">
                              {new Date(selectedRequest.startDate).toLocaleString("en", { month: "short" })}
                            </p>
                            <p className="stat-value" style={{ fontSize: "24px", color: "var(--foreground)" }}>
                              {new Date(selectedRequest.startDate).getDate()}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ textAlign: "center" }}>
                            <p className="stat-label" style={{ color: "var(--muted-foreground)", marginBottom: "8px" }}>
                              Duration
                            </p>
                            <div className="duration-box">
                              <p className="stat-value" style={{ fontSize: "24px" }}>
                                {selectedRequest.workingDays}
                              </p>
                              <p className="stat-sublabel" style={{ color: "rgba(255,255,255,0.8)" }}>
                                days
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="stat-label" style={{ color: "var(--muted-foreground)", marginBottom: "8px" }}>
                            End Date
                          </p>
                          <div className="date-box">
                            <p className="stat-sublabel">
                              {new Date(selectedRequest.endDate).toLocaleString("en", { month: "short" })}
                            </p>
                            <p className="stat-value" style={{ fontSize: "24px", color: "var(--foreground)" }}>
                              {new Date(selectedRequest.endDate).getDate()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div style={{ marginBottom: "24px" }}>
                      <h4 className="requests-section-title">Details</h4>
                      <p className="request-description">{selectedRequest.description || "No description provided"}</p>
                    </div>

                    {/* Team Overlap */}
                    {selectedRequest.teamMembers && selectedRequest.teamMembers.length > 0 && (
                      <div>
                        <h4 className="requests-section-title">Team Overlap</h4>
                        <div className="team-overlap-warning">
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <AlertCircle size={20} color="#92400e" style={{ marginTop: "2px" }} />
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: "14px", fontWeight: 500, color: "#92400e", marginBottom: "8px" }}>
                                {selectedRequest.teamMembers.length} team member
                                {selectedRequest.teamMembers.length > 1 ? "s" : ""} will be away
                              </p>
                              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {selectedRequest.teamMembers.map((member, idx) => (
                                  <div
                                    key={idx}
                                    style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}
                                  >
                                    <span style={{ color: "#78350f", fontWeight: 500 }}>{member.name}</span>
                                    <span style={{ color: "#92400e" }}>{member.period}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {(selectedRequest.status || "").toLowerCase() === "pending" && (
                      <div className="action-buttons">
                        <button onClick={() => handleReject(selectedRequest.id)} className="btn-reject">
                          <X size={16} />
                          Reject
                        </button>
                        <button onClick={() => handleApprove(selectedRequest.id)} className="btn-approve">
                          <Check size={16} />
                          Approve Request
                        </button>
                      </div>
                    )}

                    {(selectedRequest.status || "").toLowerCase() !== "pending" && (
                      <div
                        className={`status-badge status-${(selectedRequest.status || "").toLowerCase()}`}
                        style={{ padding: "16px", textAlign: "center", fontSize: "14px", marginTop: "24px" }}
                      >
                        <p>This request has been {(selectedRequest.status || "").toLowerCase()}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="request-details-panel"
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "400px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      className="avatar-placeholder"
                      style={{ width: "64px", height: "64px", margin: "0 auto 16px" }}
                    >
                      <Calendar size={32} color="var(--muted-foreground)" />
                    </div>
                    <p className="stat-label" style={{ color: "var(--accent-foreground)" }}>
                      Select a request
                    </p>
                    <p className="stat-sublabel">Choose a request to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Request Vacation Modal */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Time Off</DialogTitle>
          </DialogHeader>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={newRequest.type}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, type: e.target.value }))}
                className="ui-input"
              >
                <option value="Holidays">Holidays</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Home Office">Home Office</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newRequest.startDate}
                  onChange={(e) => setNewRequest((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newRequest.endDate}
                  onChange={(e) => setNewRequest((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Add any additional details..."
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setRequestModalOpen(false)}
              className="tab-button"
              style={{ border: "1px solid var(--border)" }}
            >
              Cancel
            </button>
            <button onClick={handleRequestSubmit} className="btn-primary">
              Submit Request
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
