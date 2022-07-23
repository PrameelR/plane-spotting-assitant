
import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: '/'
});

axiosinstance.interceptors.request.use((config) => {

    return config;
});

export default axiosinstance;