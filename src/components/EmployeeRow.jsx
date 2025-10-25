const StatusTag = ({ status }) => (
    <span className={`status-tag status-${status?.toLowerCase()}`}>
        {status}
    </span>
);

function EmployeeRow({ employee }) {
    const fullName = `${employee.first_name} ${employee.last_name}`;

    return (
        <tr>
            <td>{fullName}</td>
            <td>{employee.position}</td>
            <td>{employee.department_name}</td>
            <td>{employee.email}</td>
            <td><StatusTag status={employee.status} /></td>
            <td>
                <button className="action-btn">...</button>
            </td>
        </tr>
    );
}

export default EmployeeRow;