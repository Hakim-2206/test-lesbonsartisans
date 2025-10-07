import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const register = (username, password) =>
    axios.post(`${API_URL}/auth/register`, {username, password});

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {username, password});
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}

export const getCurrentUser = () => {
    return localStorage.getItem('username');
};

export const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return {Authorization: 'Bearer ' + token};
    }
    return {};
};