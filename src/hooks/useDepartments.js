import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../api/departmentService";

export const useDepartments = () => {
  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
  });

  return {
    departments: departmentsQuery.data?.departments || [],
    isLoading: departmentsQuery.isLoading,
    isError: departmentsQuery.isError,
  };
};
