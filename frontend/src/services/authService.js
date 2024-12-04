import api from '../utils/api'; // Assuming api is pre-configured

// Login Service
export const loginService = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

// Signup Service
export const signupService = async (name, email, password, role) => {
    const response = await api.post('/auth/signup', { name, email, password, role });
    return response.data;
};

// Logout Service
export const logoutService = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};