import { useQuery } from '@tanstack/react-query';
import { getEmployees, getEmployeesStats } from '../api/employeeService';

export const useEmployees = (filters) => {
    const { statusFilter, departmentId, sortBy, sortDir, searchTerm } = filters;

    const employeesQuery = useQuery({
        queryKey: ['employees', statusFilter, departmentId, sortBy, sortDir, searchTerm],
        queryFn: () => getEmployees({ 
            status: statusFilter === 'All' ? '' : statusFilter,
            departmentId,
            sortBy,
            sortDir,
            search: searchTerm
        }),
        staleTime: 1000 * 60 * 3,
        keepPreviousData: true,
    });

    const statsQuery = useQuery({
        queryKey: ['employeesStats'],
        queryFn: getEmployeesStats,
        staleTime: 1000 * 60 * 3,
    });

    return {
        employees: employeesQuery.data?.employees || [],
        stats: statsQuery.data || {},
        isLoading: employeesQuery.isLoading || statsQuery.isLoading,
        isError: employeesQuery.isError
    };
};