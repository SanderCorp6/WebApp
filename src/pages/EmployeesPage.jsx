import "../styles/EmployeesPage.css";
import { useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeToolbar from "../components/employees/EmployeeToolBar";
import StatsOverview from "../components/dashboard/StatsOverview";
import PageHeader from "../components/layout/PageHeader";
import { useEmployees } from "../hooks/useEmployees";

function EmployeesPages() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentId, setDepartmentId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");

  const { employees, stats, isLoading, isError } = useEmployees({
    statusFilter,
    departmentId,
    positionId,
    sortBy,
    sortDir,
    searchTerm,
  });

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortDir((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(columnKey);
      setSortDir("ASC");
    }
  };

  return (
    <div className="employees-page">
      <PageHeader title="Employees" />

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
        onAddClick={() => {
          console.log("Add Employee clicked");
        }}
      />

      {/* Employees Table */}
      <div className="employees-table">
        {isLoading && <p>Loading Data...</p>}

        {isError && <p className="error-message">Error loading employee list.</p>}

        {!isLoading && !isError && (
          <EmployeeTable employees={employees} sortBy={sortBy} sortDir={sortDir} onSort={handleSort} />
        )}
      </div>
    </div>
  );
}

export default EmployeesPages;
