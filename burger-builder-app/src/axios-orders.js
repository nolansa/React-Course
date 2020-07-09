import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://nolan-211313.firebaseio.com/'
});

export default instance;