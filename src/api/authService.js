const API_URL = "http://localhost:3000";

const handleResponse = async (response) => {
    if (!response.ok) {
        try {
        const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la solicitud');
        } catch (e) {
            console.log(`Response Error: ${e.message}`);
            throw new Error(response.statusText || 'Error en la solicitud');
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
