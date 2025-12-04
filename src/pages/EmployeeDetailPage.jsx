import "../styles/EmployeeDetailPage.css";
import { useParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import { usePositions } from "../hooks/usePositions";
import { useDepartments } from "../hooks/useDepartments";
import { useEmployeeOptions } from "../hooks/useEmployeeOptions";
import EmployeeDetailForm from "../components/employees/EmployeeDetailForm";

function EmployeeDetailPage() {
  const { id } = useParams();

  const { employee, history, isLoading, isError, updateEmployee, isUpdating } = useEmployee(id);
  const { employeesOptions } = useEmployeeOptions();
  const { positions } = usePositions();
  const { departments } = useDepartments();

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }
  if (isError) {
    return <div className="error-message">Error loading employee details.</div>;
  }
  if (!employee) {
    return <div className="error-message">Employee not found.</div>;
  }

  return (
    <div className="employee-detail-page">
      <EmployeeDetailForm
        key={employee.id}
        employee={employee}
        history={history}
        updateEmployee={updateEmployee}
        isUpdating={isUpdating}
        positions={positions}
        departments={departments}
        employeesOptions={employeesOptions}
      />
    </div>
  );
}

export default EmployeeDetailPage;
