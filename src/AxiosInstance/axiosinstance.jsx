import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3000/'
});

const instance2 = axios.create({
    baseURL: 'https://fakestoreapi.com/'
});
export default instance2


