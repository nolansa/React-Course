import axios from 'axios';

const instance = axios.create( {
    baseURL: 'https://jsonplaceholder.typicode.com',
});

instance.defaults.timeout = 100000;
//instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;