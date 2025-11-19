// import { useAuth } from "../hooks/useAuth";

const API_URL = "http://localhost:3000";

const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 403) {
            console.log('Logout here');
            // TO DO
        }
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || 'Request Error');
    }
    return response.json();
};

export const getEmployees = async (token, filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/employees?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return handleResponse(response);
};

export const getEmployeesStats = async (token) => {
    const response = await fetch(`${API_URL}/employees/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }); 

    return handleResponse(response);
}