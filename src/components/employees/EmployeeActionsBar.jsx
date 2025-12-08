import { useNavigate } from "react-router-dom";
import { Pencil, Save, X, ArrowLeft, AlertTriangle } from "lucide-react";

export default function EmployeeActionsBar({
  isEditing,
  isUpdating,
  status,
  onEdit,
  onCancel,
  onSave,
  onToggleStatus,
  onAddWarning,
}) {
  const navigate = useNavigate();

  return (
    <div className="top-actions">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
      </button>

      <div>
        {!isEditing ? (
          <>
            <button className="add-warning-btn" onClick={onAddWarning}>
              <AlertTriangle size={14} />
              <p>Add Warning</p>
            </button>

            <button className="edit-btn" onClick={onEdit}>
              <Pencil size={14} />
              <p>Edit</p>
            </button>
            <button
              className={`set-status-btn ${status?.toLowerCase()}`}
              onClick={onToggleStatus}
              disabled={isUpdating}
            >
              {`Set ${status === "Active" ? "Inactive" : "Active"}`}
            </button>
          </>
        ) : (
          <>
            <button className="cancel-btn" onClick={onCancel}>
              <X size={14} />
              <p>Cancel</p>
            </button>

            <button className="save-btn" onClick={onSave} disabled={isUpdating}>
              <Save size={14} />
              <p>{isUpdating ? "Saving..." : "Save Changes"}</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
