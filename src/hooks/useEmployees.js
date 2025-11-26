import { useQuery } from '@tanstack/react-query';
import { getEmployees, getEmployeesStats } from '../api/employeeService';

export const useEmployees = (filters) => {
    const { statusFilter, sortBy, searchTerm } = filters;

    const employeesQuery = useQuery({
        queryKey: ['employees', statusFilter, sortBy, searchTerm],
        queryFn: () => getEmployees({ 
            status: statusFilter === 'All' ? '' : statusFilter,
            sortBy,
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