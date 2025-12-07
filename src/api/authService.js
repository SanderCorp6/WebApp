import api from "./axios.js";

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const activateUser = async (token, password) => {
  const response = await api.post("/auth/activate", { token, password });
  return response.data;
};
