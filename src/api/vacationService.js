import api from "./axios";

export const getMyVacations = async () => {
  const response = await api.get("/vacations/me");
  return response.data;
};

export const getTeamRequests = async () => {
  const response = await api.get("/vacations/team");
  return response.data;
};

export const createRequest = async (data) => {
  const response = await api.post("/vacations/request", data);
  return response.data;
};

export const approveRequest = async (id) => {
  const response = await api.post(`/vacations/${id}/approve`);
  return response.data;
};

export const rejectRequest = async (id) => {
  const response = await api.post(`/vacations/${id}/reject`);
  return response.data;
};
