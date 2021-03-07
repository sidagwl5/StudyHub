import Axios from 'axios';
import interceptor from './interceptors';


const axios = Axios.create({
    baseURL: "http://localhost:5000"
})

axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;
interceptor(axios);

export default axios;