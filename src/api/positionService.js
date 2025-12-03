import api from "./axios";

export const getPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};
