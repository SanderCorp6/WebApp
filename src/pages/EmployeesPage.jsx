import '../styles/EmployeesPage.css';
import { useState, useEffect } from "react";
import { FiSidebar } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth';
import { getEmployees, getEmployeesStats } from '../api/employeeService';
import EmployeeTable from '../components/EmployeeTable';
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

function EmployeesPages() {
    const { toggleSidebar } = useOutletContext();

    const { user } = useAuth(); //
    const [allEmployees, setAllEmployees] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('Active');

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const data = await getEmployees(user.token, { status: statusFilter });
                setAllEmployees(data.employees);
            } catch {
                toast.error("Error loading employees.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [user, statusFilter]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getEmployeesStats(user.token);
                setStats(data);
            } catch  {
                toast.error("Error loading stats.");
            }
        }

        fetchStats();
    }, [user]);

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
                            Active<span>({stats.activeEmployees})</span>
                        </h3>
                        <h3 
                            className={statusFilter === 'Inactive' ? 'selected' : ''}
                            onClick={() => setStatusFilter('Inactive')}
                        >
                            Inactive<span>({stats.inactiveEmployees})</span>
                        </h3>
                    </div>

                    {loading && <p>Cargando empleados...</p>}
                    
                    {!loading && (
                        <EmployeeTable employees={allEmployees} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeesPages;