import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const StatusTag = ({ status }) => <span className={`status-tag status-${status?.toLowerCase()}`}>{status}</span>;

function EmployeeRow({ employee }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <tr>
      <td>{employee.full_name}</td>
      <td>{employee.position_name}</td>
      <td>{employee.department_name}</td>
      <td>
        <StatusTag status={employee.status} />
      </td>
      <td>{new Date(employee.hire_date).toLocaleDateString("en-CA")}</td>
      <td>
        {new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(Number(employee.salary))}
      </td>

      <td>
        <button className="action-btn" onClick={handleViewClick}>
          <FiEye />
          <span>View</span>
        </button>
      </td>
    </tr>
  );
}

export default EmployeeRow;
