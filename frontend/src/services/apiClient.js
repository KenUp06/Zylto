import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
});

// Interceptor para agregar el token automáticamente
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Asegúrate de guardar el token en el localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
