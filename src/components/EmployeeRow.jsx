import { FiEye } from "react-icons/fi";

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
            <td><StatusTag status={employee.status} /></td>
            <td>{new Date(employee.hire_date).toLocaleDateString('en-CA')}</td>
            <td>$ {employee.salary}</td>
            <td>
                <button className="action-btn"><FiEye /><span>View</span></button>
            </td>
        </tr>
    );
}

export default EmployeeRow;