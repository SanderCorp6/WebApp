export function FormInput({ label, id, className, ...props }) {
  return (
    <div className={`form-input ${className || ""}`}>
      <label htmlFor={id}>
        {label}
        <span>*</span>
      </label>
      <input id={id} name={id} {...props} />
    </div>
  );
}

export function FormSelect({ label, id, children, className, ...props }) {
  return (
    <div className={`form-input ${className || ""}`}>
      <label htmlFor={id}>
        {label}
        <span>*</span>
      </label>
      <select id={id} name={id} {...props}>
        {children}
      </select>
    </div>
  );
}
