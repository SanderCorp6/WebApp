import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const StatusTag = ({ status }) => <span className={`status-tag status-${status?.toLowerCase()}`}>{status}</span>;

function EmployeeRow({ employee }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewClick = () => {
    if (user?.role === "Employee") {
      toast.error("You do not have permission to view this employee");
      return;
    }
    navigate(`/employees/${employee.id}`);
  };

  return (
    <tr>
      <td className="bold">{employee.full_name}</td>
      <td>{employee.position_name}</td>
      <td>{employee.department_name}</td>
      <td>
        <StatusTag status={employee.status} />
      </td>
      <td>{new Date(employee.hire_date).toLocaleDateString("en-CA")}</td>

      {user?.role === "Administrator" && (
        <td className="bold">
          {new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
          }).format(Number(employee.salary))}
        </td>
      )}

      <td>
        <button className="action-btn" onClick={handleViewClick}>
          <Eye size={12} />
          <span>View</span>
        </button>
      </td>
    </tr>
  );
}

export default EmployeeRow;
