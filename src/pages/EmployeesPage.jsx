import "../styles/EmployeesPage.css";
import { useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeToolbar from "../components/employees/EmployeeToolBar";
import StatsOverview from "../components/dashboard/StatsOverview";
import PageHeader from "../components/layout/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function EmployeesPages() {
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentId, setDepartmentId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { employees, stats, isLoading, isError } = useEmployees({
    statusFilter,
    departmentId,
    positionId,
    sortBy,
    sortDir,
    searchTerm: debouncedSearchTerm,
  });

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortDir((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(columnKey);
      setSortDir("ASC");
    }
  };

  const handleExport = () => {
    if (!employees || employees.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "ID",
      "Role",
      "Full Name",
      "Email",
      "Phone Number",
      "Address",
      "Birth Date",
      "Hire Date",
      "Contract",
      "Salary",
      "Periodicity",
      "Payroll Key",
      "Cost Center",
      "Position",
      "Department",
      "Status",
    ];

    const csvRows = [
      headers.join(","),
      ...employees.map((emp) => {
        return [
          emp.id,
          emp.role,
          `"${emp.full_name}"`,
          emp.email,
          emp.phone_number,
          emp.address,
          emp.birth_date ? emp.birth_date.split("T")[0] : "",
          emp.hire_date ? emp.hire_date.split("T")[0] : "",
          emp.contract_type,
          emp.salary,
          emp.periodicity,
          emp.payroll_key,
          emp.cost_center,
          emp.position_name,
          emp.department_name,
          emp.status,
        ].join(",");
      }),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `employees_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Employees exported successfully!");
  };

  return (
    <div className="employees-page">
      <PageHeader title="Employees" description={"Manage your company employees"} />

      {/* Overview */}
      <StatsOverview stats={stats} />

      {/* Filters and Search Bar */}
      <EmployeeToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        departmentId={departmentId}
        positionId={positionId}
        setDepartmentId={setDepartmentId}
        setPositionId={setPositionId}
        onExportClick={handleExport}
        onAddClick={() => {
          navigate(`/employees/register`);
        }}
      />

      {/* Employees Table */}
      <div className="employees-table">
        {isLoading && (
          <div className="loader-wrapper">
            <LoadingSpinner size={40} className="spinner-colors" />
          </div>
        )}

        {isError && toast.error("Error loading employee list.") && "Error fetching employee list."}

        {!isLoading && !isError && (
          <EmployeeTable employees={employees} sortBy={sortBy} sortDir={sortDir} onSort={handleSort} />
        )}
      </div>
    </div>
  );
}

export default EmployeesPages;
