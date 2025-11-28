import api from './axios';

export const getEmployees = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/employees?${params}`);
    return response.data;
};

export const getEmployeesStats = async () => {
    const response = await api.get('/employees/stats');
    return response.data;
}

export const getEmployeeById = async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
}
