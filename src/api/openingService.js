import api from "./axios";

export const getOpenings = async (filters = {}) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== null && v !== undefined && v !== "")
  );

  const params = new URLSearchParams(cleanFilters).toString();
  const response = await api.get(`/openings?${params}`);
  return response.data;
};

export const getOpeningById = async (id) => {
  const response = await api.get(`/openings/${id}`);
  return response.data;
};

export const updateOpening = async (id, data) => {
  const response = await api.patch(`/openings/${id}`, data);
  return response.data;
};

export const createOpening = async (data) => {
  const response = await api.post("/openings", data);
  return response.data;
};

export const deleteOpening = async (id) => {
  const response = await api.delete(`/openings/${id}`);
  return response.data;
};
