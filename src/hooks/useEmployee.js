import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployeeById, updateEmployee } from '../api/employeeService';

export const useEmployee = (id) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['employee', id],
        queryFn: () => getEmployeeById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    const updateMutation = useMutation({
        mutationFn: (data) => updateEmployee(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['employee', id]);
            queryClient.invalidateQueries(['employees']);
            queryClient.invalidateQueries(['employees', 'options']);
        }
    });

    return {
        employee: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        updateEmployee: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending
    };
};