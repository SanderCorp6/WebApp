import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOpenings, createOpening, updateOpening, deleteOpening } from "../api/openingService";
import toast from "react-hot-toast";

export const useOpenings = (filters) => {
  const queryClient = useQueryClient();
  const { status, departmentId, positionId, contractType, search } = filters || {};

  const openingsQuery = useQuery({
    queryKey: ["openings", status, departmentId, positionId, contractType, search],
    queryFn: () =>
      getOpenings({
        status,
        departmentId,
        positionId,
        contractType,
        search,
      }),
    staleTime: 1000 * 60 * 3,
    keepPreviousData: true,
  });

  const addOpeningMutation = useMutation({
    mutationFn: (data) => createOpening(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["openings"]);
      toast.success("Opening created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create opening");
    },
  });

  const updateOpeningMutation = useMutation({
    mutationFn: ({ id, data }) => updateOpening(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["openings"]);
      toast.success("Opening updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update opening");
    },
  });

  const deleteOpeningMutation = useMutation({
    mutationFn: (id) => deleteOpening(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["openings"]);
      toast.success("Opening deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete opening");
    },
  });

  return {
    openings: openingsQuery.data?.openings || [],
    isLoading: openingsQuery.isLoading,
    isError: openingsQuery.isError,

    addOpening: addOpeningMutation.mutateAsync,
    isAddingOpening: addOpeningMutation.isPending,

    updateOpening: updateOpeningMutation.mutateAsync,
    isUpdatingOpening: updateOpeningMutation.isPending,

    deleteOpening: deleteOpeningMutation.mutateAsync,
    isDeletingOpening: deleteOpeningMutation.isPending,
  };
};
