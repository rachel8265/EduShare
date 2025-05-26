import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5173', // your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;