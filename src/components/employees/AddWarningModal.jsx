import { useState } from "react";
import { Modal } from "../ui/Modal";
import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function AddWarningModal({ isOpen, onClose, employeeName, onConfirm, isLoading }) {
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a description for the warning.");
      return;
    }

    try {
      await onConfirm(reason);
      toast.success("Warning added successfully");
      setReason("");
      onClose();
    } catch {
      toast.error("Error adding warning");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} id={"warning-modal"}>
      <header>
        <div className="warning-icon">
          <AlertTriangle size={18} />
        </div>
        <div className="warning-title">
          <h2>New Warning</h2>
          <p>Add a warning for {employeeName}</p>
        </div>
      </header>

      <div className="form-input">
        <label>Description</label>
        <textarea
          rows="4"
          placeholder="Describe the details of the warning..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <p>{"This warning will be added to the employee's history and cannot be edited later."}</p>
      </div>

      <div className="warning-actions">
        <button className="cancel-warning" onClick={onClose} disabled={isLoading}>
          Cancel
        </button>
        <button className="add-warning" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Warning"}
        </button>
      </div>
    </Modal>
  );
}
