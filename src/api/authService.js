const API_URL = "https://api.samuelconra.com";

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

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    return handleResponse(response);
};

export const signupUser = async (name, email, password, role) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
    });

    return handleResponse(response);
};
