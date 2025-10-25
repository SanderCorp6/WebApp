const API_URL = "http://api.samuelconra.com";

const handleResponse = async (response) => {
    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request Error');
        } catch (e) {
            console.log(`Response Error: ${e.message}`);
            throw new Error(response.statusText || 'Request Error');
        }
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