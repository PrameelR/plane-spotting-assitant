import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: '/'
});

axiosinstance.interceptors.request.use((config) => {

    var _contenttype = 'application/json';
    config.headers['Content-Type'] = _contenttype;

    return config;
});

export default axiosinstance;
