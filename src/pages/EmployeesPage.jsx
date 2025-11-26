import '../styles/EmployeesPage.css';
import { useState } from "react";
import EmployeeTable from '../components/EmployeeTable';
import EmployeeToolbar from '../components/EmployeeToolBar';
import StatsOverview from '../components/StatsOverview';
import PageHeader from '../components/PageHeader';
import { useEmployees } from '../hooks/useEmployees';

function EmployeesPages() {
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');

    const { employees, stats, isLoading, isError } = useEmployees({
        statusFilter, 
        sortBy, 
        searchTerm
    });

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
                sortBy={sortBy}
                setSortBy={setSortBy}
                onAddClick={() => { console.log("Add Employee clicked") }} />

            {/* Employees Table */}
            <div className="employees-table">
                {/* Manejo de carga y errores */}
                {isLoading && <p>Loading Data...</p>}
                
                {isError && (
                    <p className="error-message">Error loading employee list.</p>
                )}
                
                {!isLoading && !isError && (
                    <EmployeeTable employees={employees} />
                )}
            </div>
        </div>
    );
}

export default EmployeesPages;
