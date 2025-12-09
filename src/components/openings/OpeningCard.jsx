import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Edit2, Trash2, Briefcase, MapPin, DollarSign, Calendar, Users, ChevronDown } from "lucide-react";
import LoadingSpinner from "../ui/LoadingSpinner";

const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return "status-Open";
    case "In interview":
      return "status-In-interview";
    case "Offer extended":
      return "status-Offer-extended";
    case "Paused":
      return "status-On-hold";
    case "Closed":
      return "status-Closed";
    default:
      return "status-default";
  }
};

function OpeningCard({ opening, onEdit, onDelete, onStatusChange, isDeleting, isUpdating }) {
  const [isHovered, setIsHovered] = useState(false);
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);

  const formatSalary = (min, max) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const statuses = ["Open", "Paused", "In interview", "Offer extended", "Closed"];

  const handleStatusChange = (newStatus) => {
    if (newStatus === opening.status) {
      setStatusPopoverOpen(false);
      return;
    }
    onStatusChange(newStatus);
    setStatusPopoverOpen(false);
  };

  return (
    <div className="opening-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Header */}
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">{opening.title}</h3>
          <div className="card-meta">
            <span className="meta-item">
              <Briefcase className="meta-icon" />
              {opening.department || opening.department_name || "Department"}
            </span>
            <span>•</span>
            <span className="meta-item">
              <MapPin className="meta-icon" />
              {opening.work_mode || "Hybrid"}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="card-actions" style={{ opacity: isHovered ? 1 : 0 }}>
          <button onClick={onEdit} className="btn-icon" title="Edit opening">
            <Edit2 size={8} />
          </button>
          <button onClick={onDelete} className="btn-icon delete" title="Delete opening" disabled={isDeleting}>
            {isDeleting ? <LoadingSpinner size={8} /> : <Trash2 size={8} />}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="card-description">{opening.description}</p>

      {/* Key details with bullet points */}
      <div className="card-details">
        <div className="detail-row">
          <div className="detail-bullet" />
          <div className="detail-content">
            <DollarSign className="detail-icon" />
            <span>{formatSalary(opening.salary_min, opening.salary_max)} per year</span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-bullet" />
          <div className="detail-content">
            <Users className="detail-icon" />
            <span>{opening.contract_type}</span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-bullet" />
          <div className="detail-content">
            <Calendar className="detail-icon" />
            <span>
              Target date:{" "}
              {new Date(opening.target_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Footer with status */}
      <div className="card-footer">
        <Popover open={statusPopoverOpen} onOpenChange={setStatusPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className={`status-badge ${getStatusColor(opening.status)}`}
              style={{ cursor: "pointer", border: "none", gap: "4px" }}
              title="Click to change status"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : opening.status}
              <ChevronDown size={12} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="status-popover-content">
            <div className="status-popover-header">Change status</div>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`status-item-btn ${opening.status === status ? "active" : ""}`}
              >
                <span className="status-indicator">
                  {opening.status === status ? (
                    <div className="status-dot" />
                  ) : (
                    <div className="status-placeholder-dot" />
                  )}
                  <span>{status}</span>
                </span>
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <span className="posted-date">
          Posted {new Date(opening.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>
    </div>
  );
}

export default OpeningCard;
