import Axios from 'axios';
import interceptor from './interceptors';


const axios = Axios.create({
    baseURL: "http://localhost:5000"
})

interceptor(axios);

export default axios;