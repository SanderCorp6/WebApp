import "../styles/EmployeeDetailPage.css";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import { usePositions } from "../hooks/usePositions";
import { useDepartments } from "../hooks/useDepartments";
import { useEmployeeOptions } from "../hooks/useEmployeeOptions";
import EmployeeDetailForm from "../components/employees/EmployeeDetailForm";

function EmployeeDetailPage() {
  const { id } = useParams();

  const { employee, history, isLoading, isError, updateEmployee, isUpdating, addWarning, isAddingWarning } =
    useEmployee(id);
  const { employeesOptions } = useEmployeeOptions();
  const { positions } = usePositions();
  const { departments } = useDepartments();

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <LoadingSpinner size={40} className="spinner-primary" />
      </div>
    );
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
        addWarning={addWarning}
        isAddingWarning={isAddingWarning}
        positions={positions}
        departments={departments}
        employeesOptions={employeesOptions}
      />
    </div>
  );
}

export default EmployeeDetailPage;
