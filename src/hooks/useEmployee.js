import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployeeById, getEmployeeHistory, updateEmployee, addEmployeeWarning } from "../api/employeeService";

export const useEmployee = (id) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const historyQuery = useQuery({
    queryKey: ["employee", "history", id],
    queryFn: () => getEmployeeHistory(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["employee", id]);
      queryClient.invalidateQueries(["employee", "history", id]);
      queryClient.invalidateQueries(["employees"]);
      queryClient.invalidateQueries(["employees", "options"]);
    },
  });

  const addWarningMutation = useMutation({
    mutationFn: (reason) => addEmployeeWarning(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries(["employee", "history", id]);
    },
  });

  return {
    employee: query.data,

    history: historyQuery.data?.history || [],
    isLoading: query.isLoading || historyQuery.isLoading,
    isError: query.isError || historyQuery.isError,
    error: query.error || historyQuery.error,

    updateEmployee: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    addWarning: addWarningMutation.mutateAsync,
    isAddingWarning: addWarningMutation.isPending,
  };
};
