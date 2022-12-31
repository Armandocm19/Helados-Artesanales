import axios from 'axios';


const heladosApi = axios.create({
    baseURL: '/api'
});

export default heladosApi;
