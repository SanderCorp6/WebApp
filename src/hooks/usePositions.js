import { useQuery } from "@tanstack/react-query";
import { getPositions } from "../api/positionService";

export const usePositions = () => {
  const positionsQuery = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
  });

  return {
    positions: positionsQuery.data?.positions || [],
    isLoading: positionsQuery.isLoading,
    isError: positionsQuery.isError,
  };
};
