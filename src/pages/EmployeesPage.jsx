import '../styles/EmployeesPage.css';
import { useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { getEmployees, getEmployeesStats } from '../api/employeeService';
import { useQuery } from '@tanstack/react-query';
import EmployeeTable from '../components/EmployeeTable';
import { useOutletContext } from "react-router-dom";
import DashboardCard from '../components/DashboardCard';
import { LuUsersRound, LuUserRoundCheck, LuUserRoundX, LuBuilding2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

function EmployeesPages() {
    const { toggleSidebar } = useOutletContext();
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');

    const { 
        data: employeesData, 
        isLoading: isLoadingEmployees, 
        isError: isErrorEmployees
    } = useQuery({
        queryKey: ['employees', statusFilter, sortBy, searchTerm],
        queryFn: () => getEmployees({ 
            status: statusFilter === 'All' ? '' : statusFilter,
            sortBy,
            search: searchTerm
        }),
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
    const statsList = [
        { statistic: 'Total Employees', value: stats.totalEmployees || 0, icon: <LuUsersRound /> },
        { statistic: 'Active', value: stats.activeEmployees || 0, icon: <LuUserRoundCheck /> },
        { statistic: 'Inactive', value: stats.inactiveEmployees || 0, icon: <LuUserRoundX /> },
        { statistic: 'Departments', value: stats.totalDepartments || 0, icon: <LuBuilding2 /> },
    ]
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
                {/* Overview */}
                <div className="overview-section">
                    {
                        statsList.map((statistic) => (
                            <DashboardCard
                                key={statistic.statistic}
                                statistic={statistic.statistic}
                                value={statistic.value}
                                icon={statistic.icon}
                            />
                        ))
                    }
                </div>

                {/* Filters and Search Bar */}
                <div className="filters-section">
                    <div className="creation-and-search">
                        {/* search bar */}
                        <div className="search-bar">
                            <IoSearch className='icon'/>
                            <input 
                                type="text" 
                                placeholder="Search employees by name, position or department"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        {/* add employee button */}
                        <button>Add Employee</button>
                    </div>

                    <div className="filters">
                        {/* status filters */}
                        <div className="filter-item">
                            <label htmlFor="status-filter">Status:</label>
                            <button type="button" className='filter-btn' onClick={() => setStatusFilter("All")}>All</button>
                            <button type="button" className='filter-btn' onClick={() => setStatusFilter("Active")}>Active</button>
                            <button type="button" className='filter-btn' onClick={() => setStatusFilter("Inactive")}>Inactive</button>
                        </div>

                        {/* sort by filters */}
                        <div className="filter-item">
                            <label htmlFor="sortby-filter">Sort By:</label>
                            <button type="button" className='filter-btn' onClick={() => setSortBy("name")}>Name</button>
                            <button type="button" className='filter-btn' onClick={() => setSortBy("position")}>Position</button>
                            <button type="button" className='filter-btn' onClick={() => setSortBy("department")}>Department</button>
                            <button type="button" className='filter-btn' onClick={() => setSortBy("status")}>Status</button>
                        </div>
                    </div>
                </div>

                {/* Employees Table */}
                <div className="employees-table">
                    {/* <div className="headers">
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
                    </div> */}

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
