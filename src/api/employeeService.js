import api from "./axios";

export const getEmployees = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/employees?${params}`);
  return response.data;
};

export const getEmployeesStats = async () => {
  const response = await api.get("/employees/stats");
  return response.data;
};

export const getEmployeeOptions = async () => {
  const response = await api.get("employees/options");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const getEmployeeHistory = async (id) => {
  const response = await api.get(`/employees/history/${id}`);
  return response.data;
};

export const updateEmployee = async (id, data) => {
  const response = await api.patch(`/employees/${id}`, data);
  return response.data;
};

export const registerEmployee = async (data) => {
  const response = await api.post("/employees", data);
  return response.data;
};
