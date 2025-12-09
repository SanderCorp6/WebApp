import "../../styles/components/Forms.css";

export function Textarea({ className, ...props }) {
  return <textarea className={`ui-textarea ${className || ""}`} {...props} />;
}
