import axios from 'axios';

const baseURL = "http://localhost:3000";

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user?.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            } catch (e) {
                console.error("Error parsing user from local storage", e);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        if (error.response && error.response.data) {
            return Promise.reject(new Error(error.response.data.message || error.message));
        }
        
        return Promise.reject(error);
    }
);

export default api;