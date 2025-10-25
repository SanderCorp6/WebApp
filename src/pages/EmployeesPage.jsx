import { useState, useEffect, useMemo } from "react";
import { FiSidebar } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth'; //
import { getEmployees } from '../api/employeeService';
import EmployeeTable from '../components/EmployeeTable';
import '../styles/EmployeesPage.css'; //

function EmployeesPages() {
    const { user } = useAuth(); //
    const [allEmployees, setAllEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Active');

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!user?.token) {
                setLoading(false);
                setError("No estás autenticado.");
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const data = await getEmployees(user.token, { status: statusFilter });
                setAllEmployees(data.employees);
            } catch (err) {
                setError(err.message || "Error al cargar los empleados.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [user, statusFilter]);

    const counts = useMemo(() => {
        const activeCount = statusFilter === 'Active' ? allEmployees.length : 0;
        const inactiveCount = statusFilter === 'Inactive' ? allEmployees.length : 0;
        const totalCount = activeCount + inactiveCount;
        
        return {
            total: totalCount,
            active: statusFilter === 'Active' ? allEmployees.length : "0",
            inactive: statusFilter === 'Inactive' ? allEmployees.length : "0"
        }
    }, [allEmployees, statusFilter]);


    return (
        <div className="employees-page">
            <div id="view-info">
                <FiSidebar id="sidebar-icon" />
                <p>Home / Employees</p>
            </div>

            <div className="employees-content">
                <h1>Employees</h1>

                {/* Tarjeta de Resumen (Overview) */}
                <div className="overview">
                    <div className="card">
                        <div className="overview-content main-info">
                            <div><FaUsers className="overview-icon" /><h3>Total</h3></div>
                            <p>{counts.total}</p>
                        </div>
                        <div className="divider"></div>
                        <div className="overview-content details">
                            <div><h3>Active</h3><p>{counts.active}</p></div>
                            <div className="divider"></div>
                            <div><h3>Inactive</h3><p>{counts.inactive}</p></div>
                        </div>
                    </div>
                </div>

                {/* Tabla de Empleados */}
                <div className="employees-table">
                    <div className="headers">
                        <h3 
                            className={statusFilter === 'Active' ? 'selected' : ''}
                            onClick={() => setStatusFilter('Active')}
                        >
                            Active<span>({statusFilter === 'Active' ? allEmployees.length : '0'})</span>
                        </h3>
                        <h3 
                            className={statusFilter === 'Inactive' ? 'selected' : ''}
                            onClick={() => setStatusFilter('Inactive')}
                        >
                            Inactive<span>({statusFilter === 'Inactive' ? allEmployees.length : '0'})</span>
                        </h3>
                    </div>

                    {loading && <p>Cargando empleados...</p>}
                    {error && <p className="error-message">{error}</p>}
                    
                    {!loading && !error && (
                        <EmployeeTable employees={allEmployees} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeesPages;