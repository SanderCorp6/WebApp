import { X } from "lucide-react";
import "../../styles/components/Modal.css";

export function Modal({ isOpen, onClose, children, id }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container" id={id}>
        <button onClick={onClose} className={`close-modal-btn`}>
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}
