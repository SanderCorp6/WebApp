import { useQuery } from '@tanstack/react-query';
import { getEmployeeById } from '../api/employeeService';

export const useEmployee = (id) => {
    const query = useQuery({
        queryKey: ['employee', id],
        queryFn: () => getEmployeeById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    return {
        employee: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    };
};