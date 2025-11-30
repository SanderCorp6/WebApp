import { useQuery } from '@tanstack/react-query';
import { getEmployeeOptions } from '../api/employeeService';

export const useEmployeeOptions = () => {
    const query = useQuery({
        queryKey: ['employees', 'options'],
        queryFn: () => getEmployeeOptions(),
        staleTime: 1000 * 60 * 30,
    });

    return {
        employeesOptions: query.data?.employees || [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
};
