import '../styles/EmployeesPage.css';
import { useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { getEmployees, getEmployeesStats } from '../api/employeeService';
import { useQuery } from '@tanstack/react-query';
import EmployeeTable from '../components/EmployeeTable';
import { useOutletContext } from "react-router-dom";

function EmployeesPages() {
    const { toggleSidebar } = useOutletContext();
    const [statusFilter, setStatusFilter] = useState('Active');

    const { 
        data: employeesData, 
        isLoading: isLoadingEmployees, 
        isError: isErrorEmployees
    } = useQuery({
        queryKey: ['employees', statusFilter],
        queryFn: () => getEmployees({ status: statusFilter }),
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
    });

    const { 
        data: statsData, 
        isLoading: isLoadingStats 
    } = useQuery({
        queryKey: ['employeesStats'],
        queryFn: getEmployeesStats,
        staleTime: 1000 * 60 * 5,
    });

    const allEmployees = employeesData?.employees || [];
    const stats = statsData || { activeEmployees: 0, inactiveEmployees: 0, totalEmployees: 0 };

    const isInitialLoading = isLoadingEmployees || isLoadingStats;

    return (
        <div className="employees-page">
            <div id="view-info">
                <FiSidebar 
                    id="sidebar-icon" 
                    onClick={toggleSidebar} 
                    style={{ cursor: 'pointer' }}/>
                <p>Home / Employees</p>
            </div>

            <div className="employees-content">
                {/* Tarjeta de Resumen (Overview) */}


                {/* Tabla de Empleados */}
                <div className="employees-table">
                    <div className="headers">
                        <h3 
                            className={statusFilter === 'Active' ? 'selected' : ''}
                            onClick={() => setStatusFilter('Active')}
                        >
                            Active
                            <span>
                                ({isLoadingStats ? '...' : stats.activeEmployees})
                            </span>
                        </h3>
                        <h3 
                            className={statusFilter === 'Inactive' ? 'selected' : ''}
                            onClick={() => setStatusFilter('Inactive')}
                        >
                            Inactive
                            <span>
                                ({isLoadingStats ? '...' : stats.inactiveEmployees})
                            </span>
                        </h3>
                    </div>

                    {/* Manejo de carga y errores */}
                    {isInitialLoading && <p>Loading Data...</p>}
                    
                    {isErrorEmployees && (
                        <p className="error-message">Error loading employee list.</p>
                    )}
                    
                    {!isInitialLoading && !isErrorEmployees && (
                        <EmployeeTable employees={allEmployees} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeesPages;
