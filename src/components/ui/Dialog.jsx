import "../../styles/components/Dialog.css";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export function DialogContent({ children, className }) {
  return <div className={`dialog-content ${className || ""}`}>{children}</div>;
}

export function DialogHeader({ children, className }) {
  return <div className={`dialog-header ${className || ""}`}>{children}</div>;
}

export function DialogTitle({ children, className }) {
  return <h2 className={`dialog-title ${className || ""}`}>{children}</h2>;
}

export function DialogFooter({ children, className }) {
  return <div className={`dialog-footer ${className || ""}`}>{children}</div>;
}
