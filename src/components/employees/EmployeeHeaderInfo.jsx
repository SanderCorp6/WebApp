export function EmployeeHeaderInfo({ employee }) {
  return (
    <section className="employee-header cl-2">
      <div className="employee-image">
        {employee.image_url ? (
          <img src={employee.image_url} alt={`${employee.full_name}`} />
        ) : (
          `${employee.first_name?.charAt(0)}${employee.last_name?.charAt(0)}`
        )}
      </div>

      <div className="main-info">
        <h1>{employee.full_name}</h1>
        <p className="position">
          {employee.position_name} | {employee.role}
        </p>
        <div>
          <p className={`status-tag ${employee.status?.toLowerCase()}`}>{employee.status}</p>
          <p>{`Employee ID: #${employee.id}`}</p>
        </div>
      </div>
    </section>
  );
}
