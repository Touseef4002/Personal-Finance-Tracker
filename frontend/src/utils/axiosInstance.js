import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },});

//Request interceptor to add token to headers if available
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response) {
            if(error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                window.location.href = '/login';
            }
            else if(error.response.status === 500){
                // Handle server errors
                console.error('Server error: Please try again later.');
            }
        }
        else if (error.code === 'ECONNABORTED') {
                // Handle request timeout
                console.error('Request timed out. Please try again.');
            }
        return Promise.reject(error);
    }
);

export default axiosInstance;